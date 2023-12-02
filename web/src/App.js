import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SanPham from "./pages/sanPham";
import Home from "./pages/home";
import Header from "./Header";
import KhachHang from "./pages/khachHang";
import Orders from "./pages/hoaDon";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sanPham" element={<SanPham />} />
        <Route path="/khachHang" element={<KhachHang />} />
        <Route path="/order" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
