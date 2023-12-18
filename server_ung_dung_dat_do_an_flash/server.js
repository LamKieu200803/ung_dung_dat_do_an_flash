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

// Schema và model user 
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  thongtinId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ThongTins',
    required: false
  },
});

const User = mongoose.model("Users", userSchema);

// Schema và model danh mục
const danhMucSchema = new mongoose.Schema({
  tendanhmuc: String,
  anhdanhmuc: String,
});
const DanhMuc = mongoose.model("DanhMucs", danhMucSchema);

const sanPhamSchema = new mongoose.Schema({
  tensp: String,
  giasp: String,
  img: String,
  motasp: String,
  soluong: Number,
  soluongban: {
    type: Number,
    default: 0,
  },
  danhMucId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DanhMucs",
    required: true,
  },
});

const SanPham = mongoose.model("SanPhams", sanPhamSchema);
const AddressSChema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
});
const Address = mongoose.model("Diachis", AddressSChema);

// Schema và model chitietsanpham
const chiTietSanPhamSchema = new mongoose.Schema({
  tensp: String,
  giasp: String,
  img: String,
  motasp: String,
  soluong: Number,
});

const chiTietSanPham = mongoose.model("ChiTietSanPhams", chiTietSanPhamSchema);

// Schema và model giohang
const gioHangSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SanPham",
    required: true,
  },
  tensp: String,
  giasp: String,
  img: String,
  soluongmua: Number,
});

const gioHang = mongoose.model("GioHangs", gioHangSchema);

// Schema và model hóa đơn 
const hoaDonSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  danhSachSanPham: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SanPham'
    },
    tensp: String,
    giasp: String,
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


// Schema và model thông tin
const thongTinSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  phone: String,
  anh: String,
  tennguoimua: String,
});

const thongTin = mongoose.model("ThongTins", thongTinSchema);
// Schema và model bình luận

const binhLuanSchema = new mongoose.Schema({
  tennguoimua: String,
  anh: String,
  noidung: String,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SanPhams',
    required: true
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
});

const BinhLuan = mongoose.model('BinhLuans', binhLuanSchema);

// dki tài khoản
app.post("/dangki", (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({ email, password });
  newUser.save().then(() => {
    res.status(201).json({ message: "tạo tài khoản thành công" });
  });
});
app.post("/themdiachi", (req, res) => {
  const { name, phone, address } = req.body;

  const newUser = new Address({ name, phone, address });
  newUser.save().then(() => {
    res.status(201).json({ message: "Bạn đã thêm địa chỉ thành công" });
  });
}); //thêm địa chỉ
app.get("/diachi", async (req, res) => {
  try {
    const user = await Address.find({});
    res.json(user);
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
  }
}); //get địa chỉ

app.post("/dangnhap", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
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

// xem toàn bộ tài khoản
app.get('/user', async (req, res) => {
  try {
    const users = await User.find({});
    const usersWithDetails = [];

    for (const user of users) {
      const userId = user._id;

      // Lấy thông tin từ bảng "thongTin" dựa trên userId
      const thongtin = await thongTin.findOne({ userId: userId });

      if (thongtin) {
        const userWithDetails = {
          userId: userId,
          email: user.email,
          password: user.password,
          phone: thongtin.phone,
          anh: thongtin.anh,
          tennguoimua: thongtin.tennguoimua
        };

        usersWithDetails.push(userWithDetails);
      } else {
        const userWithoutDetails = {
          userId: userId,
          email: user.email,
          password: user.password,
          phone: '',
          anh: '',
          tennguoimua: ''
        };
        usersWithDetails.push(userWithoutDetails);
      }
    }
    res.json(usersWithDetails);
  } catch (err) {
    console.log('Lỗi', err);
    res.status(500).send('Lỗi server');
  }
});
// xem chi tiết tk theo email
app.get("/user/email", async (req, res) => {
  try {
const email = req.query.email;

    const user = await User.findOne({ email });
if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    res.json(user);
  } catch (err) {
    console.log("error", err);
    res.status(500).send("Lỗi server");
  }
});

// xóa tài khoản
app.delete("/User/xoa/:id", (req, res) => {
  const deleteUser = req.params.id;
  User.findByIdAndRemove(deleteUser)
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
app.put("/user/sua/:id", (req, res) => {
  const id = req.params.id;
  const updatePass = {
   
    password: req.body.password
  };
  User.findByIdAndUpdate(id, updatePass, { new: true })
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
app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.json(user);
  } catch (err) {
    console.log("error", err);
    res.status(500).send("Lỗi server");
  }
});
//
app.get("/hoadon", async (req, res) => {
  try {
    const hoadon = await hoaDon.find({});
    res.json(hoadon);
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
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
app.get("/top5products", async (req, res) => {
  try {
    const result = await hoaDon.aggregate([
      { $unwind: "$danhSachSanPham" },
      {
        $group: {
          _id: "$danhSachSanPham.tensp",
          soluongban: { $sum: { $toInt: "$danhSachSanPham.soluongmua" } },
        },
      },
      { $sort: { soluongban: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "SanPhams",
          localField: "_id",
          foreignField: "tensp",
          as: "sanpham",
        },
      },
      { $unwind: "$sanpham" },
      {
        $project: {
          _id: 0,
          tensp: "$sanpham.tensp",
          soluongban: 1,
          giasp: "$sanpham.giasp",
          img: "$sanpham.img",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("Internal Server Error");
  }
});

//top5 san pham
app.get("/top5sold", (req, res) => {
  SanPham.find({})
    .populate("danhMucId")
    .sort({ soluongban: -1 })
    .limit(5)
    .then((data) => {
      res.json(data);
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
  const { tensp, giasp, img, motasp, soluong, soluongban, danhMucId } =
    req.body;

  const newSanPham = new SanPham({
    tensp,
    giasp,
    img,
    motasp,
    soluong,
    soluongban,
    danhMucId,
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
// sửa sản phẩm
app.put("/sanpham/sua/:id", (req, res) => {
  const id = req.params.id;
  const updateSanPham = {
    tensp: req.body.tensp,
    giasp: req.body.giasp,
    img: req.body.img,
    motasp: req.body.motasp,
    soluong: req.body.soluong,
danhMucId: req.body.danhMucId, // Cập nhật giá trị danhMucId
  };
  SanPham.findByIdAndUpdate(id, updateSanPham, { new: true })
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
  const productId = req.params.id;
  try {
    const spct = await SanPham.findById(productId);
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

// Xem giỏ hàng của người dùng

app.get("/giohang/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Lấy thông tin giỏ hàng của người dùng
    const giohangs = await gioHang.find({ userId: userId });

    // Tạo một mảng rỗng để lưu trữ thông tin sản phẩm trong giỏ hàng
    const giohangsWithDetails = [];

    // Lặp qua từng mục giỏ hàng
    for (const giohang of giohangs) {
      // Kiểm tra giá trị soluongmua, nếu nhỏ hơn 1, đặt lại là 1
      if (giohang.soluongmua < 1) {
        giohang.soluongmua = 1;
      }

      // Lấy thông tin chi tiết của sản phẩm từ collection "SanPham"
      const sanPham = await SanPham.findById(giohang.productId);

      // Kiểm tra xem sản phẩm có tồn tại không
      if (sanPham) {
        // Tạo một đối tượng mới chứa thông tin sản phẩm và thông tin giỏ hàng
        const giohangWithDetails = {
          giohangId: giohang._id,
          userId: giohang.userId,
          productId: giohang.productId,
          tensp: giohang.tensp,
          giasp: giohang.giasp,
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

// Thêm vào giỏ hàng của người dùng
app.post("/giohang/them/:userId/:productId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  const { tensp, giasp, img, soluongmua } = req.body;

  try {
    // Kiểm tra xem sản phẩm có tồn tại trong collection "SanPham" không
    const sanPham = await SanPham.findById(productId);
    if (!sanPham) {
      return res.status(404).send("Sản phẩm không tồn tại");
    }

    // Tạo mục giỏ hàng mới và gán productId từ URL
    const giohang = await gioHang.create({
      userId: userId,
      productId: productId,
      tensp: tensp,
      giasp: giasp,
      img: img,
      soluongmua: soluongmua,
    });

    res.json(giohang);
  } catch (err) {
    console.log("Lỗi ", err);
    res.status(500).send("Lỗi máy chủ");
  }
});

// xóa sản phẩm trong giỏ

app.delete("/giohang/xoa/:userId/:productId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  try {
    await gioHang.deleteOne({ userId: userId, productId: productId });
    res.status(200).send("Sản phẩm đã được xóa khỏi giỏ hàng thành công");
  } catch (err) {
    console.log("Lỗi ", err);
    res.status(500).send("Lỗi máy chủ");
  }
});

// xóa giỏ hàng khi mua thành công
app.delete("/giohang/xoa/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { tensp, giasp, img, soluongmua } = req.body;

  try {
    await gioHang.deleteMany({
      userId: userId,
    });
    console.log("Giỏ hàng đã được làm mới");
  } catch (err) {
    console.log("Lỗi ", err);
    res.status(500).send("Lỗi máy chủ");
  }
});

// sửa số lượng trong giỏ khi thay đổi số lượng

app.put("/giohang/sua/:userId/:productId", (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  const updateSoluong = {
    soluongmua: req.body.soluongmua,
  };

  gioHang
    .findOneAndUpdate({ userId: userId, productId: productId }, updateSoluong, {
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
        sanPham.soluong = soLuongMoi;
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
app.get("/hoadon/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const hoadon = await hoaDon.find({ userId: userId });
    res.json(hoadon);
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
  }
});

app.post("/hoadon/them/:userId", (req, res) => {
  const userId = req.params.userId;
  const { danhSachSanPham, diachi, sdt, tennguoimua, pttt, tongtien, thoigian, trangthai } = req.body;

  // Lấy thông tin người dùng dựa trên userId
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      // Tạo danh sách sản phẩm mới với các thông tin, bao gồm cả productId
      const newDanhSachSanPham = danhSachSanPham.map((sp) => ({
        productId: sp.productId, // Thêm productId vào danh sách sản phẩm
        tensp: sp.tensp,
        giasp: sp.giasp,
        img: sp.img,
        soluongmua: sp.soluongmua,
      }));

      // Tạo hóa đơn mới với thông tin người dùng và danh sách sản phẩm
      const newHoaDon = new hoaDon({
        danhSachSanPham: newDanhSachSanPham,
        userId,
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
});
// thông tin người dùng theo idUser

app.get("/thongtin/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const thongtin = await thongTin.find({ userId: userId });
    if (thongtin) {
      res.json(thongtin);
    } else {
      res.status(404).json({ message: "Không tìm thấy thông tin người dùng" });
    }
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
  }
});

// thêm thông tin người dùng
app.post("/thongtin/them/:userId", (req, res) => {
  const userId = req.params.userId;
  const { tennguoimua, anh, phone } = req.body;
const newThongTin = new thongTin({ userId, tennguoimua, anh, phone });
  newThongTin
    .save()
    .then(() => {
      res.status(201).json({ message: "Thêm thông tin người dùng thành công" });
    })
    .catch((err) => {
      console.log("error ", err);
      res.status(500).send("lỗi server");
    });
});

// sửa thông tin người dùng 

app.put("/thongtin/sua/:userId", (req, res) => {
  const userId = req.params.userId;
  const updateThongTin = {
    tennguoimua: req.body.tennguoimua,
    phone: req.body.phone,
    anh: req.body.anh

  };
  thongTin.findOneAndUpdate({ userId: userId }, updateThongTin, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Cập nhật dữ liệu thành công",
          data: data
        });
      } else {
        res.status(404).json({ err: "Không tìm thấy dữ liệu" })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật dữ liệu" });
    });
});

app.put("/hoadon/sua/:userId/:id", (req, res) => {
  const userId = req.params.userId;
  const id = req.params.id; // Thay đổi từ req.params._id thành req.params.id

  const updateTrangThai = {
    trangthai: req.body.trangthai,
  };

  hoaDon
    .findOneAndUpdate(
      { userId: userId, _id: id }, // Sửa thành _id thay vì id
      updateTrangThai, // Sửa thành updateTrangThai thay vì updatetrangthai
      { new: true }
    )
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Thay đổi trạng thái thành công",
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

// // top3 sản phẩm bán chạy
// app.get("/thongke/top3sanpham", async (req, res) => {
//   try {
//     const result = await hoaDon.aggregate([
//       { $unwind: "$danhSachSanPham" },
//       {
//         $group: {
//           _id: "$danhSachSanPham.tensp",
//           soluongban: { $sum: { $toInt: "$danhSachSanPham.soluongmua" } },
//         },
//       },
//       { $sort: { soluongban: -1 } },
//       { $limit: 3 },
//       {
//         $lookup: {
//           from: "SanPhams",
//           localField: "_id",
//           foreignField: "tensp",
//           as: "sanpham",
//         },
//       },
//       { $unwind: "$sanpham" },
//       {
//         $project: {
//           _id: 0,
//           tensp: "$sanpham.tensp",
//           soluongban: 1,
//         },
//       },
//     ]);

//     res.status(200).json(result);
//   } catch (err) {
//     console.log("error ", err);
//     res.status(500).send("Lỗi server");
//   }
// });

// thống kê
app.get("/thongke", async (req, res) => {
  try {
    const invoices = await hoaDon.find();
const monthlyCountsArray = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      count: 0,
    }));
    invoices.forEach((invoice) => {
      const monthString = invoice.thoigian.split(",")[1];

      if (monthString) {
        const month = parseInt(monthString.trim().split("/")[1], 10);
        if (!isNaN(month)) {
          const monthIndex = month - 1;
          monthlyCountsArray[monthIndex].count++;
        }
      }
    });
    const formattedData = monthlyCountsArray.map(({ month, count }) => [
      ` T ${month}`,
      count,
    ]);
    const data = [["Month", "Orders"], ...formattedData];

    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/orderstats", async (req, res) => {
  try {
    const invoices = await hoaDon.find();

    // Tạo mảng để lưu số lượng hóa đơn theo tháng
    const orderDataArray = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      orderCount: 0,
    }));

    // Lặp qua danh sách hóa đơn và tính số lượng hóa đơn cho mỗi tháng
    invoices.forEach((invoice) => {
      const monthString = invoice.thoigian.split(",")[1];

      if (monthString) {
        const month = parseInt(monthString.trim().split("/")[1], 10);
        if (!isNaN(month)) {
          const monthIndex = month - 1;
          // Cộng dồn số lượng hóa đơn
          orderDataArray[monthIndex].orderCount++;
        }
      }
    });

    // Chuẩn bị dữ liệu để trả về
    const orderFormattedData = orderDataArray.map(({ month, orderCount }) => [
      month.toString(),
      orderCount,
    ]);

    const data = [["Tháng", "Đơn hàng"], ...orderFormattedData];

    res.json(data);
  } catch (err) {
console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/amountstats", async (req, res) => {
  try {
    const invoices = await hoaDon.find();

    // Tạo mảng để lưu tổng tiền theo tháng
    const amountDataArray = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalAmount: 0,
    }));

    // Lặp qua danh sách hóa đơn và tính tổng tiền cho mỗi tháng
    invoices.forEach((invoice) => {
      const monthString = invoice.thoigian.split(",")[1];

      if (monthString) {
        const month = parseInt(monthString.trim().split("/")[1], 10);
        if (!isNaN(month)) {
          const monthIndex = month - 1;
          // Cộng dồn tổng tiền từ hóa đơn vào tháng tương ứng
          amountDataArray[monthIndex].totalAmount += invoice.tongtien || 0;
        }
      }
    });

    // Chuẩn bị dữ liệu để trả về
    const amountFormattedData = amountDataArray.map(
      ({ month, totalAmount }) => [month.toString(), totalAmount]
    );

    const data = [["Tháng", "Tổng tiền"], ...amountFormattedData];

    res.json(data);
  } catch (err) {
    console.error("Error:", err);
res.status(500).send("Internal Server Error");
  }
});

// // thêm lịch sử mua hàng
// app.post("/lichsu/them/:userId", (req, res) => {
//   const userId = req.params.userId;
//   const { tensp, giasp, img, soluongmua, pttt, tongtien, trangthai, tennguoimua, thoigian } = req.body;

//   const newLichSu = new lichSu({
//     userId,
//     tensp,
//     giasp,
//     img,
//     soluongmua,
//     pttt,
//     tongtien,
//     trangthai,
//     tennguoimua,
//     thoigian
//   });
//   newLichSu
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Thêm lịch sử mua hàng thành công" });
//     })
//     .catch((err) => {
//       console.log("error ", err);
//       res.status(500).send("lỗi server");
//     });
// });

// xem hóa đơn chi tiết
app.get("/hoadonchitiet/:userId/:_id", (req, res) => {
  const userId = req.params.userId;
  const _id = req.params._id;

  hoaDon
    .findOne({ userId, _id })
    .then((hoaDon) => {
      if (hoaDon) {
        res.status(200).json(hoaDon);
      } else {
        res.status(404).json({ message: "Không tìm thấy chi tiết hóa đơn" });
      }
    })
    .catch((err) => {
      console.log("Lỗi truy vấn hóa đơn ", err);
      res.status(500).send("Lỗi server");
    });
});
app.get("/binhluan", (req, res) => {
  BinhLuan.find({})
    .populate("productId")
    .then((binhLuans) => {
      if (binhLuans.length > 0) {
        res.status(200).json(binhLuans);
      } else {
        res.status(404).json({ message: "Không tìm thấy bình luận" });
      }
    })
    .catch((err) => {
      console.log("Lỗi truy vấn bình luận ", err);
      res.status(500).send("Lỗi server");
    });
});
app.get("/binhluan/:productId", (req, res) => {
  const productId = req.params.productId;
  BinhLuan.find({ productId })
    .then((binhLuans) => {
      if (binhLuans.length > 0) {
        res.status(200).json(binhLuans);
      } else {
        res.status(404).json({ message: 'Không tìm thấy bình luận' });
      }
    })
    .catch((err) => {
      console.log("Lỗi truy vấn bình luận ", err);
      res.status(500).send("Lỗi server");
    });
});

// thêm bình luận
app.post("/binhluan/them/:productId/:userId", (req, res) => {
  const productId = req.params.productId;
  const userId = req.params.userId;
  const { noidung } = req.body;

  thongTin.findOne({ userId }) // Tìm thông tin từ collection ThongTins dựa trên userId
    .then((user) => {
      if (!user) {
        throw new Error("Thông tin không tồn tại");
      }
      const newBinhLuan = new BinhLuan({
        tennguoimua: user.tennguoimua,
        anh: user.anh,
        productId,
        userId,
        noidung,
      });

      return newBinhLuan.save();
    })
    .then(() => {
      res.status(201).json({ message: "Thêm bình luận thành công" });
    })
    .catch((err) => {
      console.log("error ", err);
      res.status(500).send("Lỗi server");
    });
});
// app.post("/hoadonchitiet/:userId/:hoaDonId/add", (req, res) => {
//   const userId = req.params.userId;
//   const hoaDonId = req.params.hoaDonId;
//   const chiTietList = req.body;

//   const newChiTietList = chiTietList.map((chiTiet) => {
//     const { tensp, giasp, img, soluongmua } = chiTiet;
//     return new hoaDonChiTiet({
//       userId,
//       hoaDonId,
//       tensp,
//       giasp,
//       img,
//       soluongmua,
//     });
//   });

//   hoaDonChiTiet.insertMany(newChiTietList)
//     .then(() => {
//       res.status(201).json({ message: "Thêm danh sách chi tiết hóa đơn thành công" });
//     })b
//     .catch((err) => {
//       console.log("error ", err);
//       res.status(500).send("lỗi server");
//     });
// });

//khởi chạy server
const port = 9997;
app.listen(port, () => {
  console.log("server đang lắng nghe tại cổng ${port}");
});