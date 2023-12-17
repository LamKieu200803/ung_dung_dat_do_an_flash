import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/home";
import SanPham from "./pages/sanPham";
import KhachHang from "./pages/khachHang";
import Orders from "./pages/hoaDon";
import DangNhap from "./pages/dangNhap";
import DanhMuc from "./pages/danhMuc";
import BinhLuan from "./pages/binhLuan";

const ContentLayout = ({ children }) => (
  <div>
    <Header />
    <div>{children}</div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DangNhap />} />
        <Route
          path="/home"
          element={
            <ContentLayout>
              <Home />
            </ContentLayout>
          }
        />
        <Route
          path="/sanPham"
          element={
            <ContentLayout>
              <SanPham />
            </ContentLayout>
          }
        />
        <Route
          path="/khachHang"
          element={
            <ContentLayout>
              <KhachHang />
            </ContentLayout>
          }
        />
        <Route
          path="/order"
          element={
            <ContentLayout>
              <Orders />
            </ContentLayout>
          }
        />
        <Route
          path="/danhmuc"
          element={
            <ContentLayout>
              <DanhMuc />
            </ContentLayout>
          }
        />
        <Route
          path="/binhluan"
          element={
            <ContentLayout>
              <BinhLuan />
            </ContentLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
