
import React, { useState ,useEffect} from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
const GioHang = (props) => {
  const [dspro, setdspro] = useState([]);  
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [loginInfo, setloginInfo] = useState(''); 
  const [isLoginInfoLoaded, setIsLoginInfoLoaded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); // Thêm state để lưu trữ totalPrice
  const getListPro = async () => {
    let url_api_giohang = 'http://192.168.1.228:9997/giohang/'+loginInfo._id   
    try {
        const response = await fetch(url_api_giohang);
        const json = await response.json();   
        setdspro(json);
        setCartItemsCount(json.length);
        // Tính toán totalPrice
      let totalPrice = 0;
      json.forEach((item) => {
        totalPrice += item.giasp * item.soluongmua;
      });
      setTotalPrice(totalPrice);
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
       
},[isLoginInfoLoaded]); 
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
},  [isLoginInfoLoaded])
React.useEffect(() => {
  
  }, [dspro,cartItemsCount]);
 


  const increaseQuantity = (itemId) => {
    setdspro((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, soluongmua: item.soluongmua + 1 } : item
      )
    );
    setCartItemsCount(prevCount => prevCount + 1); // Or use -1 for decreasing count 
  };
  
  const decreaseQuantity = (itemId) => {
    setdspro((prevItems) =>   
      prevItems.map((item) =>
        item._id === itemId && item.soluongmua > 1
          ? { ...item, soluongmua: item.soluongmua - 1 }
          : item  
      )
    );
  };

  
  
//   const removeItem = (itemId) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
//   };

  const renderCartItem = ({ item }) =>{ 
    
    const DelPro = () =>{
      let url_api_del = 'http://192.168.1.228:9997/giohang/xoa/'+loginInfo._id+"/" +item._id ;
  
      fetch(url_api_del,{
  
          method: 'DELETE',
                     headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json',
                     }
                 }).then((res)=>{
                     if(res.status ==200){
                         alert("đã xóa");
                         getListPro();
                     }
                 })
                 .catch((e)=>{
                     console.log(e);
                 })
        }
    const showAlert = () =>{
      Alert.alert('chức năng xóa ' ,'bạn có chắc muốn xóa và không mua sản phẩm này ?',
      [
          {
              text:"xóa",
              onPress: ()=>{
                 DelPro();
              }
  
          },
  
          {
              text:"thoát",
              onPress: ()=>{
  
              }
          }
  
      ])
  }
    
    
    
    return(
    <View style={styles.cartItemContainer}>
      <Image source={{uri: item.img}} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.tensp}</Text>
        <Text style={styles.productPrice}>Price: ${item.giasp}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => decreaseQuantity(item._id)}
            style={styles.quantityButton}
          >
            <Icon name="minus" size={16} color="#000" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.soluongmua}</Text>
          <TouchableOpacity
            onPress={() => increaseQuantity(item._id)}
            style={styles.quantityButton}
          >
            <Icon name="plus" size={16} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={showAlert} style={styles.deleteButton}>
        <Icon name="trash" size={20} color="#000" />
      </TouchableOpacity>
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
      <Text style={styles.totalPriceText}>Total Price: ${totalPrice}</Text>
      <TouchableOpacity style={styles.buyButton} onPress={() => props.navigation.navigate('ThanhToan', { totalPrice: totalPrice })}>
  <Text style={styles.buyButtonText}>Buy</Text>
</TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {dspro.length > 0 ? (
        renderCart()
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
      )}

     
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#E0FFFF',
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
    color: 'red'
  },
  productPrice: {
    fontSize: 14,
    color: 'red',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    paddingHorizontal: 8,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  deleteButton: {
    marginRight: 16,
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
  buyButton: {
    backgroundColor: '#DF5A5A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
    borderRadius: 10
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default GioHang;