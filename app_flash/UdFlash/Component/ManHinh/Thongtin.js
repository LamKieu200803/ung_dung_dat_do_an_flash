import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
const Thongtin = ({ route, navigation }) => {
  const [tennguoimua, setTennguoimua] = useState(route.params.item.tennguoimua);
  const [phone, setPhone] = useState(route.params.item.phone);
  const [anh, setAnh] = useState(route.params.item.anh);
  const [loginInfo, setLoginInfo] = useState('');
  const [userId1, setUserId1] = useState(route.params.item.userId);
  const [isLoginInfoLoaded, setIsLoginInfoLoaded] = useState(false);
  const [isLoading, setisLoading] = useState(true);


  const handleSavett = () => {
    console.log(loginInfo._id);
    let objPro = { tennguoimua: tennguoimua, phone: phone, anh: anh };
    let url_api_tt = 'http://172.16.10.100:9997/thongtin/sua/' +loginInfo._id;

    fetch(url_api_tt, {
      method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objPro)
    }).then((res) => {
        if (res.status == 201){
            console.log("thanh cong")
        }
  

    })
        .catch((e) => {
            console.log(e);
        })
    navigation.navigate('Main')
  };

  

  const getLoginInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('loginInfo');
      if (value !== null) {
        setLoginInfo(JSON.parse(value));
        setisLoading(false)
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const loadData = async () => {
        await getLoginInfo();
        setIsLoginInfoLoaded(true);
      
        getLoginInfo()
    };
    loadData();
}, []);

useEffect(() => {
    if (isLoginInfoLoaded) {
     
        setisLoading(true)
        getLoginInfo()
    }

}, [isLoginInfoLoaded]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Điền thông tin</Text>
      <Text style={styles.label}>Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={tennguoimua}
          onChangeText={(txt)=>setTennguoimua(txt)}
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

      <Text style={styles.label}>Ảnh</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ảnh"
          value={anh}
          onChangeText={(txt)=>setAnh(txt)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSavett}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#DF5A5A'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#FFFFFF',
    marginTop: 1
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF',
    marginTop: 10
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    color: '#FFFFFF',
    marginBottom: 10,
    marginTop: 10
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    marginTop: 70,
    marginBottom: 50,
    width: '50%',
    marginLeft: 100
  },
  buttonText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Thongtin;