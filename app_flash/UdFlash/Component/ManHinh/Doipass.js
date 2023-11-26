import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Doipass = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginInfo, setloginInfo] = useState('');


    const getdulieu = async () => {
        let api_url_pro = "http://192.168.1.228:9997/user/"+loginInfo._id ;
        try {
          const response = await fetch(api_url_pro);
          const json = await response.json();
          setdsPro(json);
        } catch (e) {
          console.log(e);
        } finally {
          setisLoading(false);
        }
      };


const Doipass = () =>{

    let url_api_doipass = "http://192.168.1.228:9997/user/sua/"+loginInfo._id ;
    let user_pass = {password :newPassword}

    fetch(url_api_doipass, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user_pass)
    }).then((res) => {
        if (res.status == 200)
            alert("thay doi thanh cong")
    })
        .catch((e) => {
            console.log(e);
        })

   
}


  

const getLoginInfo = async () => {
    try {
        const value = await AsyncStorage.getItem('loginInfo')
        if (value !== null) {
            // láy được dữ liệu 
            setloginInfo(JSON.parse(value))
        }
    } catch (e) {

        console.log(e);
    }
}



React.useEffect(() => {
    const unsubcribe = props.navigation.addListener('focus', () => {
        getdulieu();
        getLoginInfo();
    });
    return unsubcribe
}, [props.navigation]);



    
    const handleChangePassword = () => {
        // Kiểm tra điều kiện hợp lệ của mật khẩu
        if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
            alert('Vui lòng nhập mật khẩu cũ, mật khẩu mới và mật khẩu nhập lại');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Mật khẩu mới và mật khẩu nhập lại không khớp nhau');
            return;
        }

 
        // Thực hiện việc đổi mật khẩu
        // Gọi API hoặc thực hiện xử lý ở đây

        // Hiển thị thông báo thành công
        alert('Mật khẩu đã được thay đổi thành công');
    };

    return (
        <View style={styles.container}>

            <Text style={styles.txt}>Đổi mật khẩu</Text>
            <Text style={styles.txt1}>Mật khẩu của bạn phải có ít nhất 6 ký tự, bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%).</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Mật khẩu cũ"
                value={oldPassword}
                onChangeText={setOldPassword}
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#DF5A5A',
    },
    txt: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 100
    },
    txt1: {
        marginBottom: 60,
        marginTop: 70
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 40,
        paddingHorizontal: 8,
        borderRadius: 20,
        backgroundColor: 'white'
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
});

export default Doipass;