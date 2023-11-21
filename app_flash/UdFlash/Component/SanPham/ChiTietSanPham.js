import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import React, { useState,useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChiTietSanPham = ({ route, navigation }) => {
    const [img, setimg] = useState(route.params.item_sp.img);
    const [tensp, settensp] = useState(route.params.item_sp.tensp);
    const [giasp, setgiasp] = useState(route.params.item_sp.giasp);
    const [motasp, setmotasp] = useState(route.params.item_sp.motasp);
    const [soluong, setsoluong] = useState(route.params.item_sp.soluong);
    const [loginInfo, setloginInfo] = useState('');
  const [isLoginInfoLoaded, setIsLoginInfoLoaded] = useState(false);

    const Save_Pro = () => {
        let objPro = { img: img, tensp: tensp, giasp: giasp, soluongmua: "1" }
        let url_api_giohang = 'http://172.16.10.110:9997/giohang/them/' + loginInfo._id;

        fetch(url_api_giohang, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objPro)
        }).then((res) => {
            if (res.status == 201)
                alert("them sản phẩm vào giỏ hàng thanh cong")
                console.log("thanh cong")

        })
            .catch((e) => {
                console.log(e);
            })


    }
    const getLoginInfo = async () => {
        try {
            const value = await AsyncStorage.getItem('loginInfo')
            if (value !== null) {
                // láy được dữ liệu 
                setloginInfo(JSON.parse(value))
            }
        } catch (e) {
      
            console.log(e);
        }
       
      };

      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // khi màn hình đc active thì lệnh hoạt động
          getLoginInfo();
       
          
        });
      
        return unsubscribe;
      }, [navigation]);


    const handleGioHang = () => {
        console.log('giỏ hàng');
        navigation.navigate('gioHang');
    };
    return (
        <View style={styles.container} backgroundColor="#DF5A5A">
            <View>
                <Image
                    style={{
                        width: 480, height: 250, borderWidth: 1, backgroundColor: "white",
                        borderColor: "black"
                    }}
                    source={{ uri: route.params.item_sp.img }}
                />
            </View>

            <View
                style={{
                    backgroundColor: "#DF5A5A",
                    width: "100%",
                    height: 150
                }}
            >
                <Text style={{ color: "white", left: 10, paddingTop: 20, fontSize: 20, fontWeight: '900' }}>
                    {route.params.item_sp.tensp}
                </Text>
                <Text style={{ color: "white", left: 10, paddingTop: 10, fontSize: 20, fontWeight: '900' }}>
                    ${route.params.item_sp.giasp}
                </Text>


                <Text style={{ left:10,color: "white",  paddingTop: 10, fontSize: 20, fontWeight: '900'}}>
                    Số lượng: {route.params.item_sp.soluong}
                </Text>
                <Text style={{borderBottomColor: '#F38E8E', 
        borderBottomWidth: 1 }}></Text>

            </View>


            <View style={{
                backgroundColor: "#DF5A5A",
                width: "100%",
                height: 200
                }}>
                <Text style={styles.texthello}>{route.params.item_sp.motasp}
                </Text>
                <Text style={{borderBottomColor: '#F38E8E', 
        borderBottomWidth: 1,marginTop:20 }}></Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: "#DF5A5A",
                    marginTop: 43,
                    width: "105%",
                    height: 150
                }}
            >
                <TouchableOpacity
                    onPress={Save_Pro}
                >
                    <Text style={styles.button}

                    >Add to card</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
        alignItems: "center",
    },
    texthello: {
        paddingTop: 10,
        color: "#FFFFFF",
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 20,
        lineHeight: 29,
    
    },
    button: {
        margin: 40,
        width: 100,
        paddingVertical: 10,
        borderRadius: 10,
        color: "#DF5A5A",
        fontSize: 15,
        left: 165,
        fontWeight: "700",
        textAlign: "center",
        backgroundColor: "white",
    },
});
export default ChiTietSanPham