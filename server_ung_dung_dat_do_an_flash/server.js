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




//khởi chạy server
const port = 9997;
app.listen(port, () => {
  console.log("server đang lắng nghe tại cổng ${port}");
});
