import React, { useMemo, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, VirtualizedList, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const PaymentButton = ({route,navigation}) => {
  const [dspro, setdspro] = useState([]);
    const [object, setObject] = useState([]);
    const [idChitiet,setIdchitiet]=useState(route.params.item._id);
    const [loginInfo, setloginInfo] = useState('');
    const [isLoading, setisLoading] = useState(true);

    const [thoigian11, setThoigian1] = useState(route.params.item.thoigian)
    const [tenkhachhang11, setTenkhachhang] = useState(route.params.item.tennguoimua)
    const [sodienthoai11, seSodienthoai] = useState(route.params.item.sodienthoai)
    const [tongtien11, setTongtien] = useState(route.params.item.tongtien)
    const [diachi11, setDiachi11] = useState(route.params.item.diachi)
    const [isLoginInfoLoaded, setIsLoginInfoLoaded] = useState(false);
    const getListPro = async () => {
        let url_api_lichsu = 'http://10.24.0.248:9997/hoadonchitiet/' + loginInfo._id+'/'+ idChitiet;
        try {
            const response = await fetch(url_api_lichsu);
            const json = await response.json();

            setObject(json.danhSachSanPham)
            console.log(json.danhSachSanPham);
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
        const unsubscribe = navigation.addListener('focus', () => {
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
                <View style={{ flexDirection: 'row' , marginTop:2}}>
                <Image source={{ uri: item.img }} style={styles.productImage} />
                    <View style={{ width: 250, marginLeft: 5 }}>
                        <Text style={styles.productName}>{item.tensp}</Text>
                        <Text style={styles.productPrice}> $ {item.giasp}</Text>
                        <Text style={styles.productPrice1}>Số lượng mua:{item.soluongmua}</Text>
                    </View>

                    <Text style={{ textAlignVertical:'center'}} onPress={()=>{navigation.navigate('Danhgia', {item:item})}}>Đánh giá</Text>
                </View>

            </View>
        );
    }
    return (
        <View style={styles.container}>
                <View style={{width:450}}>
            <Text style={styles.productName}> Tên khách hàng:   {tenkhachhang11}</Text>
            <Text style={styles.productName}> Số điện thoại:  {sodienthoai11}</Text>
            <Text style={styles.productName}> Tổng tiền:  {tongtien11}</Text>
            <Text style={styles.productName}> Ngày mua:   {thoigian11}</Text>
            <Text style={styles.productName}> Địa chỉ:{diachi11}</Text>
            </View> 
                       <Text style={{fontSize:18.5,marginTop:15,fontWeight:'bold',textAlign:'center',marginBottom:25}}> Danh sách các sản phẩm trong hoá đơn bạn 
                        đã mua </Text>
            <View style={{flex:1,width:455,marginLeft:12,borderRadius:20}}>
                 <FlatList
                data={object}
                renderItem={renderCartItem}
                keyExtractor={(item) => item._id}
            />
            </View>

        </View>

    )
};

export default PaymentButton;
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFF',
  },
  dontrangthai: {
      fontSize: 25,
      textAlign: 'center',
      marginTop: 25,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#DF5A5A'
  },
  chu: {
      marginLeft: 55,
      fontSize: 15,
      fontWeight: 'bold',
      color: '#DF5A5A'
  }, cartItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#DF5A5A',
      borderWidth: 1,
      margin:5,
      borderRadius:10
  },
  productImage: {
      width: 100,
      height: 100,
      marginRight: 5,
     margin:5,
     marginBottom:10,
     marginLeft:10,
     borderRadius:10
  },
  productDetails: {
      flex: 1,
      backgroundColor: '#DF5A5A',
      marginLeft: 40,
  },
  productName: {
      fontSize: 16,
      left:15,
      marginBottom: 8,
      marginTop:5,
      color: '#000000',
      fontWeight:'bold',
      marginBottom:15
  },
  productPrice: {
      fontSize: 14,
      left:15,
      marginBottom: 8,
      color: '#000000',
      marginBottom:15
  },
  productPrice1: {
    fontSize: 14,
   left:15,
    marginBottom: 8,
    color: '#000000'
},
  left: {
      marginLeft: 20,
      fontWeight: 'bold',
      fontSize: 15,
      color: '#DF5A5A'
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