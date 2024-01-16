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
  const [tenkhachhang, setTenkhachhang] = useState('');
  const [diachi, setDiachi] = useState('');
  const [sdt, setSdt] = useState('');
  const [anhdaidien, setAnhdaidien] = useState('');
  const [enterpasswd, setenterpasswd] = useState('');
  const validateEmail = (email) => {
    // Biểu thức chính quy để kiểm tra tính hợp lệ của email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const SaveUser = () =>{
    if (!validateEmail(email)) {
      alert("Email không hợp lệ");
      return;
    }
    if(email ==0){
      alert("chưa nhập email")
        return
    }if(password ==0){
      alert("chưa nhập password")
        return
        
    }if(tenkhachhang ==0){
      alert("chưa nhập password")
        return
        
    }
    if(sdt ==0){
      alert("chưa nhập password")
        return
        
    }
    if(password != enterpasswd){
      alert("password nhập lại không trùng khớp ")
        return
    }

    let objUser  = {email:email, password:password,tenkhachhang:tenkhachhang ,diachi:diachi,sdt:sdt,anhdaidien:"https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"}
    let url_api = "http://172.16.10.109:9997/dangki"

    fetch(url_api,{
        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(objUser),
    }).then((res)=>{
        if(res.status==201)
        alert("dang ki thanh cong")
        props.navigation.navigate('Login',{email,password,tenkhachhang,diachi,sdt,anhdaidien})
    })
    .catch((e)=>{
        console.log(e);
    })

}



  const handleLogin = () => {
    console.log('Đăng nhập');
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.container} backgroundColor="#fff">
      <Text style={styles.texthello}>Chào mừng bạn đến với app Flash Shop</Text>
      <Text style={{ color: '#da5f5f', paddingBottom: 50, paddingTop: 30 ,fontSize:20}}>
        Đăng ký tài khoản của bạn
      </Text>
      <View style={styles.inputcontainer}>
        <TextInput style={styles.textInput} placeholder="Nhập email"  value={email} onChangeText={(txt)=>setemail(txt)} />
      </View>
      <View style={styles.inputcontainer}>
        <View
          style={[styles.textInput, { flexDirection: 'row', alignItems: 'center' }]}
        >
          <TextInput style={{ flex: 1, color:'black' }}secureTextEntry={true} placeholder="Nhập mật khẩu" onChangeText={(txt)=>setpassword(txt)} />
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View
          style={[styles.textInput, { flexDirection: 'row', alignItems: 'center' }]}
        >
          <TextInput style={{ flex: 1, color:'black' }}secureTextEntry={true} placeholder="Nhập lại mật khẩu" onChangeText={(txt)=>setenterpasswd(txt)} />
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View
          style={[styles.textInput, { flexDirection: 'row', alignItems: 'center' }]}
        >
          <TextInput style={{ flex: 1, color:'black' }} placeholder="Nhập địa chỉ" onChangeText={(txt)=>setDiachi(txt)} />
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View
          style={[styles.textInput, { flexDirection: 'row', alignItems: 'center' }]}
        >
          <TextInput style={{ flex: 1 ,color:'black'  }}  placeholder="Nhập tên" onChangeText={(txt)=>setTenkhachhang(txt)} />
        </View>
      </View>
      <View style={styles.inputcontainer}>
        <View
          style={[styles.textInput, { flexDirection: 'row', alignItems: 'center' }]}
        >
          <TextInput style={{ flex: 1 ,color:'black'  }}  placeholder="Nhập SDT" onChangeText={(txt)=>setSdt(txt)} />
        </View>
      </View>
      <TouchableOpacity
      onPress={handleLogin}
        style={{
          
          width: '80%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 30,
          marginVertical: 10,
          
        }}
      >
        <Text style={styles.button} onPress={SaveUser}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={handleLogin}>
        <Text style={styles.signIn} >Bạn đã có tài khoản?Đăng nhập</Text>
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
    paddingTop: 70,
    color: '#da5f5f',
    fontSize: 24,
    fontWeight: '700',
    paddingVertical: 20,
  },
  inputcontainer: {
    color: '#da5f5f',
    position: 'relative',
    marginHorizontal: 30,
    width: '85%',
    padding: 5,
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 8,
    color:'black',
    borderColor: '#da5f5f',
  },
  bottominput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  button: {
    width: '50%',
    paddingVertical: 10,
    borderRadius: 8,
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    backgroundColor: '#da5f5f',
  },

  signIn: {
    marginTop: 30,
    color: '#000',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize:20
  },
});

export default DangKi;