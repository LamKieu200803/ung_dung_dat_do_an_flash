import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [emaildn, setemaildn] = useState('');
  const [passworddn, setpassworddn] = useState('');

  const doLogin = async () => {
    if (emaildn.length === 0) {
      alert("Chưa nhập email");
      return;
    }
    if (passworddn.length === 0) {
      alert("Chưa nhập password");
      return;
    }

    try {
      let url_api = `http://192.168.250.254:9997/user?email=${emaildn}`;
      const response = await fetch(url_api);
      const res_login = await response.json();

      if (res_login.length !== 1) {
        console.log(res_login);
        alert("Sai username hoặc lỗi trùng lặp dữ liệu");
        return;
      } else {
        let objU = res_login[0];
        if (objU.password !== passworddn) {
          alert("Sai password");
          return;
        } else {
          await AsyncStorage.setItem('loginInfo', JSON.stringify(objU));
          navigation.navigate('Home');
          alert("Đăng nhập thành công");
        }
      }
    } catch (error) {
      console.log(error);
      alert("Đã xảy ra lỗi trong quá trình đăng nhập");
    }
  };

  const handleForgotPassword = () => {
    console.log('Quên mật khẩu');
  };

  const handleSignUp = () => {
    console.log('Đăng ký');
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Flash shop</Text>
      <Text style={styles.tx1}>Login to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email/Mobile Number"
        value={emaildn}
        onChangeText={(txt) => setemaildn(txt)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={passworddn}
        onChangeText={(txt) => setpassworddn(txt)}
      />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot your Password?</Text>
      </TouchableOpacity>

      <View style={{ paddingTop: 80 }}>
        <TouchableOpacity style={styles.button} onPress={doLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUp}>Don’t have an account? Sign up</Text>
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
    left: 50,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  tx1: {
    marginTop: 50,
    marginBottom: 50,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 8,
    borderColor: 'white',
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    color: 'red',
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
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  signUp: {
    marginTop: 70,
    color: 'white',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default LoginScreen;