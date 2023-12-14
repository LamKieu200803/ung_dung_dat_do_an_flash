import React from 'react';
import { View, TextInput, StyleSheet, FlatList, Image, Text,Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";



 //const screenWidth = Dimensions.get('window').width;  //
//const itemWidth = screenWidth / 2; // Two products per row

const HomeScreen = (props) => {

const data = [
    { id: '1', image: require('../images/image1.png') },
    { id: '2', image: require('../images/image2.png') },
    { id: '3', image: require('../images/image3.png') },
];
    const [isLoading, setisLoading] = useState(true);
    const [showDialog, setshowDialog] = useState(true)
    const [dsPro, setdsPro] = useState([]);
    const [danhmuc, setdanhmuc] = useState([]);
    
    const [searchText, setSearchText] = useState("");
    

const getListPro = async () =>{

    let api_url_pro = 'http://172.16.10.106:9997/sanpham';
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

  const getListDanhMuc = async () =>{

    let api_url_danhmuc = 'http://172.16.10.106:9997/danhmuc';
    try {
      const response = await fetch(api_url_danhmuc);
      const json = await response.json();
      setdanhmuc(json);
    } catch (e) {
      console.log(e);
    } finally {
      setisLoading(false);
    }
  };



  const filterProducts = () => {
    if (searchText === "") {
      return dsPro;
    }
    return dsPro.filter((item) =>
      item.tensp.toLowerCase().includes(searchText.toLowerCase())
    );
  };

const renderDanhMuc = ({item})=>{
    return(
        <TouchableOpacity onPress={()=>{props.navigation.navigate('chiTietDanhMuc', {item:item})}}>
            <View style={{margin:10, alignItems:'center', padding:5, backgroundColor:'white', borderRadius:20}}>
            <View style={{width:80, height:80,}}>
                <Image source={{uri: item.anhdanhmuc}} style={{width:80, height:80 , borderRadius:150}} />
            </View>
                <Text>{item.tendanhmuc}</Text>
            </View>
        </TouchableOpacity>
    )
}


  const renderItem = ({ item }) => {
    const itemCopy = { ...item }; // Sao chép đối tượng item
    return (
        <TouchableOpacity>
            <View style={{ marginHorizontal: 10, borderRadius: 20 }}>
                <Image source={itemCopy.image} style={styles.image1} />
            </View>
        </TouchableOpacity>
    );
};
    const renderItem1 = ({ item }) => {
        // const discountedPrice = item.price - (item.price * item.discount);
        return (
        <TouchableOpacity onPress={()=>{props.navigation.navigate('SanPham',{item_sp:item})}}>
            <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: item.img}} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.name}>{item.tensp}</Text>
                        <View style={{flexDirection:'row'}}>
                           
                            <Text style={styles.discountedPrice }> ${item.giasp}      </Text>
                            <Text style={{marginLeft:32}}>Đã bán : {item.soluongban}</Text>
                            {/* <Text> ${discountedPrice.toFixed(2)}</Text> */}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
           
        );
    };

    // const navigation = useNavigation();

 const xoa=()=>{
    setSearchText("");
 }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
          // khi màn hình đc active thì lệnh hoạt động
          getListPro();
          getListDanhMuc();
    
        });
    
        return unsubscribe;
      }, [props.navigation]);
    return (
     
            <View style={styles.container}>
                <View style={styles.menu}>
                    {/* <Ionicons name="menu" size={24} color="#8a6fcf" /> */}
                    <Ionicons name="notifications" size={24} color="#8a6fcf" />
                </View>
                <View style={styles.icon}>
                    <Ionicons name="search" size={24} color="#888"  />
                    <TextInput
                      onChangeText={(text) => setSearchText(text)}
                        style={styles.input}
                        placeholder="Tìm kiếm..."
                        placeholderTextColor="#888"
                        value={searchText}
                    />
                    <Ionicons name="close-circle" size={24} color="#888" onPress={()=>{setSearchText("")}} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <FlatList
                        data={data}
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                </View>
<View style={{}}>
<Text style={{fontWeight:'bold',fontSize:15, marginTop:10}}>Danh mục</Text>
<FlatList
                        data={danhmuc}
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(itema) => itema.danhmuc}
                        renderItem={renderDanhMuc}
                    />
</View>
                <View>
                    <Text style={{ fontSize: 20, marginTop:15 }}>Các sản phẩm </Text>
                    <Text style={{ borderBottomColor: '#F38E8E', borderBottomWidth: 1 }}></Text>
                </View>
                <ScrollView>
                <View>
                    <FlatList
                     numColumns={2}
                        style={{marginLeft:20}}
                        data={filterProducts()}
                        keyExtractor={(item_db) => item_db.id}
                        renderItem={renderItem1}
                          
                    />
                </View>
    </ScrollView>
                </View>    
                  

            
    

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
        margin: 15,
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
        width: 150,
        height: 150,
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