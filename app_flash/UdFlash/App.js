import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Component/DangNhap_DangKi/dangNhap';
import HomeScreen from './Component/ManHinh/home';
import DangKi from './Component/DangNhap_DangKi/dangKi';
import MhChao from './Component/ManHinh/MhChao';
import ChiTietSanPham from './Component/SanPham/ChiTietSanPham';
import GioHang from './Component/ManHinh/gioHang';
import ThanhToan from './Component/ManHinh/thanhToan';
import Main from './Component/Main';
import AddAddressScreen from './Component/ManHinh/addAddressScreen';
import Doipass from './Component/ManHinh/Doipass';
import LichSu from './Component/ManHinh/LichSu';
import AllDiachi  from './Component/ManHinh/AllDiachi';
import Thongtin from './Component/ManHinh/Thongtin';
import Webview from './Component/ManHinh/Webview';
import TrangThai from './Component/ManHinh/TrangThai';
import chiTietDanhMuc from './Component/ManHinh/chiTietDanhMuc';
import PaymentButton from './Component/ManHinh/PaymentButton';
import Danhgia from './Component/ManHinh/DanhGia';
import SuaDiaChi from './Component/ManHinh/SuaDiaChi';
import Profile from './Component/ManHinh/Profile';
import Lienhe from './Component/Lienhe';
const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen name="SuaDiaChi" component={SuaDiaChi} />
          <Stack.Screen name="MhChao" component={MhChao} />
          <Stack.Screen name="SignUp" component={DangKi} options={{title:'Đăng ký'}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{title:'Đăng nhập', headerShown:false}} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Danhgia" component={Danhgia} options={{title:'Đánh giá'}} />
          <Stack.Screen name="SanPham" component={ChiTietSanPham} options={{title:'Chi tiết sản phẩm'}}/>
          <Stack.Screen name="gioHang" component={GioHang} />
          <Stack.Screen name="Lienhe" component={Lienhe} />
          <Stack.Screen name="AllDiachi" component={AllDiachi} options={{title:'Chọn địa chỉ nhận hàng'}} />
          <Stack.Screen name="LichSu" component={LichSu}  />
          <Stack.Screen name="TrangThai" component={TrangThai} options={{title:'Đơn mua'}}/>
         <Stack.Screen name='Payment' component={PaymentButton} options={{title:'Chi tiết đơn mua'}} />
          <Stack.Screen name="ThanhToan" component={ThanhToan} />
          <Stack.Screen name="Webview" component={Webview} />
          <Stack.Screen name="chiTietDanhMuc" component={chiTietDanhMuc} options={{title:'Chi tiết danh mục'}} />
          <Stack.Screen name="Thongtin" component={Thongtin}  options={{title:'Thông tin'}} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Doipass" component={Doipass} />
          <Stack.Screen name='Main' component={Main} options={{headerShown:false}}/>
          <Stack.Screen name='AddAddress' component={AddAddressScreen} options={{title:'Địa chỉ mới'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});