
import React, { useState ,useEffect} from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
const GioHang = (props) => {
  const [dspro, setdspro] = useState([]);  
 
 
  
  const [idsp, setidsp] = useState("");
  const [soluong, setsoluong] = useState(0);
  const [soluongmua, setsoluongmua] = useState(0);
  const [soluongconlai, setsoluongconlai] = useState(0);
  
  
  
  
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [loginInfo, setloginInfo] = useState(''); 
  const [isLoginInfoLoaded, setIsLoginInfoLoaded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); // Thêm state để lưu trữ totalPrice
  const getListPro = async () => {
    let url_api_giohang = 'http://172.16.10.100:9997/giohang/' + loginInfo._id;
    try {
      const response = await fetch(url_api_giohang);
      const json = await response.json();
      setdspro(json);
      setidsp(json[0].productId)

      setCartItemsCount(json.length);
  
      // Calculate totalPrice
      let totalPrice = 0;
     
      json.forEach((item) => {
      totalPrice += item.giasp * item.soluongmua;
    
      }); 
      setTotalPrice(totalPrice);
       
    } catch (e) {
      console.log(e);
    } finally {
      setisLoading(false);
    }
  };


  
  // tạo biến lưu trữ id và số lượng sp có trong giỏ
  const soLuongMuaTheoId = dspro.reduce((result, item) => {
    result[item.productId] = item.soluongmua;
   
    return result;
  }, {});
  
  console.log(soLuongMuaTheoId);

  //lặp qua đối tượng có trong giỏ 
  dspro.forEach((sanPham) => {
    console.log(sanPham.tensp);

  });

// lấy số lượng của sản phẩm về
const fetchsoluong = async () => { 
  let url_fe = 'http://172.16.10.100:9997/chitietsanpham/' + idsp ;
  try {
    const response1 = await fetch(url_fe);
    const json1 = await response1.json();
    const soluong = json1.soluong;
    const product = dspro.find((item) => item.productId === json1._id);
    
    if (product) {
      const soluongmua = product.soluongmua;
      const soluongConLai = soluong - soluongmua;
      setsoluongconlai(soluongConLai);
      console.log("Số lượng còn lại của sản phẩm: " + soluongConLai);
      // Thực hiện các xử lý khác liên quan đến số lượng còn lại của sản phẩm
    }else {
      console.log("Không tìm thấy sản phẩm với productId tương ứng trong dspro.");
    }

    
  } catch (e) {
    console.log(e);
  } 
};

// const giamsoluong = () => {
  
//   let objSp = { soluong: soluongconlai };
//   let url_api_giamsoluong = 'http://172.16.10.109:9997/sanpham/sua/' + idsp;

//   fetch(url_api_giamsoluong, {
//     method: 'PUT',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(objSp),
//   })
//     .then((res) => {
//       if (res.status === 200) {
//         console.log(soluongconlai);
//         // Gọi hàm xử lý số lượng còn lại ở đây
       
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };


  const BUY = () =>{
    props.navigation.navigate('ThanhToan', { totalPrice: totalPrice })
 //giamsoluong();
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
    fetchsoluong()
    setisLoading(true)
  
  
  }   
       
},[isLoginInfoLoaded]); 
useEffect(() => {
  const unsubscribe = props.navigation.addListener('focus', () => {
      // khi màn hình đc active thì lệnh hoạt động
      if (isLoginInfoLoaded) {
        getListPro();
      //  fetchsoluong();
        setisLoading(true)
        
      }
  });

  return unsubscribe;
},  [isLoginInfoLoaded])
React.useEffect(() => {
  
  }, [dspro,cartItemsCount]);
 


  const increaseQuantity = (itemId) => {
    setdspro((prevItems) =>
      prevItems.map((item) =>
        item.giohangId === itemId
          ? { ...item, soluongmua: item.soluongmua + 1 }
          : item
        
      )
    );
  
    const itemToUpdate = dspro.find((item) => item.giohangId === itemId);


    // console.log(itemToUpdate.productId);
    // console.log(loginInfo._id);
    if (itemToUpdate) {
      // Gửi yêu cầu PUT đến server để cập nhật giá trị soluongmua
      fetch('http://172.16.10.100:9997/giohang/sua/' +  loginInfo._id+ "/" + itemToUpdate.productId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ soluongmua: itemToUpdate.soluongmua+1 }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Xử lý phản hồi từ server (nếu cần)
          console.log('Dữ liệu đã được cập nhật trên server:', data);
          setCartItemsCount((prevCount) => prevCount + 1);
          updateTotalPrice(itemId, 1); // Increase totalPrice by the product's price
        })
        .catch((error) => {
          // Xử lý lỗi (nếu có)
          console.error('Lỗi khi cập nhật dữ liệu:', error);
        });
    }
  };
  
  const decreaseQuantity = (itemId) => {
    setdspro((prevItems) =>
      prevItems.map((item) =>
        item.giohangId === itemId && item.soluongmua > 1
          ? { ...item, soluongmua: item.soluongmua - 1 }
          : item
      )
    );
  
    const itemToUpdate = dspro.find((item) => item.giohangId === itemId);
    console.log(itemToUpdate.productId);
    console.log(loginInfo._id);
    if (itemToUpdate) {
      // Gửi yêu cầu PUT đến server để cập nhật giá trị soluongmua
      fetch('http://172.16.10.100:9997/giohang/sua/' +  loginInfo._id+ "/" + itemToUpdate.productId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ soluongmua: itemToUpdate.soluongmua-1 }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Xử lý phản hồi từ server (nếu cần)
          console.log('Dữ liệu đã được cập nhật trên server:', data);
          setCartItemsCount((prevCount) => prevCount - 1);
          updateTotalPrice(itemId, -1); // Giảm totalPrice đi giá của sản phẩm
        })
        .catch((error) => {
          // Xử lý lỗi (nếu có)
          console.error('Lỗi khi cập nhật dữ liệu:', error);
        });
    }
  };
  const updateTotalPrice = (itemId, quantityChange) => {
    setTotalPrice((prevTotalPrice) => {
      const item = dspro.find((item) => item.giohangId === itemId);
      if (item) {
        const productPrice = item.giasp;
        const newQuantity = item.soluongmua + quantityChange;
  
        let updatedPrice = prevTotalPrice - productPrice * item.soluongmua + productPrice * newQuantity;
  
        if (newQuantity === 0) {
          // Xóa sản phẩm khỏi giỏ hàng, giá trị totalPrice sẽ là 0
          updatedPrice = 0;
        }
  
        // Đảm bảo totalPrice không nhỏ hơn 0
        const totalPrice = Math.max(0, updatedPrice);
        return totalPrice;
      }
      return prevTotalPrice;
    });
  };

  
  
//   const removeItem = (itemId) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
//   };

  const renderCartItem = ({ item }) =>{ 
    
    const DelPro = () =>{
      let url_api_del = 'http://172.16.10.100:9997/giohang/xoa/'+loginInfo._id+"/" +item.productId ;
  
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
            onPress={() => decreaseQuantity(item.giohangId)}
            style={styles.quantityButton}
          >
            <Icon name="minus" size={16} color="#000" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.soluongmua}</Text>
          <TouchableOpacity
            onPress={() => increaseQuantity(item.giohangId)}
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
          keyExtractor={(item) => item.giohangId}
          ListEmptyComponent={renderEmptyCart}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
      )}
      <Text style={styles.totalPriceText}>Total Price: ${totalPrice}</Text>
      <TouchableOpacity style={styles.buyButton} onPress={()=>BUY()}>
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
    backgroundColor: '#DF5A5A',
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
    
    marginBottom: 8,
    color: 'white'
  },
  productPrice: {
    fontSize: 14,
    color: 'white',
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