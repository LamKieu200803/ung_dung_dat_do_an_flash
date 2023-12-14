import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import React, { useState,useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
const ChiTietSanPham = ({ route, navigation }) => {
    const [img, setimg] = useState(route.params.item_sp.img);
    const [tensp, settensp] = useState(route.params.item_sp.tensp);
    const [giasp, setgiasp] = useState(route.params.item_sp.giasp);
    const [motasp, setmotasp] = useState(route.params.item_sp.motasp);
    const [soluong, setsoluong] = useState(route.params.item_sp.soluong);
    const [idsp, setidsp] = useState(route.params.item_sp._id);
    
    const [loginInfo, setloginInfo] = useState('');
  const [isLoginInfoLoaded, setIsLoginInfoLoaded] = useState(false);

  const Save_Pro = () => {
    let objPro = { img: img, tensp: tensp, giasp: giasp, soluongmua: 1 };
  
    let url_api_giohang = "http://172.16.10.106:9997/giohang/them/" + loginInfo._id + "/" + idsp;
    let url_api_gio = "http://172.16.10.106:9997/giohang/" + loginInfo._id;
  
    fetch(url_api_gio)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi gọi API");
        }
        return response.json();
      })
      .then((json) => {
        let existingProduct = json.find((product) => product.productId === idsp);
  
        if (existingProduct) {
          existingProduct.soluongmua += 1;
  
          return fetch(
            "http://172.16.10.106:9997/giohang/sua/" + loginInfo._id + "/" + idsp,
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(existingProduct),
            }
          )
          .then((res) => {
            if (res.status === 200) {
              console.log("Cập nhật sản phẩm trong giỏ hàng thành công");
              return res.json();
            } else {
              throw new Error("Cập nhật sản phẩm trong giỏ hàng thất bại");
            }
          });
        } else {
          return fetch(url_api_giohang, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(objPro),
          })
          .then((res) => {
            if (res.status === 201) {
              console.log("Thêm sản phẩm vào giỏ hàng thành công");
              return res.json();
            } else {
              throw new Error("Thêm sản phẩm vào giỏ hàng thất bại");
            }
          });
        }
      })
      .then((data) => {
        console.log("Tìm thấy id: " + loginInfo._id);
        console.log("Thông tin sản phẩm:", data);
        alert("Thao tác thành công");
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
                <TouchableOpacity onPress={Save_Pro}>
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