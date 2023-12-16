import React, { useState, useEffect } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { View, TextInput, StyleSheet, FlatList, VirtualizedList, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import WebView from 'react-native-webview';


const ThanhToan = ({  route }) => {

    const [dspro, setdspro] = useState([]);  
    const [address, setAddress] = useState('');
    const [thanhpho, setthanhpho] = useState('');
    const [state, setState] = useState('');
    const [thoigian, setthoigian] = useState();
   const [trangthai, settrangthai] = useState("Chờ xác nhận");
   const [idHoadon, setidHoadon] = useState('');
   
   
    const [tennguoimua, settennguoimua] = useState(`${item?.name}`);
    const [sdt, setsdt] = useState(`${item?.phone}`);
    const [diachi, setdiachi] = useState(`${item?.address}, ${item?.state}\n${item?.thanhpho}`);
    const [tongtien, settongtien] = useState(route.params.totalPrice);


    const [open, setOpen] = useState(false);  // sổ list xuống hay không
    const [value, setValue] = useState(null);  // giá trị người dùng chọn
    const [pttt, setpttt] = useState([    // mảng các phần tử
        { label: 'Tại nhà', value: 'Tại nhà' },
        { label: 'Ví VNPay', value: 'Ví VNPay' },

    ]);
    const [loginInfo, setloginInfo] = useState('');
  
    const { item } = route.params || {};

  
    const getlistgiohang = async () => {
      const url_api_giohang = 'http://172.16.10.100:9997/giohang/' + loginInfo._id;
    
      try {
        const response = await fetch(url_api_giohang);
        const json = await response.json();
        setdspro(json);
        console.log("list:", json);
    
       
      } catch (error) {
        console.log(error);
      }
    };
    
    const tinhSoLuongMoi = async (gioHang) => {
      for (const giohang of gioHang) {
        console.log("Số lượng mua:", giohang.soluongmua);
        console.log("Số lượng sản phẩm:", giohang.sanPham.soluong);
        console.log("Số lượng đã bán:", giohang.sanPham.soluongban);
        // Kiểm tra nếu số lượng mua nhỏ hơn hoặc bằng số lượng sản phẩm
        if (giohang.soluongmua <= giohang.sanPham.soluong) {
          console.log("Đủ hàng để mua");
          let soluongmoi = giohang.sanPham.soluong - giohang.soluongmua;
          let soluongban = giohang.sanPham.soluongban + giohang.soluongmua;
          console.log("soluongmoi = " + soluongmoi);
          console.log("soluongban = " + soluongban);
    
          // Thực hiện việc cập nhật số lượng sản phẩm
          const capNhatSanPhamResponse = await capNhatSanPham(
            giohang.sanPham._id,
            soluongmoi,
            soluongban
          );
          if (capNhatSanPhamResponse.ok) {
            console.log("Cập nhật số lượng sản phẩm thành công");
          } else {
            console.log("Cập nhật số lượng sản phẩm thất bại");
          }
        } else {
          console.log("Không đủ hàng để mua");
        }
      }
    };
    
    const capNhatSanPham = async (sanPhamId, soLuongMoi , soLuongBan) => {
      const url_api_capnhat = 'http://172.16.10.100:9997/giohang/cap-nhat-sanpham';
      const data = {
        gioHang: [
          {
            sanPhamId: sanPhamId,
            soLuongMoi: soLuongMoi,
            soLuongBan : soLuongBan
          }
        ]
      };
    
      try {
        const response = await fetch(url_api_capnhat, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    };

const ThanhToan = () =>{
   tinhSoLuongMoi(dspro);
  Save_UserMua();
}

      const Save_UserMua = () => {
        let objUserMua = {
          tennguoimua: tennguoimua,
          sdt: sdt,
          diachi: diachi,
          pttt: value,
          tongtien: tongtien,
          thoigian: thoigian,
          trangthai: trangthai,
          danhSachSanPham : dspro
        };
        ;
      
        let url_api_hoadon = 'http://172.16.10.100:9997/hoadon/them/' + loginInfo._id;
      
        fetch(url_api_hoadon, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objUserMua)
        })
        .then((res) => {
           if (value === 'Ví VNPay') {
                    navigation.navigate('Webview')
                } else if (res.status == 201) {
                    alert("đặt hàng thành công")
                   DelPro();
                }

         
       
     
      
       
        })
        .catch((error) => {
          console.log(error);
        });
      };
      const DelPro = () => {
        let url_api_del = 'http://172.16.10.106:9997/giohang/xoa/' + loginInfo._id;
      
        fetch(url_api_del, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
          .then((res) => {
            if (res.status == 200) {
              // Xử lý khi xóa thành công
            }
          })
          .catch((e) => {
            console.log(e);
          });
      };

    const getLoginInfo = async () => {
        try {
            const valuee = await AsyncStorage.getItem('loginInfo')
            if (valuee !== null) {
                // láy được dữ liệu 
                setloginInfo(JSON.parse(valuee))
                
            }
        } catch (e) {
      
            console.log(e);
        }
       
      };
 useEffect(() => {
        const fetchData = async () => {
          await getLoginInfo();
        };
      
        const unsubscribe = navigation.addListener('focus', () => {
          fetchData();
        });
      
        return unsubscribe;
      }, [navigation]);
      
      useEffect(() => {
        if (loginInfo && loginInfo._id) {
          getlistgiohang(loginInfo._id);
        }
      }, [loginInfo]);

    useEffect(() => {
        if (route.params && route.params.item) {
          const { address, state, thanhpho, name, phone } = route.params.item;
          settennguoimua(name)
          setsdt(phone)
          setAddress(address);
          setthanhpho(thanhpho);
          setState(state);
          setdiachi(`${address}, ${state}\n${thanhpho}`);
        }
      }, [route.params]);

    useEffect(() => {
        const loadTotalPrice = async () => {
          try {
            const totalPrice = await AsyncStorage.getItem('totalPrice');
            console.log('Total price:', totalPrice);
            // Sử dụng giá trị "total price" ở đây
          } catch (error) {
            console.log('Error retrieving total price:', error);
          }
        };
    
        loadTotalPrice();
      }, []);
      useEffect(() => {
        const currentDate = moment().format('HH:mm, DD/MM/YYYY');
        setthoigian(currentDate);
      }, []);


    const navigation = useNavigation();
    const handleAddDiaChi = () => {
        navigation.navigate('SanPham');
    };
    const handleAddCard = () => {
        navigation.navigate('SanPham');
    };
    const renderCartItem = ({ item }) => {
      return (
        
             
              <View style={styles.productDetails}>
              <View style={{ padding: 10 }}>
                    <Image
                        style={{ width: 80, height: 85 }}
                        source={{ uri: item.img }} /></View>
                        <View>
                  <Text style={styles.productName}>{item.tensp}</Text>
                  <Text style={styles.productPrice}>giá sản phẩm: ${item.giasp}</Text>
                  <Text style={styles.productPrice}>số lượng mua: {item.soluongmua}</Text>
            </View>
              </View>
         
      );
  }
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
  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
    </View>
);

    return (
      <View style={styles.container}>
      <View style={{
          flexDirection: 'row',
          paddingBottom: 10,

      }}>

      </View>
     

      <View style={{ borderTopWidth: 0.5,marginBottom:5 }}>
  <TouchableOpacity onPress={() => { navigation.navigate('AllDiachi') }} style={{flexDirection:'row', }}>
<View>
          <View style={{ flexDirection: 'row', padding: 20, }}>
          <Icon name="ios-home" size={24} color="black" />
          <View style={{ flexDirection: 'column', width: 350, height: 50, marginLeft: 8, marginBottom: 5 }}>
  <Text style={{ fontSize: 15, marginBottom:5, }}>Địa chỉ nhận hàng                                                         </Text>
  {item?.name && item?.phone && item?.address ? (
    <>
      <Text>{item?.name} | {item?.phone}</Text>
      <Text style={{ color: 'grey' }}>{item?.address}</Text>
    </>
  ) : (
    <Text style={[{ color: 'grey' }, styles.placeholderText]}>Mời bạn chọn địa chỉ nhận hàng</Text>
  )}
</View>
           
                </View>
          </View>
          <View style={{marginTop:35}}>
            <Text style={{color:'gray'}}>{">"}</Text>
          </View>
          </TouchableOpacity>
          
      </View>


      {dspro.length > 0 ? (
renderCart()
) : (
<View style={styles.emptyCartContainer}>
  <Text style={styles.emptyCartText}>Your cart is empty.</Text>
</View>
)}
      <View style={{ flexDirection: 'column', paddingTop: 10 }}>
          <View style={{ flexDirection: 'row' }}>


              <DropDownPicker

                  style={styles.chu1}
                  open={open}
                  value={value}
                  items={pttt}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setpttt}
                  defaultValue="1"
                  placeholder={"Chọn phương thức thanh toán"} // hoặc placeholder={null}


              />

          </View>
          <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', paddingTop: 30, paddingLeft: 20 }}>
Tổng tiền
              </Text>
              <Text style={{ fontSize: 20, paddingLeft: 230, fontWeight: '700', paddingTop: 30, }}>
                  ${tongtien}
              </Text>
          </View>
      </View>
      <View >
          <TouchableOpacity onPress={ThanhToan}>
              <Text style={styles.button} >Thanh toán</Text>
          </TouchableOpacity>
      </View>
  </View>


    );
};

export default ThanhToan

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  },
  button: {
      left: 90,
      margin: 30,
      width: 200,
      paddingVertical: 10,
      borderRadius: 20,
      color: "white",
      fontSize: 25,
      fontWeight: "700",
      textAlign: "center",
      backgroundColor: "red",
  },
  chu: {
      fontSize: 15,
      width: 450,
      marginTop: 20,
      height: 50,
      borderWidth: 1,
      marginLeft: 20
  },
  chu1: {
      fontSize: 15,
      width: 450,
      height: 50,
      borderWidth: 1,
      marginLeft: 20,
      marginBottom: 30,
      marginTop: 20,
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
    productDetails :{
      backgroundColor:'#C0C0C0',
      flexDirection:'row'

    },
    productName:{
      fontWeight:'bold',
      marginTop:10
    }
});