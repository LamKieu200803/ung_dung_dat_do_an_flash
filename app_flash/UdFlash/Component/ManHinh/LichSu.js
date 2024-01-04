import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
const LichSu = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [loginInfo, setloginInfo] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const [isLoginInfoLoaded, setIsLoginInfoLoaded] = useState(false);
  const [dspro, setdspro] = useState([]);
  const getListPro = async () => {
    let url_api_lichsu = 'http://172.20.10.11:9997/lichsu/' + loginInfo._id
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
          <Text style={styles.productName}>{item.tensp}</Text>
          <Text style={styles.productPrice}>giá sản phẩm: ${item.giasp}</Text>
          <Text style={styles.productPrice}>tên người mua: {item.tennguoimua}</Text>
          <Text style={styles.productPrice}>tổng tiền thanh toán: ${item.tongtien}</Text>
          <Text style={styles.productPrice}>số lượng mua: {item.soluongmua}</Text>
          <Text style={styles.productPrice}>phương thức thanh toán :{item.pttt}</Text>
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
  <View style={{ flex: 1 }}>
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
   <View style={{flexDirection:'row'}}>
  <Text style={styles.transactionsText}>Tổng các đơn thanh toán  </Text> 
  <Text style={styles.dateText}>{moment().format('HH:mm, DD/MM/YYYY')}</Text>
</View>

    {dspro.length > 0 ? (
      renderCart()
    ) : (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      </View>
    )}
  </View>
);
    }

//  <View style={styles.container}>
//       <View style={{flexDirection:'row'}}>
//       <Text style={styles.transactionsText}>Tổng các đơn thanh toán  </Text> 
//       <Text style={styles.dateText}>Januari 2023</Text>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#DF5A5A',
  },
  transactionsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 10
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
    color: 'gray',
    marginBottom: 8,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    marginTop: 1,
    marginLeft: 90,
    textAlign: 'center',
    color: 'green'
  },
});

export default LichSu;