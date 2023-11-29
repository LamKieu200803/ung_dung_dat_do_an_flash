const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
mongoose.connect(
  "mongodb+srv://lamkqph28183:20082003a@cluster0.t4gqvdc.mongodb.net/du_an_tot_nghiep?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log("đã kết nối tới MongoDB");
})
  .catch((error) => {
    console.error("lỗi kết nối", error);
  });

// Schema và model user 
const userSchema = new mongoose.Schema({
  email: String,
  password: String
})

const User = mongoose.model("Users", userSchema);

// Schema và model sanpham
const sanPhamSchema = new mongoose.Schema({
  tensp: String,
  giasp: String,
  img: String,
  motasp: String,
  soluong: Number
})

const AddressSChema = new mongoose.Schema({
  name: String,
  phone:String,
  address: String,
  thanhpho: String,
  state: Number
})
const Address = mongoose.model("Diachis",AddressSChema);

const SanPham = mongoose.model("SanPhams", sanPhamSchema);

// Schema và model chitietsanpham
const chiTietSanPhamSchema = new mongoose.Schema({

  tensp: String,
  giasp: String,
  img: String,
  motasp: String,
  soluong: Number
})

const chiTietSanPham = mongoose.model("ChiTietSanPhams", chiTietSanPhamSchema)

// Schema và model giohang
const gioHangSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SanPham',
    required: true
  },
  tensp: String,
  giasp: String,
  img: String,
  soluongmua: Number
});

const gioHang = mongoose.model("GioHangs", gioHangSchema);

// Schema và model hóa đơn 
const hoaDonSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  tensp: String,
  giasp: String,
  img: String,
  diachi: String,
  soluongmua: String,
  phone: String,
  sdt: String,
  tennguoimua: String,
  pttt: String,
  tongtien: Number,
  thoigian:String,
  trangthai:String
})
const hoaDon = mongoose.model("HoaDons", hoaDonSchema)




// Schema và model thông tin 
const thongTinSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true
  },
  phone:String,
  anh: String,
  tennguoimua: String,

})

const thongTin = mongoose.model("ThongTins", thongTinSchema);



// Schema và model lịch sử mua hàng
const lichSuSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  tensp: String,
  giasp: String,
  img: String,
  soluongmua: String,
  pttt: String,
  tennguoimua: String,
  tongtien: String,
 
  thoigian: String
})

const lichSu = mongoose.model("LichSus", lichSuSchema)

// dki tài khoản 
app.post("/dangki", (req, res) => {
  const { email, password } = req.body

  const newUser = new User({ email, password })
  newUser.save()
    .then(() => {
      res.status(201).json({ message: "tạo tài khoản thành công" })
    })
})
app.post("/themdiachi", (req, res) => {
  const { name,
    phone,
    address,
    thanhpho,
    state } = req.body

  const newUser = new Address({name,phone,address,thanhpho,state})
  newUser.save()
    .then(() => {
      res.status(201).json({ message: "Bạn đã thêm địa chỉ thành công" })
    })
})//thêm địa chỉ
app.get('/diachi', async (req, res) => {
  try {
    const user = await Address.find({})
    res.json(user)
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server")
  }
})//get địa chỉ


app.post('/dangnhap', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    email: email,
    password: password
  })
    .then(data => {
      if (data) {
        res.json({ success: true, message: "Đăng nhập thành công", data });
      } else {
        res.status(400).json({ success: false, message: "Email hoặc mật khẩu không chính xác" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ success: false, message: "Lỗi server" });
    });
});

// xem toàn bộ tài khoản
app.get('/user', async (req, res) => {
  try {
    const user = await User.find({})
    res.json(user)
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server")
  }
})

// xem chi tiết tk theo email
app.get('/user/email', async (req, res) => {
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
app.get('/user/:id', async (req, res) => {
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
// xem sản phẩm 
app.get('/sanpham', async (req, res) => {
  try {
    const sanpham = await SanPham.find({})
    res.json(sanpham)
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server")
  }
})

// thêm sản phẩm
app.post("/sanpham/them", (req, res) => {
  const { tensp, giasp, img, motasp, soluong } = req.body;

  const newSanPham = new SanPham({ tensp, giasp, img, motasp, soluong })
  newSanPham.save()
    .then(() => {
      res.status(201).json({ message: "thêm sản phẩm thành công" })
    })
})

// sửa sản phẩm 
app.put("/sanpham/sua/:id", (req, res) => {
  const id = req.params.id;
  const updateSanPham = {
    tensp: req.body.tensp,
    giasp: req.body.giasp,
    img: req.body.img,
    motasp: req.body.motasp,
    soluong: req.body.soluong
  };
  SanPham.findByIdAndUpdate(id, updateSanPham, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "cập nhật dữ liệu thành công",
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
app.get('/chitietsanpham/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const spct = await SanPham.findById(productId);
    if (!spct) {
      // sản phẩm ko tồn tại
      res.status(404).json({ message: "sản phẩm ko tồn tại" })
    } else {
      res.json(spct);
    }
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server")
  }
})

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
          sanPham: sanPham  // Thêm thông tin chi tiết của sản phẩm
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
      soluongmua: soluongmua
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
     userId:userId
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
    soluongmua: req.body.soluongmua
  };

  gioHang.findOneAndUpdate(
    { userId: userId, productId: productId },
    updateSoluong,
    { new: true }
  )
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Thay đổi số lượng thành công",
          data: data
        });
      } else {
        res.status(404).json({ err: "Không tìm thấy dữ liệu" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật dữ liệu" });
    });
});

// xem hóa đơn theo id người dùng
app.get("/hoadon/:userId", async (req, res) => {

  const userId = req.params.userId;
  try {
    const hoadon = await hoaDon.find({ userId: userId })
    res.json(hoadon)
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server")
  }
})


// thêm hóa đơn theo id người dùng
app.post("/hoadon/them/:userId", (req, res) => {
  const userId = req.params.userId;
  const {tensp,giasp,img,soluongmua, diachi, sdt, tennguoimua, pttt, tongtien, thoigian, trangthai } = req.body;

  const newHoaDon = new hoaDon({tensp,giasp,img,soluongmua, userId, diachi, sdt, tennguoimua, pttt, tongtien, thoigian, trangthai });
  newHoaDon
    .save()
    .then(() => {
      res.status(201).json({ message: "Thêm hóa đơn thành công" });
    })
    .catch((err) => {
      console.log("error ", err);
      res.status(500).send("lỗi server");
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

  const newThongTin = new thongTin({ userId, tennguoimua, anh,phone });
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


// // xem đơn trạng thái
// app.get("/trangthai/:userId", async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     const trangthai = await trangThai.find({ userId: userId });
//     res.json(trangthai);
//   } catch (err) {
//     console.log("error ", err);
//     res.status(500).send("lỗi server");
//   }
// })

// // thêm đơn trạng thái
// app.post("/trangthai/them/:userId", (req, res) => {
//   const userId = req.params.userId;
//   const { tensp, giasp, img, soluongmua, pttt, tongtien, trangthai, thoigian } = req.body;

//   const newTrangThai = new trangThai({
//     userId,
//     tensp,
//     giasp,
//     img,
//     soluongmua,
//     pttt,
//     tongtien,
//     trangthai,
//     thoigian
//   });
//   newTrangThai
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Thêm đơn trạng thái thành công" });
//     })
//     .catch((err) => {
//       console.log("error ", err);
//       res.status(500).send("lỗi server");
//     });
// });

// xem lịch sử mua hàng
app.get("/lichsu/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const lichsu = await lichSu.find({ userId: userId });
    res.json(lichsu);
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
  }
});

// thêm lịch sử mua hàng
app.post("/lichsu/them/:userId", (req, res) => {
  const userId = req.params.userId;
  const { tensp, giasp, img, soluongmua, pttt, tongtien, trangthai, tennguoimua, thoigian } = req.body;

  const newLichSu = new lichSu({
    userId,
    tensp,
    giasp,
    img,
    soluongmua,
    pttt,
    tongtien,
    trangthai,
    tennguoimua,
    thoigian
  });
  newLichSu
    .save()
    .then(() => {
      res.status(201).json({ message: "Thêm lịch sử mua hàng thành công" });
    })
    .catch((err) => {
      console.log("error ", err);
      res.status(500).send("lỗi server");
    });
});

//khởi chạy server
const port = 9997;
app.listen(port, () => {
  console.log(`server đang lắng nghe tại cổng ${port}`);
});