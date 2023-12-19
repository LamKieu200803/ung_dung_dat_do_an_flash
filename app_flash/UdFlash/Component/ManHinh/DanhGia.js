import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Danhgia = ({ navigation, route }) => {
  const [img, setImg] = useState(route.params.item.img);
  const [tensp, setTensp] = useState(route.params.item.tensp);
  const [giasp, setGiasp] = useState(route.params.item.giasp);
  const [idsp, setIdsp] = useState(route.params.item.productId);
  const [loginInfo, setLoginInfo] = useState(null);
  const [soluongmua, setSoluongmua] = useState(route.params.item.soluongmua);
  const [noidung, setNoidung] = useState("");

  useEffect(() => {
    const getLoginInfo = async () => {
      try {
        const value = await AsyncStorage.getItem("loginInfo");
        if (value !== null) {
          const parsedValue = JSON.parse(value);
          setLoginInfo(parsedValue);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLoginInfo();
  }, []);

  const themBl = () => {
    console.log(loginInfo._id);
    console.log(idsp);
    const objPro = { noidung: noidung };
    if(noidung==0){
      alert('Bạn chưa nhập nội dùng bình luận')
      return
    }
    const url_api_bl = `http://10.24.0.248:9997/binhluan/them/${idsp}/${loginInfo._id}`;

    fetch(url_api_bl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objPro),
    })
      .then((res) => {
        if (res.status === 201) {
          console.log("thanh cong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
navigation.navigate('Main')
    alert("Thêm đánh giá thành công");
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white", width: "97%", height: 120, flexDirection: "row" ,borderWidth:1,borderRadius:30,marginLeft:8,marginTop:20}}>
        <Image
          source={{ uri: img }}
          style={{
            width: 90,
            height: 90,
            marginRight: 5,
            margin: 15,
            marginBottom: 10,
            marginLeft: 20,
            borderRadius: 10,
           
          }}
        />
        <View style={{ width: 250, marginLeft: 5, marginTop:20,marginLeft:20}}>
          <Text style={styles.productName}>{tensp}</Text>
          <Text style={styles.productPrice}> $ {giasp}</Text>
          <Text style={styles.productPrice}>Số lượng mua: {soluongmua}</Text>
        </View>
      </View>

      <View style={{ backgroundColor: "white", width: '95%', margin: 10, borderRadius: 8, padding: 10 }}>
  <TextInput
    style={{ width: '100%', height: 150, backgroundColor: "#F2F2F2", borderRadius: 8, paddingHorizontal: 10, fontSize: 16 }}
    placeholder="Nhập bình luận"
    placeholderTextColor="#A9A9A9"
    onChangeText={(txt) => setNoidung(txt)}
    multiline={true}
    numberOfLines={4}
  />
  <TouchableOpacity style={{ backgroundColor: "#FFD700", width: 80, borderRadius: 8, marginTop: 10,marginLeft:350, alignItems: 'center', justifyContent: 'center' }} onPress={themBl}>
    <Text style={{ color: "white", fontSize: 16 }} >Thêm</Text>
  </TouchableOpacity>
</View>
    </View>
  );
};

export default Danhgia;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DF5A5A",
  },
  productName: {
    fontWeight: "bold",
  },
  productPrice: {
    marginTop:10
  },
});