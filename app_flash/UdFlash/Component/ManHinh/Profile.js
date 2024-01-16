
import React from 'react';
import { View, TextInput, StyleSheet, FlatList, Image, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler'
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Profile = (props) => {
    const [loginInfo, setloginInfo] = useState('');
    const [dsPro, setdsPro] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [isLoginInfoLoaded, setIsLoginInfoLoaded] = useState(false);
    const getThongTin = async () => {
        let api_url_pro = 'http://172.16.10.109:9997/khachhang/' + loginInfo._id
        try {
            const response = await fetch(api_url_pro);
            const json = await response.json();
            setdsPro(json);
            console.log("mang tt nguoi dung" + json);
            console.log(loginInfo._id);
            console.log(dsPro)
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
            getThongTin()
            getLoginInfo()
        };
        loadData();
    }, [isLoading]);

    useEffect(() => {
        if (isLoginInfoLoaded) {
            getThongTin();
            setisLoading(true)
            getLoginInfo()
        }

    }, [isLoginInfoLoaded]);
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getLoginInfo();
            getThongTin();
            setisLoading(true)
        });
        return unsubscribe;
    }, [isLoginInfoLoaded]);
    const showAlert = () => {
        Alert.alert(
            'Đăng xuất',
            'Bạn muốn đăng xuất ra khỏi ứng dụng?',
            [
                {
                    text: 'Chấp nhận',
                    onPress: () => {
                        // Reset navigation to the Login screen
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            })
                        );
                    },
                },
                {
                    text: 'Không',
                    onPress: () => { },
                },
            ]
        );
    };
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // khi màn hình đc active thì lệnh hoạt động
            getLoginInfo();
            getThongTin();
        });

        return unsubscribe;
    }, [props.navigation]);
    const handleLinkPress = () => {
        props.navigation.navigate('Lienhe')
    };


    const renderItem = ({ item }) => {
      
        return (
           <TouchableOpacity style={styles.chu2} onPress={() => { props.navigation.navigate('Thongtin', { item: item }) }}>
                       <Icon name="pencil" size={16} color="#000" />
                </TouchableOpacity>
        );
    };
    return (

        <View style={styles.bagach}>
            <View style={styles.container}>
            <View>
            <TouchableOpacity style={styles.chu2} onPress={() => { props.navigation.navigate('Thongtin', { item: item }) }}>
                       <Icon name="pencil" size={16} color="#000" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>

                    <View style={{ borderRadius: 300, backgroundColor: 'white', marginTop: 20, width: 100, height: 100, }}>
                        <Image
                            style={{ width: 100, height: 100, borderRadius: 200 }}
                            source={{ uri: loginInfo.anhdaidien }} />
                    </View>
                    <View>
                        <Text style={styles.gmail}>Email: {loginInfo.email}</Text>
                        <Text style={styles.ten}>Tên người dùng: {loginInfo.tenkhachhang}</Text>

                    </View>
                </View>

            </View>
            </View>

            <View >

                <Text style={styles.chu1} onPress={() => { props.navigation.navigate('TrangThai') }}>Đơn Trạng Thái</Text>
                <Text style={styles.chu1} onPress={() => showAlert()}>Đăng xuất</Text>
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
        height: 250,
        width: 480,
        backgroundColor: "#F5F5DC",
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
        fontSize: 17,
        marginLeft: 30,
        marginTop: 30,
        color: '#000',
        fontWeight: 'bold'
    },
    ten: {
        fontSize: 17,
        marginLeft: 30,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 20
    },
    bagach: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    chu: {
        marginTop: 50,
        marginLeft: 60,
        color: "#000",
        fontSize: 15
    },
    chu1: {
        marginTop: 50,
        marginLeft: 60,
        color: "#000",
        fontSize: 15
    },
    chu2: {
        marginTop: 35,
        marginLeft: 430,
        color: "#000",
        fontSize: 15
    }

});