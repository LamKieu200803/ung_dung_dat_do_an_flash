import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal
} from 'react-native'
import React, { useState, useEffect } from "react";
import DropDownPicker from 'react-native-dropdown-picker';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
const ChiTietSanPham = ({ route, navigation }) => {
  const [img, setimg] = useState(route.params.item_sp.img);
  const [tensp, settensp] = useState(route.params.item_sp.tensp);
const [chitietsp, setchitietsp] = useState([]);
const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const { item_sp } = route.params;
  const soluongsp = item_sp.chitietsp.reduce((acc, item) => acc + item.soluong, 0);

  const [motasp, setmotasp] = useState(route.params.item_sp.motasp);
  const [soluong, setsoluong] = useState(route.params.item_sp.soluong);
  const [idsp, setidsp] = useState(route.params.item_sp._id);
  const [dsBl, setdsBl] = useState([]);
  const listItems = [
    { id: 1, label: 'Item 1' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
  ];


  const [loginInfo, setloginInfo] = useState('');
  const [isLoginInfoLoaded, setIsLoginInfoLoaded] = useState(false);


  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setModalVisible(false);
  };

  const Save_Pro = () => {
    if (!selectedItem.size) {
      alert("Vui lòng chọn size trước khi thêm vào giỏ hàng");
      return;
    }
    let objPro = {
idBienThe: selectedItem._id,
      img: img,
      tensp: tensp,
      size: selectedItem.size,
      soluong: selectedItem.soluong,
      giasp: selectedItem.giasp,
      soluongmua: 1,
    };

    let url_api_giohang = "http://172.16.10.109:9997/giohang/them/" + loginInfo._id + "/" + idsp;
    let url_api_gio = "http://172.16.10.109:9997/giohang/" + loginInfo._id;

    fetch(url_api_gio)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi gọi API");
        }
        return response.json();
      })
      .then((json) => {
        let existingProduct = json.find((product) => product.idSanPham === idsp);

        if (existingProduct) {
          existingProduct.soluongmua += 1;

          return fetch(
            "http://172.16.10.109:9997/giohang/sua/" + loginInfo._id + "/" + idsp,
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

  const loaddl = async () => {
    let url_api = 'http://172.16.10.109:9997/chitietsanpham/' + idsp;
    try {
        const response = await fetch(url_api);
        const json = await response.json();

        setchitietsp(json.chitietsp)
        console.log(json.chitietsp);
    } catch (e) {
        console.log(e);

    } 
}



  const getBl = async () => {
    let api_bl = 'http://172.16.10.109:9997/binhluan/' + idsp
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
      loaddl()
      getBl();
    });

    return unsubscribe;
  }, [navigation]);



  return (

    <View style={styles.container}>
    <View>
          <Image
            style={{
              width: 480, height: 220, borderWidth: 1, backgroundColor: "white",
              borderColor: "black"
            }}
            source={{ uri: route.params.item_sp.img }}
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 150
          }}
        >
          <Text style={{ color: "#DF5A5A", left: 10, fontSize: 22, fontWeight: '900' }}>
            {route.params.item_sp.tensp}
          </Text>
          
        <View>
      

      <View style={{}}>
      
<View style={{marginLeft: 2,  }} visible={isModalVisible} >
        <View style={{flexDirection:"row"}}>
          {chitietsp.map((item) => (
            <TouchableOpacity
              style={{borderWidth: 1, padding: 5, marginRight: 2}}
              key={item.id}
onPress={() => handleSelectItem(item)}
            >
<Text>Size: {item.size} {"\n"}Giá sản phẩm: {item.giasp} {"\n"}Số lượng: {item.soluong}</Text>

      
            </TouchableOpacity>
          ))}
        </View>
      </View>
      </View>

      {selectedItem && (
        <Text style={{paddingLeft: 10}}>Size: {selectedItem.size}</Text>
      )}
      {selectedItem && (
        <Text style={{paddingLeft: 10}}>Giá sản phẩm: {selectedItem.giasp}</Text>
      )}
    </View>
      
          <Text style={{ left: 10, color: "black", fontSize: 15, }}>
            Tổng số lượng: {soluongsp}  |   Đã bán: {route.params.item_sp.soluongban}
          </Text>
          
        </View>
      <ScrollView>
      <Text style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
      }}></Text>
        

        <View style={{
          width: 450,
        }}>
        
        <View style={{ width: '100%', height: 250, marginTop: 15 }}>
            <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: 'bold' }}>Mô tả sản phẩm</Text>
            <Text style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1
            }}></Text>
            <ScrollView>
              <Text style={styles.texthello}>{route.params.item_sp.motasp}
              </Text>
              
            </ScrollView>
            <Text style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1
            }}></Text>
        </View>
        </View>
          <View style={{ width: '100%', height: 250, marginTop: 15 }}>
            <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: 'bold' }}>Đánh giá từ người mua</Text>
            <Text style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1
            }}></Text>
          <ScrollView>
            {dsBl.length > 0 ? (
              dsBl.map((itembl) => (
                <View key={itembl._id} style={{}}>
                  <View style={{flexDirection:'row', padding:10,marginRight:40}}>
                    
                    <View style={{ borderWidth: 0.8, width: 60, height: 60, backgroundColor: 'white', borderRadius: 50 }}>
                      <Image
                        style={{ width: 60, height: 60 , borderRadius:50}}
                        source={{ uri: itembl.anhdaidien }} />
                    </View>
                    <View style={{backgroundColor:'silver', padding:10,borderRadius:30,marginLeft:5, marginRight:20}}>
<Text style={{fontSize:15,fontWeight:'bold', color:'black'}}>{itembl.tenkhachhang}</Text>
                    <Text>{itembl.noidung}</Text>
               </View>
                  </View>
                  
                </View>
              ))
            ) : (
              <View>
              <Text style={{textAlign:'center', fontSize:20, marginTop:60}}>Chưa có đánh giá nào</Text>
<Text style={{textAlign:'center', fontSize:15}}>Hãy là người đầu tiên đánh giá cho sản phẩm này.</Text>
</View>
          )}
          </ScrollView>
        
          <Text style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,

          }}></Text>
        </View>
        
      </ScrollView>

      <TouchableOpacity onPress={Save_Pro} >
        <Text style={styles.button}>Thêm vào giỏ hàng</Text>
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
    width: 170,
    alignContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    color: "white",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    backgroundColor: "#DF5A5A",
  },
});
export default ChiTietSanPham