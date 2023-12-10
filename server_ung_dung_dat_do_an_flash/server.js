const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const path = require("path");
app.use(cors());

app.use(express.json());

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
});

const User = mongoose.model("Users", userSchema);

// Schema và model sanpham
const sanPhamSchema = new mongoose.Schema({
  tensp: String,
  giasp: String,
  img: String,
  motasp: String,
  soluong: Number,
});

const SanPham = mongoose.model("SanPhams", sanPhamSchema);

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
    required: true,
  },
  diachi: String,
  sdt: String,
  tennguoimua: String,
  pttt: String,
  tongtien: Number,
});

const hoaDon = mongoose.model("HoaDons", hoaDonSchema);

// Schema và model thông tin
const thongTinSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: String,
  anh: String,
  tennguoimua: String,
});

const thongTin = mongoose.model("ThongTins", thongTinSchema);

// Schema và model đơn trạng thái
const trangThaiSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  tensp: String,
  giasp: String,
  img: String,
  soluongmua: String,
  trangthai: String,
  pttt: String,
  tongtien: String,
});

const trangThai = mongoose.model("TrangThais", trangThaiSchema);

// Schema và model lịch sử mua hàng
const lichSuSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  tensp: String,
  giasp: String,
  img: String,
  soluongmua: String,
  pttt: String,
  tennguoimua: String,
  tongtien: String,
  phanhoi: String,
});

const lichSu = mongoose.model("LichSus", lichSuSchema);
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
      `Tháng ${month}`,
      count,
    ]);
    const data = [["Month", "Orders"], ...formattedData];

    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});
// dki tài khoản
app.post("/dangki", (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({ email, password });
  newUser.save().then(() => {
    res.status(201).json({ message: "tạo tài khoản thành công" });
  });
});

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
app.get("/user", async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
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

// xem sản phẩm
app.get("/sanpham", async (req, res) => {
  try {
    const sanpham = await SanPham.find({});
    res.json(sanpham);
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
  }
});

// thêm sản phẩm
app.post("/sanpham/them", (req, res) => {
  const { tensp, giasp, img, motasp, soluong } = req.body;

  const newSanPham = new SanPham({ tensp, giasp, img, motasp, soluong });
  newSanPham.save().then(() => {
    res.status(201).json({ message: "thêm sản phẩm thành công" });
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
  };
  SanPham.findByIdAndUpdate(id, updateSanPham, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "cập nhật dữ liệu thành công",
          data: data,
        });
      } else {
        res.status(404).json({ err: "không tìm thấy dữ liệu" });
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

// Xem giỏ hàng của người dùng

app.get("/giohang/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const giohang = await gioHang.find({ userId: userId });
    res.json(giohang);
  } catch (err) {
    console.log("Lỗi ", err);
    res.status(500).send("Lỗi máy chủ");
  }
});

// Thêm vào giỏ hàng của người dùng
app.post("/giohang/them/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { tensp, giasp, img, soluongmua } = req.body;

  try {
    const giohang = await gioHang.create({
      userId: userId,
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
    await gioHang.deleteOne({ userId: userId, _id: productId });
    res.status(200).send("Sản phẩm đã được xóa khỏi giỏ hàng thành công");
  } catch (err) {
    console.log("Lỗi ", err);
    res.status(500).send("Lỗi máy chủ");
  }
});
app.get("/hoadon", async (req, res) => {
  try {
    const hoadon = await hoaDon.find({});
    res.json(hoadon);
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
  }
});

// xem hóa đơn theo id người dùng
app.get("/hoadon/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const hoadon = await hoaDon.find(userId);
    res.json(hoadon);
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
  }
});

// thêm hóa đơn theo id người dùng
app.post("/hoadon/them/:userId", (req, res) => {
  const userId = req.params.userId;
  const { diachi, sdt, tennguoimua, pttt, tongtien } = req.body;

  const newHoaDon = new hoaDon({
    userId,
    diachi,
    sdt,
    tennguoimua,
    pttt,
    tongtien,
  });
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
  const { tennguoimua, anh, trangthai, email } = req.body;

  const newThongTin = new thongTin({
    userId,
    tennguoimua,
    anh,
    trangthai,
    email,
  });
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

// xem đơn trạng thái
app.get("/trangthai/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const trangthai = await trangThai.find({ userId: userId });
    res.json(trangthai);
  } catch (err) {
    console.log("error ", err);
    res.status(500).send("lỗi server");
  }
});

// thêm đơn trạng thái
app.post("/trangthai/them/:userId", (req, res) => {
  const userId = req.params.userId;
  const { tensp, giasp, img, soluongmua, pttt, tongtien, trangthai } = req.body;

  const newTrangThai = new trangThai({
    userId,
    tensp,
    giasp,
    img,
    soluongmua,
    pttt,
    tongtien,
    trangthai,
  });
  newTrangThai
    .save()
    .then(() => {
      res.status(201).json({ message: "Thêm đơn trạng thái thành công" });
    })
    .catch((err) => {
      console.log("error ", err);
      res.status(500).send("lỗi server");
    });
});

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
  const {
    tensp,
    giasp,
    img,
    soluongmua,
    pttt,
    tongtien,
    trangthai,
    tennguoimua,
    phanhoi,
  } = req.body;

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
    phanhoi,
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
