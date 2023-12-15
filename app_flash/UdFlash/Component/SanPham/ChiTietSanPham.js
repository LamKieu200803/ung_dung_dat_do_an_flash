import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
const ChiTietSanPham = ({ route, navigation }) => {
  const [img, setimg] = useState(route.params.item_sp.img);
  const [tensp, settensp] = useState(route.params.item_sp.tensp);
  const [giasp, setgiasp] = useState(route.params.item_sp.giasp);
  const [motasp, setmotasp] = useState(route.params.item_sp.motasp);
  const [soluong, setsoluong] = useState(route.params.item_sp.soluong);
  const [idsp, setidsp] = useState(route.params.item_sp._id);
  const [dsBl, setdsBl] = useState([]);



  const [loginInfo, setloginInfo] = useState('');
  const [isLoginInfoLoaded, setIsLoginInfoLoaded] = useState(false);

  const Save_Pro = () => {
    let objPro = { img: img, tensp: tensp, giasp: giasp, soluongmua: 1 };

    let url_api_giohang = "http://172.16.10.100:9997/giohang/them/" + loginInfo._id + "/" + idsp;
    let url_api_gio = "http://172.16.10.100:9997/giohang/" + loginInfo._id;

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
            "http://172.16.10.100:9997/giohang/sua/" + loginInfo._id + "/" + idsp,
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
              if (res.status == 201) {
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



  const getBl = async () => {
    let api_bl = 'http://172.16.10.100:9997/binhluan/' + idsp
    try {
      const response = await fetch(api_bl);
      const json = await response.json();
      setdsBl(json);
      console.log("da get dc bl" + json);

    } catch (e) {
      console.log(e);

    }
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
      getBl();
    });

    return unsubscribe;
  }, [navigation]);



  return (

    <View style={styles.container} backgroundColor="#DF5A5A">
      <ScrollView>
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
          <Text style={{ color: "black", left: 10, paddingTop: 20, fontSize: 22, fontWeight: '900' }}>
            {route.params.item_sp.tensp}
          </Text>
          <Text style={{ color: "white", left: 10, paddingTop: 10, fontSize: 20, fontWeight: '700' }}>
            Giá: ${route.params.item_sp.giasp}
          </Text>


          <Text style={{ left: 10, color: "black", paddingTop: 10, fontSize: 15, }}>
            Tổng số lượng trong kho: {route.params.item_sp.soluong}    |   Đã bán: {route.params.item_sp.soluongban}
          </Text>
          <Text style={{
            borderBottomColor: '#F38E8E',
            borderBottomWidth: 1
          }}></Text>

        </View>


        <View style={{
          backgroundColor: "#DF5A5A",
          width: "100%",
          height: 250
        }}>
          <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: 'bold' }}>Mô tả sản phẩm </Text>
          <Text style={{
            borderBottomColor: '#F38E8E',
            borderBottomWidth: 1
          }}></Text>
          <ScrollView>
            <Text style={styles.texthello}>{route.params.item_sp.motasp}
            </Text></ScrollView>
          <Text style={{
            borderBottomColor: '#F38E8E',
            borderBottomWidth: 1
          }}></Text>
        </View>
        <View style={{ width: '100%', height: 300, marginTop: 10 }}>
          <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: 'bold' }}>Đánh giá từ người mua</Text>
          <Text style={{
            borderBottomColor: '#F38E8E',
            borderBottomWidth: 1
          }}></Text>
          <ScrollView>
            {dsBl.length > 0 ? (
              dsBl.map((itembl) => (
                <View key={itembl._id} style={{}}>
                  <View style={{flexDirection:'row', padding:10,marginRight:40}}>
                    
                    <View style={{ borderWidth: 0.8, width: 60, height: 60, backgroundColor: 'white', borderRadius: 50 }}>
                      <Image
                        style={{ width: 60, height: 60 }}
                        source={{ uri: itembl.anh }} />
                    </View>
                    <View style={{backgroundColor:'silver', padding:10,borderRadius:30,marginLeft:5, marginRight:20}}>
                    <Text style={{fontSize:15,fontWeight:'bold', color:'black'}}>{itembl.tennguoimua}</Text>
                    <Text>{itembl.noidung}</Text>
               </View>
                  </View>
                  
                </View>
              ))
            ) : (
              <Text>Không có bình luận</Text>
            )}
          </ScrollView>


        </View>
      </ScrollView>

      <TouchableOpacity onPress={Save_Pro} >
        <Text style={styles.button}

        >Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
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
    color: "black",
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 20,
    paddingRight: 15,
    marginRight: 7,
    lineHeight: 29,

  },
  button: {
    margin: 5,
    marginBottom: 20,
    width: 300,
    alignContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    color: "#DF5A5A",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    backgroundColor: "white",
  },
});
export default ChiTietSanPham 