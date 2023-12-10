import React, { useMemo, useState, useEffect } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { View, TextInput, StyleSheet, FlatList, VirtualizedList, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const TrangThai = (props) => {
    const [dspro, setdspro] = useState([]);
    const [loginInfo, setloginInfo] = useState('');
    const [isLoading, setisLoading] = useState(true);
    const [isLoginInfoLoaded, setIsLoginInfoLoaded] = useState(false);
    const getListPro = async () => {
        let url_api_lichsu = 'http://172.16.10.100:9997/hoadon/' + loginInfo._id
        try {
            const response = await fetch(url_api_lichsu);
            const json = await response.json();
            setdspro(json);
            console.log(json)
        } catch (e) {
            console.log(e);

        } finally {
            setisLoading(false)
        }
    }
    const getLoginInfo = async () => {
        try {
            const valuee = await AsyncStorage.getItem('loginInfo')
            if (valuee !== null) {
                // láy được dữ liệu 
                setloginInfo(JSON.parse(valuee));
                setisLoading(false)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const loadData = async () => {
            await getLoginInfo();
            setIsLoginInfoLoaded(true);
        };
        loadData();
    }, []);
    useEffect(() => {
        if (isLoginInfoLoaded) {
            getListPro();
            setisLoading(true)
            console.log(loginInfo._id);
        }

    }, [isLoginInfoLoaded]);
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // khi màn hình đc active thì lệnh hoạt động
            if (isLoginInfoLoaded) {
                getListPro();
                setisLoading(true)
                console.log(loginInfo._id);
            }
        });

        return unsubscribe;
    }, [isLoginInfoLoaded])


    const renderCartItem = ({ item }) => {
        return (
            <View style={styles.cartItemContainer}>
                <Image source={{ uri: item.img }} style={styles.productImage} />
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>Tên sp:{item.tensp}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={styles.productPrice}>Price: ${item.giasp}</Text>
                            <Text style={styles.productPrice}>Số lượng: {item.soluong}</Text>
                        </View>
                       <Text style={{fontWeight:'bold',marginLeft:200}}>Chờ xác nhận</Text>
                    </View>

                </View>
            </View>
        );
    }
    const renderEmptyCart = () => (
        <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
    );
    const renderCart = () => (
        <View style={{ flex: 1 ,marginTop:10}}>
            {dspro.length > 0 ? (
                <FlatList
                    data={dspro}
                    renderItem={renderCartItem}
                    keyExtractor={(item) => item._id}
                    ListEmptyComponent={renderEmptyCart}
                />
            ) : (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Your cart is empty.</Text>
                </View>
            )}
        </View>
    );



    return (
        <View style={styles.container}>
            <Text style={styles.dontrangthai}>Đơn trạng thái</Text>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Text style={styles.left}>Chờ xác nhận</Text>
                <Text style={styles.chu}>Đang giao</Text>
                <Text style={styles.chu}>Đã giao</Text>
                <Text style={styles.chu}>Đã huỷ</Text>
            </View>
            {dspro.length > 0 ? (
                renderCart()
            ) : (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Your cart is empty.</Text>
                </View>
            )}
        </View>
    )
}
export default TrangThai
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    dontrangthai: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 25,
        fontWeight: 'bold',
        marginBottom: 10
    },
    chu: {
        marginLeft: 60,
        fontSize: 15,
        fontWeight: 'bold'
    }, cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth:1,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 16,
        borderRadius: 8,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 14,
        fontWeight:'bold',
        marginBottom: 8,

    },
    left: {
        marginLeft: 20,
        fontWeight: 'bold'
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    emptyCartText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})