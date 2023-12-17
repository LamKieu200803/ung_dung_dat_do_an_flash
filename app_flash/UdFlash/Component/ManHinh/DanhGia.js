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
    const url_api_bl = `http://172.16.10.100:9997/binhluan/them/${idsp}/${loginInfo._id}`;

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

    alert("Thêm đánh giá thành công");
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white", width: "100%", height: 80, flexDirection: "row" }}>
        <Image
          source={{ uri: img }}
          style={{
            width: 70,
            height: 70,
            marginRight: 5,
            margin: 5,
            marginBottom: 10,
            marginLeft: 10,
            borderRadius: 10,
          }}
        />
        <View style={{ width: 250, marginLeft: 5, marginTop: 5 }}>
          <Text style={styles.productName}>{tensp}</Text>
          <Text style={styles.productPrice}> $ {giasp}</Text>
          <Text style={styles.productPrice1}>Số lượng mua: {soluongmua}</Text>
        </View>
      </View>

      <View style={{ backgroundColor: "white", width: 250, height: 250, margin: 10, padding: 10 }}>
        <TextInput
          style={{ width: 300, height: 50, backgroundColor: "gray", color: "white" }}
          placeholder="Nhập bình luận"
          onChangeText={(txt) => setNoidung(txt)}
        />
        <TouchableOpacity style={{ backgroundColor: "yellow", width: 80 }} onPress={themBl}>
          <Text>Thêm</Text>
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
});