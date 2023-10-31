import * as React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from './ManHinh/home';
import GioHang from './ManHinh/gioHang';




// Screen names
const TrangChuName = 'Home'
const GioHangName = 'Cart'



const Tab = createBottomTabNavigator();

export default function Main(){
    return(
        <Tab.Navigator
            initialRouteName={TrangChuName}
            screenOptions={({ route })=>({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;
              
                    if (rn == TrangChuName) {
                      iconName = focused ? "md-home" : "md-home-outline";
                    } else if (rn == GioHangName) {
                      iconName = focused ? "cart" : "cart-outline";
                    // } else if (rn == LichSuName) {
                    //   iconName = focused ? "md-receipt" : "md-receipt-outline";
                    // }   else if (rn == TaiKhoanName) {
                    //     iconName = focused ? "menu" : "menu-outline";
                    } 
                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen name={TrangChuName} component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name={GioHangName} component={GioHang} options={{ headerShown: false }} />
            {/* { <Tab.Screen name={LichSuName} component={LichSu} options={{ headerShown: false }}/>
            <Tab.Screen name={TaiKhoanName} component={TaiKhoan} options={{ headerShown: false }}/> } */}
          
        </Tab.Navigator>
    )
}
