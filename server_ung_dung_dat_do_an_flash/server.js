const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://lamkqph28183:20082003a@cluster0.t4gqvdc.mongodb.net/du_an_tot_nghiep?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("đã kết nối tới MongoDB");
  })
  .catch((error) => {
    console.error("lỗi kết nối", error);
  });


// Schema và model Khách hàng
const khachHangSchema = new mongoose.Schema({
  email: String,
  password: String,
  tenkhachhang: String,
  diachi: String,
  sdt: String,
  anhdaidien: String
})
const KhachHang = mongoose.model("KhachHangs", khachHangSchema);

// Schema và model danh mục
const danhMucSchema = new mongoose.Schema({
  tendanhmuc: String,
  anhdanhmuc: String,
});
const DanhMuc = mongoose.model("DanhMucs", danhMucSchema);

//Schema và model sản phẩm
const sanPhamSchema = new mongoose.Schema({
  tensp: String,
  img: String,
  motasp: String,
  soluongban: {
    type: Number,
    default: 0,
  },
  danhMucId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DanhMucs",
    required: true,
  },
  chitietsp: [{
    size: String,
    giasp: Number,
    soluong: Number
  }]
});

// Define a virtual property
sanPhamSchema.virtual('soluongsp').get(function() {
  let total = 0;
  if (this.chitietsp && this.chitietsp.length > 0) {
    total = this.chitietsp.reduce((acc, item) => acc + item.soluong, 0);
  }
  return total;
});
const SanPham = mongoose.model("SanPhams", sanPhamSchema);

//Schema và model giỏ hàng
const gioHangSchema = new mongoose.Schema({
  idKhachHang: {
    type: String,
    required: true,
  },
  idSanPham: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SanPham",
    required: true,
  },
  tensp: String,
  img: String,
  soluongmua: Number,
  size: String,
  giasp: Number,
  soluong: Number

});
const gioHang = mongoose.model("GioHangs", gioHangSchema);


// Schema và model bình luận
const binhLuanSchema = new mongoose.Schema({
  tenkhachhang: String,
  anhdaidien: String,
  noidung: String,
  idSanPham: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SanPhams',
    required: true
  },
  
  idKhachHang: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KhachHangs',
    required: true
  },
});
const BinhLuan = mongoose.model('BinhLuans', binhLuanSchema);

// Schema và model hóa đơn
const hoaDonSchema = new mongoose.Schema({
  idKhachHang: {
    type: String,
    required: true
  },
  chitietsp: [{
    idSanPham: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SanPham'
    },
    giohang: [{
      size: String,
      giasp: Number,
      soluong: Number
    }],
    tensp: String,
    img: String,
    soluongmua: String
  }],
  diachi: String,
  sdt: String,
  tennguoimua: String,
  pttt: String,
  tongtien: Number,
  thoigian: String,
  trangthai: String
});

const hoaDon = mongoose.model("HoaDons", hoaDonSchema);

app.post("/hoadon/them/:idKhachHang", (req, res) => {
  const idKhachHang = req.params.idKhachHang;
  const { giohang, diachi, sdt, tennguoimua, pttt, trangthai } = req.body;

  // Lấy thông tin người dùng dựa trên idKhachHang
  KhachHang.findById(idKhachHang)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      // Tạo hóa đơn mới với thông tin người dùng và danh sách sản phẩm
      const newHoaDon = new hoaDon({
        idKhachHang,
        chitietsp: giohang,
        diachi,
        sdt,
        tennguoimua,
        pttt,
        trangthai,
      });

      newHoaDon
        .save()
        .then(() => {
          res.status(201).json({ message: "Thêm hóa đơn thành công" });
        })
        .catch((err) => {
          console.log("error ", err);
          res.status(500).send("Lỗi server");
        });
    })
    .catch((err) => {
      console.log("error ", err);
      res.status(500).send("Lỗi server");
    });
});

//Schema và model địa chỉ
const AddressSChema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  idKhachHang: {
    type: String,
    required: true
  },
});
const Address = mongoose.model("Diachis", AddressSChema);

///////////////////////////////////////////////////////////////////////////////

// đăng kí tài khoản
app.post("/dangki", (req, res) => {
  const { email, password, tenkhachhang, diachi, anhdaidien, sdt } = req.body;

  const newKhachHang = new KhachHang({ email, password, tenkhachhang,sdt, anhdaidien, diachi });
  newKhachHang.save().then(() => {
    res.status(201).json({ message: "tạo tài khoản thành công" });
  });
});

// xem toàn bộ tài khoản 
app.get('/khachhang', async (req,res)=>{
  try {
const khachhang = await KhachHang.find({});
res.json(khachhang);
} catch (err) {
  console.log("error ", err);
  res.status(500).send("lỗi server");
}
})

// dn
app.post("/dangnhap", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  KhachHang.findOne({
    email: email,
    password: password,
  })
    .then((data) => {
      if (data) {
        res.json({ success: true, message: "Đăng nhập thành công", data });
      } else {
        res.status(400).json({
          success: false,
          message: "Email hoặc mật khẩu không chính xác",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, message: "Lỗi server" });
    });
});
app.get("/khachhang/email", async (req, res) => {
  try {
    const email = req.query.email;

    const kh = await KhachHang.findOne({ email });
    if (!kh) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    res.json(kh); // Trả về đối tượng kh đã tìm thấy
  } catch (err) {
    console.log("error", err);
    res.status(500).send("Lỗi server");
  }
});

// xóa tài khoản
app.delete("/khachhang/xoa/:id", (req, res) => {
  const deletetk = req.params.id;
  KhachHang.findByIdAndRemove(deletetk)
    .then((data) => {
      if (data) {
        res
          .status(200)
          .json({ message: "Dữ liệu đã được xóa thành công", data: data });
      } else {
        res.status(404).json({ error: "Không tìm thấy dữ liệu" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Đã xảy ra lỗi khi xóa dữ liệu" });
    });
});

// thay đổi mật khẩu
app.put("/khachhang/sua/:id", (req, res) => {
  const id = req.params.id;
  const updatePass = {
   
    password: req.body.password
  };
  KhachHang.findByIdAndUpdate(id, updatePass, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "thay đổi pass thành công",
          data: data
        });
      } else {
        res.status(404).json({ err: "không tìm thấy dữ liệu" })
      }

    }
    ).catch((err) => {
      res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật dữ liệu" });
    })
});

// chi tiết người dùng theo id
app.get("/khachhang/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const khachHang = await KhachHang.findById(id);

    if (!khachHang) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.json(khachHang);
  } catch (err) {
    console.log("error", err);
    res.status(500).send("Lỗi server");
  }
});

// xem danh mục
app.get("/danhmuc", async (req, res) => {
  try {
    const danhmuc = await DanhMuc.find({});
    res.json(danhmuc);
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
  }
});

// thêm danh mục
app.post("/danhmuc/them", (req, res) => {
  const { tendanhmuc, anhdanhmuc } = req.body;

  const newdanhmuc = new DanhMuc({ tendanhmuc, anhdanhmuc });
  newdanhmuc.save().then(() => {
    res.status(201).json({ message: "thêm sản phẩm thành công" });
  });
});

// sửa danh mục
app.put("/danhmuc/sua/:id", (req, res) => {
  const id = req.params.id;
  const updateDanhMuc = {
    tendanhmuc: req.body.tendanhmuc,
    anhdanhmuc: req.body.anhdanhmuc,
  };
  DanhMuc.findByIdAndUpdate(id, updateDanhMuc, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Cập nhật dữ liệu thành công",
          data: data,
        });
      } else {
        res.status(404).json({ err: "Không tìm thấy dữ liệu" });
}
    })
    .catch((err) => {
      res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật dữ liệu" });
    });
});

// xóa danh mục
app.delete("/danhmuc/xoa/:id", (req, res) => {
  const deleteDanhMuc = req.params.id;
  DanhMuc.findByIdAndDelete(deleteDanhMuc)
    .then((data) => {
      if (data) {
        res
          .status(200)
          .json({ message: "Dữ liệu đã được xóa thành công", data: data });
      } else {
        res.status(404).json({ error: "Không tìm thấy dữ liệu" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Đã xảy ra lỗi khi xóa dữ liệu" });
    });
});

// xem sản phẩm theo danh mục
app.get("/sanpham/danhsach/:danhMucId", (req, res) => {
  const danhMucId = req.params.danhMucId;
  SanPham.find({ danhMucId })
    .then((sanPhams) => {
      res.status(200).json(sanPhams);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Đã xảy ra lỗi khi lấy danh sách sản phẩm" });
    });
});


// xem sản phẩm
app.get("/sanpham", async (req, res) => {
  try {
    const sanpham = await SanPham.find({}).populate("danhMucId");

    res.json(sanpham);
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
  }
});
// thêm sản phẩm
app.post("/sanpham/them", (req, res) => {
  const { tensp, img, motasp, soluongsp, soluongban, danhMucId, chitietsp } =
    req.body;
// tạo ra new chitietsp
const newchitiet = chitietsp.map((sp)=> ({
  size: sp.size,
  giasp: sp.giasp,
  soluong: sp.soluong

}))
const newSanPham = new SanPham({
  tensp,
  img,
  motasp,
  soluongsp,
  soluongban,
  danhMucId,
  chitietsp: newchitiet // Thay đổi từ newchitiet thành chitietsp
});
  newSanPham
    .save()
    .then(() => {
      res.status(201).json({ message: "Thêm sản phẩm thành công" });
      
    })
    .catch((err) => {
      res.status(500).json({ error: "Đã xảy ra lỗi khi thêm sản phẩm" });
    });
});


// Route POST để thêm đối tượng mới vào "chitietsp"
app.post('/chitietsp/them/:id', (req, res) => {
  const sanPhamId = req.params.id; // Lấy ID của sản phẩm từ tham số đường dẫn
  const newChitietSp = {
    size: req.body.size,
    soluong: req.body.soluong,
    giasp: req.body.giasp,
  };

  SanPham.findById(sanPhamId)
    .then((sanPham) => {
      if (!sanPham) {
        return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      }

      sanPham.chitietsp.push(newChitietSp);
      return sanPham.save();
    })
    .then((updatedSanPham) => {
      res.status(200).json({
        message: 'Thêm chitietsp thành công',
        sanPham: updatedSanPham,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm chitietsp' });
    });
});

// Route DELETE để xóa đối tượng trong "chitietsp" dựa trên ID của "chitietsp"
app.delete('/chitietsp/xoa/:id', (req, res) => {
  const chitietSpId = req.params.id; // ID của đối tượng chitietsp cần xóa

  SanPham.findOneAndUpdate(
    { 'chitietsp._id': chitietSpId },
    { $pull: { chitietsp: { _id: chitietSpId } } },
    { new: true }
  )
    .then((updatedSanPham) => {
      if (!updatedSanPham) {
        return res.status(404).json({ error: 'Không tìm thấy chitietsp' });
      }

      res.status(200).json({
        message: 'Xóa chitietsp thành công',
        sanPham: updatedSanPham,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa chitietsp' });
    });
});

// sửa biến thể sản phẩm theo size ,soluong và

app.put('/chitietsp/sua/:id', (req, res) => {
  const idctsp = req.params.id;
  const updatechitietsp = {};

  if (req.body.size) {
    updatechitietsp['chitietsp.$.size'] = req.body.size;
  }

  if (req.body.soluong) {
    updatechitietsp['chitietsp.$.soluong'] = req.body.soluong;
  }
  
  if (req.body.giasp) {
    updatechitietsp['chitietsp.$.giasp'] = req.body.giasp;
  }

  SanPham.findOneAndUpdate(
    { 'chitietsp._id': idctsp },
    { $set: updatechitietsp },
    { new: true }
  )
    .then((updatedSanPham) => {
      if (!updatedSanPham) {
        return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      }
      res.status(200).json({
        message: 'Cập nhật thông tin chitietsp thành công',
        sanPham: updatedSanPham,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Đã xảy ra lỗi khi cập nhật thông tin chitietsp',
      });
    });
});

// xóa sản phẩm
app.delete("/sanpham/xoa/:id", (req, res) => {
  const deleteSanPham = req.params.id;
  SanPham.findByIdAndRemove(deleteSanPham)
    .then((data) => {
      if (data) {
        res
          .status(200)
          .json({ message: "Dữ liệu đã được xóa thành công", data: data });
      } else {
        res.status(404).json({ error: "Không tìm thấy dữ liệu" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Đã xảy ra lỗi khi xóa dữ liệu" });
    });
});

// xem chi tiết sản phẩm
app.get("/chitietsanpham/:id", async (req, res) => {
  const idSanPham = req.params.id;
  try {
    const spct = await SanPham.findById(idSanPham);
    if (!spct) {
      // sản phẩm ko tồn tại
      res.status(404).json({ message: "sản phẩm ko tồn tại" });
    } else {
      res.json(spct);
    }
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
  }
});



// Xem giỏ hàng của khách hàng

app.get("/giohang/:idKhachHang", async (req, res) => {
  const idKhachHang = req.params.idKhachHang;

  try {
    // Lấy thông tin giỏ hàng của người dùng
    const giohangs = await gioHang.find({ idKhachHang: idKhachHang });

    // Tạo một mảng rỗng để lưu trữ thông tin sản phẩm trong giỏ hàng
    const giohangsWithDetails = [];

    // Lặp qua từng mục giỏ hàng
    for (const giohang of giohangs) {
      // Kiểm tra giá trị soluongmua, nếu nhỏ hơn 1, đặt lại là 1
      if (giohang.soluongmua < 1) {
        giohang.soluongmua = 1;
      }

      // Lấy thông tin chi tiết của sản phẩm từ collection "SanPham"
      const sanPham = await SanPham.findById(giohang.idSanPham);

      // Kiểm tra xem sản phẩm có tồn tại không
      if (sanPham) {
        // Tạo một đối tượng mới chứa thông tin sản phẩm và thông tin giỏ hàng
        const giohangWithDetails = {
          giohangId: giohang._id,
          idKhachHang: giohang.idKhachHang,
          idSanPham: giohang.idSanPham,
          tensp: giohang.tensp,
        size:giohang.size,
        soluong:giohang.soluong,
        giasp:giohang.giasp,
          img: giohang.img,
          soluongmua: giohang.soluongmua,
          sanPham: sanPham, // Thêm thông tin chi tiết của sản phẩm
        };

        // Thêm vào mảng giohangsWithDetails
        giohangsWithDetails.push(giohangWithDetails);
      }
    }

    res.json(giohangsWithDetails);
  } catch (err) {
    console.log("Lỗi ", err);
    res.status(500).send("Lỗi máy chủ");
  }
});

// thêm sản phẩm vào giỏ hàng người dùng
app.post("/giohang/them/:idKhachHang/:idSanPham", async (req, res) => {
  const idKhachHang = req.params.idKhachHang;
  const idSanPham = req.params.idSanPham;
  const { tensp, img, soluongmua, size , soluong, giasp } = req.body;

  try {
    // Kiểm tra xem sản phẩm có tồn tại trong collection "SanPham" không
    const sanPham = await SanPham.findById(idSanPham);
    if (!sanPham) {
      return res.status(404).send("Sản phẩm không tồn tại");
    }

    // Tạo mục giỏ hàng mới
    const giohang = await gioHang.create({
      idKhachHang: idKhachHang,
      idSanPham: idSanPham,
      tensp: tensp,
      img: img,
      soluongmua: soluongmua,
      size:size,
      giasp:giasp,
      soluong:soluong
    });

    res.json(giohang);
  } catch (err) {
    console.log("Lỗi ", err);
    res.status(500).send("Lỗi máy chủ");
  }
});

// xóa sản phẩm trong giỏ

app.delete("/giohang/xoa/:idKhachHang/:idSanPham", async (req, res) => {
  const idKhachHang = req.params.idKhachHang;
  const idSanPham = req.params.idSanPham;

  try {
    await gioHang.deleteOne({ idKhachHang: idKhachHang, idSanPham: idSanPham });
    res.status(200).send("Sản phẩm đã được xóa khỏi giỏ hàng thành công");
  } catch (err) {
    console.log("Lỗi ", err);
    res.status(500).send("Lỗi máy chủ");
  }
});

// xóa giỏ hàng khi mua thành công
app.delete("/giohang/xoa/:idKhachHang", async (req, res) => {
  const idKhachHang = req.params.idKhachHang;
  const { tensp, giasp, img, soluongmua } = req.body;

  try {
    await gioHang.deleteMany({
      idKhachHang: idKhachHang,
    });
    console.log("Giỏ hàng đã được làm mới");
  } catch (err) {
    console.log("Lỗi ", err);
    res.status(500).send("Lỗi máy chủ");
  }
});

// sửa số lượng trong giỏ khi thay đổi số lượng

app.put("/giohang/sua/:idKhachHang/:idSanPham", (req, res) => {
  const idKhachHang = req.params.idKhachHang;
  const idSanPham = req.params.idSanPham;

  const updateSoluong = {
    soluongmua: req.body.soluongmua,
  };

  gioHang
    .findOneAndUpdate({ idKhachHang: idKhachHang, idSanPham: idSanPham }, updateSoluong, {
      new: true,
    })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Thay đổi số lượng thành công",
          data: data,
        });
      } else {
        res.status(404).json({ err: "Không tìm thấy dữ liệu" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật dữ liệu" });
    });
});

// tính số lượng mới khi đã mua
app.post("/giohang/cap-nhat-sanpham", async (req, res) => {
  const gioHang = req.body.gioHang;

  try {
    for (const item of gioHang) {
      const sanPhamId = item.sanPhamId;
      const soLuongMoi = item.soLuongMoi;
      const soLuongBan = item.soLuongBan;

      const sanPham = await SanPham.findById(sanPhamId);
      if (sanPham) {
        sanPham.soluongsp= soLuongMoi;
sanPham.soluongban = soLuongBan; // Cập nhật số lượng đã bán
        await sanPham.save();
      }
    }

    res.send("Cập nhật số lượng sản phẩm và số lượng đã bán thành công");
  } catch (err) {
    console.log("Lỗi ", err);
    res.status(500).send("Lỗi máy chủ");
  }
});

// xem hóa đơn theo id người dùng
app.get("/hoadon/:idKhachHang", async (req, res) => {
  const idKhachHang = req.params.idKhachHang;
  try {
    const hoadon = await hoaDon.find({ idKhachHang: idKhachHang });
    res.json(hoadon);
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
  }
});

// thêm hóa đơn theo id người dungf

app.post("/hoadon/them/idKhachhang",(req,res)=>{
  const idKhachHang = req.params.idKhachHang ;
  const {giohang ,diachi,sdt,tennguoimua,pttt,trangthai} = req.body
 // Lấy thông tin người dùng dựa trên idKhachHang
 KhachHang.findById(idKhachHang)
 .then((user) => {
   if (!user) {
     return res.status(404).json({ message: "Người dùng không tồn tại" });
   }

   // Tạo danh sách sản phẩm mới với các thông tin, bao gồm cả productId
   const newDanhSachSanPham = giohang.map((sp) => ({
    idSanPham: sp.idSanPham, // Thêm productId vào danh sách sản phẩm
    tensp: sp.tensp,
    img: sp.img,
    soluongmua: sp.soluongmua,
    chitietsp
  }));

   // Tạo hóa đơn mới với thông tin người dùng và danh sách sản phẩm
   const newHoaDon = new hoaDon({
     chitietsp: newDanhSachSanPham,
     idKhachHang,
     diachi,
     sdt,
     tennguoimua,
     pttt,
     tongtien,
     thoigian,
     trangthai,
   });

   newHoaDon
     .save()
     .then(() => {
       res.status(201).json({ message: "Thêm hóa đơn thành công" });
     })
     .catch((err) => {
       console.log("error ", err);
       res.status(500).send("Lỗi server");
     });
 })
 .catch((err) => {
   console.log("error ", err);
   res.status(500).send("Lỗi server");
 });
  
})


//khởi chạy server
const port = 9997;
app.listen(port, () => {
  console.log("server đang lắng nghe tại cổng ${port}");
});
