import React from 'react';
import { View, TextInput, StyleSheet, FlatList, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";


const Profile = (props) => {

    const [loginInfo, setloginInfo] = useState('');
    const [dsPro, setdsPro] = useState([]);


    const getThongTin = async () => {

        let api_url_pro = 'http://172.16.10.106:9997/thongtin/' + loginInfo._id
        try {
            const response = await fetch(api_url_pro);
            const json = await response.json();
            setdsPro(json);
            console.log("mang tt nguoi dung" + json);

        } catch (e) {
            console.log(e);
        }
    };
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
    };  

    const renderNguoidung = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', marginTop:120, marginLeft:20 }}>
               
                <View style={{borderRadius:300,backgroundColor:'white', width:100, height:100}}> 
                     <Image
                    style={{ width: 100, height: 80 }}
                    source={{ uri: item.anh }} />
                    </View>
 <View>
                    <Text style={styles.gmail}>Email: {loginInfo.email}</Text>
                    <Text style={styles.ten}>Tên người dùng: {item.tennguoimua}</Text>
                    <Text style={styles.ten} >Phone: {item.phone}</Text>

                </View>
            </View>

        )

    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // khi màn hình đc active thì lệnh hoạt động
            getLoginInfo();
            getThongTin();
        });

        return unsubscribe;
    }, [props.navigation]);
    useEffect(() => {

    }, []);
    const handleLinkPress = () => {
        Linking.openURL('https://www.facebook.com/pham.haibang78');
    };



    return (

        <View style={styles.bagach}>
            <View style={styles.container}>
                <FlatList


                    data={dsPro}
                    keyExtractor={(item) => item._id}
                    renderItem={renderNguoidung}

                />
            </View>
            <View >
                <Text style={styles.chu1} onPress={() => { props.navigation.navigate('Thongtin') }}>Cập nhật thông tin</Text>
                <Text style={styles.chu1} onPress={() => { props.navigation.navigate('LichSu') }}>Lịch Sử</Text>
                <Text style={styles.chu1} onPress={() => { props.navigation.navigate('TrangThai') }}>Đơn Trạng Thái</Text>
                <Text style={styles.chu1} onPress={() => { props.navigation.navigate('Login') }}>Log out</Text>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Doipass') }}>
                    <Text style={styles.chu1}>Đổi mật khẩu</Text>
                </TouchableOpacity>
                <Text style={{
                    borderBottomColor: '#F38E8E',
                    borderBottomWidth: 1, marginTop: 10
                }}></Text>
                <TouchableOpacity>
                    <Text style={styles.chu} onPress={handleLinkPress}>Liên hệ</Text>

                </TouchableOpacity>

            </View>
        </View>
    )
};

export default Profile

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: 480,
        backgroundColor: "#DF5A5A",
    },
    texthello: {
        color: "red",
        fontSize: 40,
        marginTop: 75,
        marginLeft: 20
    },
    canbang: {
        flexDirection: "row",
    },
    gmail: {
        fontSize:20,
        marginLeft:10,
        color:'white',
        fontWeight:'bold'
    },
    ten: {
        fontSize:20,
        marginLeft:10,
        color:'white',
        fontWeight:'bold'
    },
    bagach: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    chu: {
        marginTop: 50,
        marginLeft: 60,
        color: "red",
        fontSize: 15
    },
    chu1: {
        marginTop: 50,
        marginLeft: 60,
        color: "red",
        fontSize: 15
    }

});
