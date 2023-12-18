import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props) => {
  const [emaildn, setemaildn] = useState('');
  const [passworddn, setpassworddn] = useState('');

  const doLogin = async () => {
    // Lưu thông tin giỏ hàng vào AsyncStorage
      await AsyncStorage.setItem('gioHang', JSON.stringify({}));
    if (emaildn.length === 0) {
      alert("Chưa nhập email");
      return;
    }
    if (passworddn.length === 0) {
      alert("Chưa nhập password");
      return;
    }
      let url_api = "http://172.16.10.100:9997/user/email?email=" + emaildn;
      fetch(url_api)
      .then ((res)=>{
       return res.json();
      })
      .then(async(res_login)=>{
        console.log(res_login);
       if(res_login.length ===0 || res_login.length>1  ){
           alert("không tồn tại người dùng hoặc lỗi trùng lặp dữ liệu");
           return;
       }
       
       else{
    
        const objU = res_login;
        
        if (objU.password != passworddn) {
          alert("sai tài khoản hoặc mật khẩu");
          return;
        }
           else{
               try {
                   await AsyncStorage.setItem('loginInfo', JSON.stringify(objU))   // từ khóa : loginInfo -- truyền vào mảng là chuỗi json
                   props.navigation.navigate('Main'),
                   alert("đăng nhập thành công")
                 } catch (e) {
                 console.log(e);
                 }
           }
       }
      })
   
   
   }
   useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setemaildn("");
      setpassworddn("");
    });
  
    return unsubscribe;
  }, [props.navigation]);

  const handleForgotPassword = () => {
    console.log('Quên mật khẩu');
  };

  const handleSignUp = () => {
    console.log('Đăng ký');
    props.navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Chào mừng bạn tới app Flash shop</Text>
      <Text style={styles.tx1}>Đăng nhập tài khoản của bạn</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập email"
        onChangeText={(txt) => setemaildn(txt)}
        value={emaildn}
      />
      <TextInput
      secureTextEntry={true}
        style={styles.input}
        placeholder="Nhập mật khẩu"
        onChangeText={(txt) => setpassworddn(txt)}
        value={passworddn}
      />
      {/* <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot your Password?</Text>
      </TouchableOpacity> */}

      <View style={{ paddingTop: 80 }}>
        <TouchableOpacity style={styles.button} onPress={doLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUp}>Bạn chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#DF5A5A',
  },
  welcome: {
    paddingTop: 100,
    textAlign:'center',
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '700',
  },
  tx1: {
    marginTop: 50,
    marginBottom: 50,
    fontSize:20,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 8,
    marginTop:30,
   color:'black',
    borderColor: 'white',
  },
  button: {
    width: 200,
    paddingVertical: 10,
    borderRadius: 8,
    color: 'red',
    left:120,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  buttonText: {
    color: '#DF5A5A',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 12,
    color: 'white',
    marginTop:20,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  signUp: {
    marginTop: 70,
    color: 'white',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize:20
  },
});

export default LoginScreen;