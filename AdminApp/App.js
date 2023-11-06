import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import trangChuAd from './ComponentAdmin/trangChu';
import danhSachSanPham from './ComponentAdmin/danhSachSanPham';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='trangChu'>
          <Stack.Screen name="trangChu" component={trangChuAd} />
          <Stack.Screen name="danhSachSanPham" component={danhSachSanPham} />
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