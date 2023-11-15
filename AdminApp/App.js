import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import trangChuAd from './ComponentAdmin/trangChu';
import danhSachSanPham from './ComponentAdmin/danhSachSanPham';
import quanLiHoaDon from './ComponentAdmin/quanLiHoaDon';
import AddProductScreen from './ComponentAdmin/themSanPham';
import chiTietHoaDon from './ComponentAdmin/chiTietHoaDon';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='trangChu'>
          <Stack.Screen name="trangChu" component={trangChuAd} />
          <Stack.Screen name="danhSachSanPham" component={danhSachSanPham} />
          <Stack.Screen name="chiTietHoaDon" component={chiTietHoaDon} />
          <Stack.Screen name="quanliHD" component={quanLiHoaDon} />
          <Stack.Screen name="themSp" component={AddProductScreen} />
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