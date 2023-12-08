import React, { useState, useEffect } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { View, TextInput, StyleSheet, FlatList, VirtualizedList, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
const ThanhToan = ({  route }) => {

    const [dspro, setdspro] = useState([]);  
    const [address, setAddress] = useState('');
    const [thanhpho, setthanhpho] = useState('');
    const [state, setState] = useState('');
    const [thoigian, setthoigian] = useState();
   const [trangthai, settrangthai] = useState("đang chờ xác nhận");
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
        let url_api_giohang = 'http://172.16.10.109:9997/giohang/' + loginInfo._id;
        try {
          const response = await fetch(url_api_giohang);
          const json = await response.json();
          setdspro(json);
          console.log("list:"+json);
           
        } catch (e) {
          console.log(e);
        }
      };

      const Save_Pro = () => {
        let objPro = dspro;
        console.log("aaaaaaa"+objPro);
        let url_api_cthd = "http://172.16.10.109:9997/hoadonchitiet/" + loginInfo._id + "/65703377d10ba6383ebbf5ed/add";
      
        fetch(url_api_cthd, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objPro)
        }).then((res) => {
          if (res.status == 201)
            console.log("Thêm vào chi tiết hóa đơn thành công");
        }).catch((e) => {
          console.log(e);
        });
      };

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
      
        let url_api_hoadon = 'http://172.16.10.109:9997/hoadon/them/' + loginInfo._id;
      
        fetch(url_api_hoadon, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objUserMua)
        })
        .then((res) => {
          if (res.status == 201) {
            alert("Đặt hàng thành công");
            return res.json(); // Chuyển đổi phản hồi thành đối tượng JSON
          }
          throw new Error('Đặt hàng không thành công');
        })
        .then((response) => {

          console.log("respone"+response);
 let idhoadonct = response._id ;
          // if (data && data._id) {
          //   const hoadonId = data._id;
          //   setidHoadon(hoadonId);
          //   console.log("id hoa don: " + data._id);
          //   console.log("aaaaaaa");
          //   // Lấy ID của hóa đơn từ phản hồi
          //   // Tiếp tục xử lý với ID của hóa đơn
          //   return Save_Pro(); // Trả về một promise từ Save_Pro()
          // }
        })
        .then(() => {
          // Save_Pro();
          DelPro(); // Gọi hàm xóa sau khi nhận phản hồi thành công và Save_Pro() đã hoàn thành
        })
        .catch((error) => {
          console.log(error);
        });
      };
      const DelPro = () => {
        let url_api_del = 'http://172.16.10.109:9997/giohang/xoa/' + loginInfo._id;
      
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
          <View style={styles.cartItemContainer}>
              <Image source={{ uri: item.img }} style={styles.productImage} />
              <View style={styles.productDetails}>
              <View style={{ padding: 10 }}>
                    <Image
                        style={{ width: 80, height: 85 }}
                        source={{ uri: item.img }} /></View>
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
      <TouchableOpacity onPress={() => { navigation.navigate('AddAddress') }}>
          <View
              style={{
                  margin: 10,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'grey'
              }}

          >
              <Ionicons
                  style={{
                      paddingTop: 50,
                      textAlign: "center",
                  }}
                  name="add" size={50} color="grey"
              />
              <Text
                  style={{
                      textAlign: 'center',
                      fontSize: 25,
                      paddingBottom: 50,
                      color: "grey"
                  }}
              >
                  Add New Adress
              </Text>
          </View>
      </TouchableOpacity>

      <View>
          <View style={{ flexDirection: 'row', padding: 20, borderTopWidth: 0.5 }}>
              <View style={{ flexDirection: 'column', width: 200, height: 50, marginLeft: 15 }}>

                  <Text >
                      {item?.address},{item?.state}   {"\n"}
                  </Text>
                  <Text style={{ color: 'grey' }}>
                      {item?.thanhpho}
                  </Text>

              </View>
              <TouchableOpacity onPress={() => { navigation.navigate('AllDiachi') }}>
                  <Text style={{
                      backgroundColor: 'red',
                      borderRadius: 20,
                      padding: 10,
                      marginLeft: 100,
                      width: 100,
                      textAlign: 'center',
                      color: 'white'
                  }}
                  >Change</Text>
              </TouchableOpacity>

          </View>
      </View>


      {dspro.length > 0 ? (
renderCart()
) : (
<View style={styles.emptyCartContainer}>
  <Text style={styles.emptyCartText}>Your cart is empty.</Text>
</View>
)}
      <View style={{ flexDirection: 'column', paddingTop: 15 }}>
          <View style={{ flexDirection: 'row', paddingTop: 20, }}>


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
                  Total Price
              </Text>
              <Text style={{ fontSize: 20, paddingLeft: 230, fontWeight: '700', paddingTop: 30, }}>
                  ${tongtien}
              </Text>
          </View>
      </View>
      <View >
          <TouchableOpacity onPress={Save_UserMua}>
              <Text style={styles.button} >Checkout</Text>
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
      backgroundColor:'red',

    }
});