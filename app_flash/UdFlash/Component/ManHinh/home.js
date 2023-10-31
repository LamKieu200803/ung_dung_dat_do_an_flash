import React from 'react';
import { View, TextInput, StyleSheet, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const data = [
    { id: '1', image: require('../images/image1.png') },
    { id: '2', image: require('../images/image2.png') },
    { id: '3', image: require('../images/image3.png') },
];



const HomeScreen = (props) => {

    const [isLoading, setisLoading] = useState(true);
    const [showDialog, setshowDialog] = useState(true)
    const [dsPro, setdsPro] = useState([]);


const getListPro = async () =>{

    let api_url_pro = 'http://192.168.19.254:9997/sanpham';
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

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // khi màn hình đc active thì lệnh hoạt động
      getListPro();

    });

    return unsubscribe;
  }, [props.navigation]);



    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={handleImagePress}>
            <View style={{ marginHorizontal: 10, borderRadius: 20 }}>
                <Image source={item.image} style={styles.image1} />
            </View>
        </TouchableOpacity>
    );
    
    const renderItem1 = ({ item }) => {
        // const discountedPrice = item.price - (item.price * item.discount);
        return (
        <TouchableOpacity onPress={handleImagePress}>
            <View style={styles.itemContainer}>
                <View style={styles.imageContainer}onPress={handleImagePress}>
                    <Image source={{uri: item.img}} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.name}>{item.tensp}</Text>
                        <Text style={styles.discountedPrice}>
                            <Text> ${item.giasp}</Text>
                            {/* <Text> ${discountedPrice.toFixed(2)}</Text> */}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
           
        );
    };

    // const navigation = useNavigation();

    const handleImagePress = () => {
        props.navigation.navigate('SanPham');
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.menu}>
                    {/* <Ionicons name="menu" size={24} color="#8a6fcf" /> */}
                    <Ionicons name="notifications" size={24} color="#8a6fcf" />
                </View>
                <View style={styles.icon}>
                    <Ionicons name="search" size={24} color="#888"  />
                    <TextInput

                        style={styles.input}
                        placeholder="Tìm kiếm..."
                        placeholderTextColor="#888"
                    />
                    <Ionicons name="close-circle" size={24} color="#888"  />
                </View>
                <View style={{ marginTop: 20 }}>
                    <FlatList
                        data={data}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item_db) => item_db.id.toString()}
                        renderItem={renderItem}
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 20, margin: 15 }}>Các sản phẩm </Text>
                </View>

                <View>
                    <FlatList
                        
                        data={dsPro}
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        keyExtractor={(item_db) => item_db.id}
                        renderItem={renderItem1}
                        
                    />
                </View>

                <View style={{ marginTop: 15 }}>
                    <FlatList
                        
                        horizontal
                        data={dsPro}
                        keyExtractor={(item_db) => item_db.id}
                        renderItem={renderItem1}
                    />
                </View>

            </View>
        </ScrollView>

    );
};

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DF5A5A"
    },
    menu: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 15
    },
    icon: {
        padding: 15,
        margin: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15
    },

    input: {
        flex: 1,
        fontSize: 20,
        color: '#333',
    },
    itemContainer: {
        margin: 10,
    },
    imageContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: 200,
        height: 200,
    },
    image1: {
        width: 200,
        height: 200,
        borderRadius: 20
    },

    price: {
        marginBottom: 2,
        size: '20',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    discountedPrice: {
        fontSize: 16,
        color: 'green',
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
        color: 'red',
    },
});