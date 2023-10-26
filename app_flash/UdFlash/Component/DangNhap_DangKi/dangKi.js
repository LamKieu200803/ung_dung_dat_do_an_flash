import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const DangKi = (props) => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [enterpasswd, setenterpasswd] = useState('');


  const SaveUser = () =>{


    if(email ==0){
        return
    }if(password ==0){
        return
    }if(password != enterpasswd){
        return
    }

    let objUser  = {email:email, password:password }
    let url_api = "http://192.168.250.254:9997/dangki"

    fetch(url_api,{
        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(objUser),
    }).then((res)=>{
        if(res.status==201)
        props.navigation.navigate('Login',{email,password})
        alert("dang ki thanh cong")
    })
    .catch((e)=>{
        console.log(e);
    })

}





  const navigation = useNavigation();

  const handleLogin = () => {
    console.log('Đăng nhập');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container} backgroundColor="#DF5A5A">
      <Text style={styles.texthello}>Welcome to Flash Shop</Text>
      <Text style={{ color: 'white', paddingBottom: 50, paddingTop: 30 }}>
        Sign Up to your account
      </Text>
      <View style={styles.inputcontainer}>
        <TextInput style={styles.textInput} placeholder="Email/Phone Number"  value={email} onChangeText={(txt)=>setemail(txt)} />
      </View>
      <View style={styles.inputcontainer}>
        <View
          style={[styles.textInput, { flexDirection: 'row', alignItems: 'center' }]}
        >
          <TextInput style={{ flex: 1 }} placeholder="Nhập mật khẩu" onChangeText={(txt)=>setpassword(txt)} />
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View
          style={[styles.textInput, { flexDirection: 'row', alignItems: 'center' }]}
        >
          <TextInput style={{ flex: 1 }} placeholder="Nhập lại mật khẩu" onChangeText={(txt)=>setenterpasswd(txt)} />
        </View>
      </View>
      <TouchableOpacity
      onPress={handleLogin}
        style={{
          
          width: '80%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 50,
          marginVertical: 10,
          
        }}
      >
        <Text style={styles.button} onPress={SaveUser}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.signIn} >Have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
  },
  texthello: {
    paddingTop: 100,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    paddingVertical: 20,
  },
  inputcontainer: {
    color: 'white',
    position: 'relative',
    marginHorizontal: 30,
    width: '85%',
    padding: 10,
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 8,
    borderColor: 'white',
  },
  bottominput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
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

  signIn: {
    marginTop: 70,
    color: 'white',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default DangKi;