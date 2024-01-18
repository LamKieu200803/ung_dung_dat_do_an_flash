import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from 'react';
const AddAddressScreen = (props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const [loginInfo, setloginInfo] = useState('');
  // const handleAutoFillAddress = () => {
  //   // Thực hiện tự động điền địa chỉ
  //   // Gọi API hoặc thực hiện xử lý ở đây
  //   const autoFilledAddress = {
  //     name: 'Nguyễn Văn A',
  //     phoneNumber: '0123456789',
  //     streetAddress: '123 Đường ABC',
  //     email: 'example@email.com',
  //     state: 'Hà Nội',
  //   };

  //   setName(autoFilledAddress.name);
  //   setPhoneNumber(autoFilledAddress.phoneNumber);
  //   setStreetAddress(autoFilledAddress.streetAddress);
  //   setEmail(autoFilledAddress.email);
  //   setState(autoFilledAddress.state);
  // };
  const getLoginInfo = async () => {
    try {
        const value = await AsyncStorage.getItem('loginInfo')
        if (value !== null) {
            // láy được dữ liệu 
            setloginInfo(JSON.parse(value))
            setisLoading(false)

        }
    } catch (e) {

        console.log(e);
    }
};
useEffect(() => {
    const loadData = async () => {
        await getLoginInfo();
        getLoginInfo()
    };
    loadData();
}, [isLoading]);
  const handleSaveAddress = () => {
    console.log("dd"+loginInfo._id);
    let objPro = { name: name, phone: phone, address: address }
    let url_api_diachi = 'http://172.16.10.109:9997/themdiachi/'+ loginInfo._id;

    fetch(url_api_diachi, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objPro)
    }).then((res) => {
        if (res.status == 201)
            alert("Bạn đã thêm địa chỉ thành công")
            console.log("thanh cong")

    })
        .catch((e) => {
            console.log(e);
        })
    alert('Địa chỉ đã được lưu thành công');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Thêm địa chỉ mới</Text>
      <Text style={styles.label}>Tên người nhận hàng</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên người nhận hàng"
          value={name}
          onChangeText={(txt)=>setName(txt)}
        />
      </View>


      <Text style={styles.label}>Số điện thoại</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại nhận hàng"
          value={phone}
          onChangeText={(txt)=>setPhone(txt)}
        />
      </View>


      <Text style={styles.label}>Địa chỉ </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder=" Nhập địa chỉ nhận hàng"
          value={address}
          onChangeText={(txt)=>setAddress(txt)}
        />
      </View>


    
     

      <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
        <Text style={styles.buttonText}>Hoàn thành</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nameText: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },

  button: {
    backgroundColor: '#DF5A5A',
    padding: 10,
    borderRadius: 20,
    marginTop: 70,
    marginBottom:50
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AddAddressScreen;