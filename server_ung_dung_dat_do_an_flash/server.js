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
  soluongsp: Number,
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
  chitietsp: [{
    size: String,
    giasp: Number,
    soluong: Number
  }]
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
  giohang: [{
    idSanPham: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SanPham'
    },
    chitietsp: [{
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

  const newKhachHang = new User({ email, password, tenkhachhang,sdt, anhdaidien, diachi });
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

// xem chi tiết tài khoản theo email
app.get("/khachhang/email", async (req, res) => {
  try {
    const email = req.query.email;

    const kh = await KhachHang.findOne({ email });
if (!kh) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    res.json(user);
  } catch (err) {
    console.log("error", err);
    res.status(500).send("Lỗi server");
  }
});

// xóa tài khoản
app.delete("/khachhang/xoa/:id", (req, res) => {
  const deletetk = req.params.id;
  User.findByIdAndRemove(deletetk)
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

    res.json(user);
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

//khởi chạy server
const port = 9997;
app.listen(port, () => {
  console.log("server đang lắng nghe tại cổng ${port}");
});
