import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

const SuaDiaChi = ({route,navigation}) => {
  const [name, setName] = useState(route.params.item.name);
  const [phone, setPhone] = useState(route.params.item.phone);
  const [address, setAddress] = useState(route.params.item.address);
  
  const [idd, setId] = useState(route.params.item._id);
      

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

  const handleSaveAddress = () => {
    let objPro = { name: name, phone: phone, address: address }
    let url_api_diachi = 'http://172.20.10.11:9997/diachi/sua/'+ idd;

    fetch(url_api_diachi, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objPro) 
    }).then((res) => {
        if (res.status == 201)
            alert("Bạn sửa địa chỉ  thành công")
         
            console.log("thanh cong")

    })
        .catch((e) => {
            console.log(e);
        }) 
        navigation.navigate('AllDiachi')
    alert('Địa chỉ đã được lưu thành công');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sửa địa chỉ</Text>
      <Text style={styles.label}>Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(txt)=>setName(txt)}
        />
      </View>


      <Text style={styles.label}>Phone</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={(txt)=>setPhone(txt)}
        />
      </View>


      <Text style={styles.label}>Street address</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Street address"
          value={address}
          onChangeText={(txt)=>setAddress(txt)}
        />
      </View>


     

     

      <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SuaDiaChi
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
    marginBottom:50,
    width:'40%',
    marginLeft:140
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});