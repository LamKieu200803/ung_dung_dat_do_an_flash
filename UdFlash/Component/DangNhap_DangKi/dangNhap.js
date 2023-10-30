import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Xử lý logic đăng nhập ở đây
    console.log('Đăng nhập với tên người dùng:', username);
    console.log('Mật khẩu:', password);
    navigation.navigate('Home');
  };

  const handleForgotPassword = () => {
    // Xử lý logic quên mật khẩu ở đây
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
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot your Password?</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>


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
    fontSize: 20,
    marginTop: 150,
    textAlign: 'center',
    color: 'white',
  },
  tx1: {
    marginTop: 50,
    marginBottom: 80,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    marginTop: 70,
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
    marginTop: 100,
    color: 'white',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default LoginScreen;