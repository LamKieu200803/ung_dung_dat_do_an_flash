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
const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'>
          <Stack.Screen name="MhChao" component={MhChao} />
          <Stack.Screen name="SignUp" component={DangKi} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SanPham" component={ChiTietSanPham} />
          <Stack.Screen name="gioHang" component={GioHang} />
          <Stack.Screen name="ThanhToan" component={ThanhToan} />
          <Stack.Screen name='Main' component={Main} options={{headerShown:false}}/>
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