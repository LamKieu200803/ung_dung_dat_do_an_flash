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

//admin
const ThemSchema = new mongoose.Schema({
    tensp: String,
    giasp: String,
    anh: String,
    mota: String,
    soluong: Number
})
const themsanpham = mongoose.model("Themsanphams", ThemSchema);
app.post("/admin/them",(req,res)=>{
    const {tensp,giasp,anh,mota,soluong} = req.body;
  
    const newPro = new themsanpham( {tensp,giasp,anh,mota,soluong})
    newPro.save()
    .then(()=>{
      res.status(201).json({message:"thêm san pham thành công"})
    })
  })
  app.put("/admin/sua/:id",(req,res)=>{
    const id = req.params.id ;
    const updateData = {
       tensp:req.body.tensp,
       giasp:req.body.giasp,
       mota:req.body.mota,
      anh:req.body.anh,
      soluong:req.body.soluong
    };
    themsanpham.findByIdAndUpdate(id,updateData, {new:true})
    .then((data)=>{
      if(data){
         res.status(200).json({
        message:"cập nhật dữ liệu thành công",
        data:data
      });
      }else{
        res.status(404).json({err:"không tìm thấy dữ liệu"})
      }
     
    }
    ).catch((err)=>{
      res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật dữ liệu" });
    })
  });

app.delete("/admin/xoa/:id", (req, res) => {
    const themsanphamDelete = req.params.id;
    // Tạo kết nối tới MongoDB
    themsanpham.findByIdAndRemove(themsanphamDelete)
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




//khach hang
const TaikhoanSchema = new mongoose.Schema({
    Email: String,
    Password: String,
})
// const sanPhamSchema = new mongoose.Schema({
//     tensp: String,
//     giasp: String,
//     anh: String,
//     mota: String,
//     soluong: Number
// })
// const ChitietSchema = new mongoose.Schema({
//     tensp: String,
//     giasp: String,
//     anh: String,
//     mota: String,
//     soluong: Number
// })
const GiohangSchema = new mongoose.Schema({
    tensp: String,
    giasp: String,
    anh: String,
    soluong: Number
})
const HoadonSchema = new mongoose.Schema({
    tensp: String,
    giasp: String,
    anh: String,
    soluong: Number,
    diachi: String,
    sdt: Number,
    tennguoimua: String,
    ngaymua: Date
})
const DontrangthaiSchema = new mongoose.Schema({
    tensp: String,
    giasp: String,
    anh: String,
    soluong: Number,
    diachi: String,
    sdt: Number,
    tennguoimua: String,
    ngaymua: Date,
    trangthai:String
})
const Lichsuchema = new mongoose.Schema({
    tensp: String,
    giasp: String,
    anh: String,
    soluong: Number,
    diachi: String,
    sdt: Number,
    tennguoimua: String,
    ngaymua: Date,
    phanhoi:String
})
const Thongtinchema = new mongoose.Schema({
    anh: String,
    diachi: String,
    sdt: Number,
    tennguoimua: String,
    email:String,
    trangthai:String,
})
//khởi chạy server
const port = 9997;
app.listen(port, () => {
    console.log(`server đang lắng nghe tại cổng ${port}`);
});