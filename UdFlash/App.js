import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Provider as PaperProvider } from 'react-native-paper';


import LoginScreen from './Component/DangNhap_DangKi/dangNhap';
import HomeScreen from './Component/home';
import DangKi from './Component/DangNhap_DangKi/dangKi';
import MhChao from './Component/ManHinh/MhChao';
import ChiTietSanPham from './Component/SanPham/ChiTietSanPham';
import CartScreen from './Component/cartScreen';
import PaymentScreen from './Component/paymentScreen';
import PaymentOptionsScreen from './Component/paymentScreen';
import ChangePasswordScreen from './Component/changePasswordScreen';
import AddAddressScreen from './Component/addAddressScreen';
import HistoryScreen from './Component/historyScreen';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='MhChao'>
          <Stack.Screen name="MhChao" component={MhChao} />
          <Stack.Screen name="SignUp" component={DangKi} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SanPham" component={ChiTietSanPham} />
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