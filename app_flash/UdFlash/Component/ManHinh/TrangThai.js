import React, { useMemo, useState, useEffect } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { View, TextInput, StyleSheet, Modal, FlatList,Button, VirtualizedList, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from './Profile';

const CHO_XAC_NHAN = 'CHO_XAC_NHAN';
const DANG_GIAO = 'DANG_GIAO';
const DA_GIAO = 'DA_GIAO';
const DA_HUY = 'DA_HUY';
const TrangThai = (props) => {
    const [showButton, setShowButton] = useState(false); // Thêm biến trạng thái cho nút
    const [searchText, setSearchText] = useState("");
    const [dspro, setdspro] = useState([]);
    const [object, setObject] = useState([]);
    const [showDialog, setshowDialog] = useState(false);
    const [page, setPage] = useState(CHO_XAC_NHAN);
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
            console.log(json[0].danhSachSanPham)
            setObject(json[0].danhSachSanPham)
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
    const filterProducts = () => {
        return dspro.filter((item) =>
            item.trangthai.toLowerCase().includes(page)
        );
    };
    const renderCartItem = ({ item, showButton  }) => {
        return (
            <View style={styles.cartItemContainer}>
<TouchableOpacity onPress={() => props.navigation.navigate('Payment',{item:item})}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ width: 270, marginLeft: 20 }}>
                            <Text style={styles.productName}>Tên người mua:{item.tennguoimua}</Text>
                            <Text style={styles.productPrice}>Phone:{item.sdt}</Text>
                            <Text style={styles.productPrice}>Phương thức thanh toán: {item.pttt}</Text>
                            <Text style={styles.productPrice}>Địa chỉ: {item.diachi}</Text>
                            <Text style={styles.productPrice}>Tổng tiền: {item.tongtien}</Text>
                            <Text style={styles.productPrice}>Ngày mua {item.thoigian}</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold', marginLeft: 80, color: '#000000', textAlignVertical: 'center' }}>{item.trangthai}</Text>
                      
                       

                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    // const renderDang_giao = ({ item1 }) => {
    //     return (
    //         <View style={styles.cartItemContainer}>
    //             <View style={{ flexDirection: 'row' }}>

    //                 <View style={{ width: 270, marginLeft: 20 }}>
    //                     <Text style={styles.productName}>Tên người mua:{item1.tennguoimua}</Text>
    //                     <Text style={styles.productPrice}>Phone:{item1.giasp}</Text>
    //                     <Text style={styles.productPrice}>Phương thức thanh toán: {item1.pttt}</Text>
    //                     <Text style={styles.productPrice}>Địa chỉ: {item1.diachi}</Text>
    //                     <Text style={styles.productPrice}>Tổng tiền: {item1.tongtien}</Text>
    //                     <Text style={styles.productPrice}>Trạng Thai: {item1.trangthai}</Text>
    //                     <Text style={styles.productPrice}>Ngàu mua {item1.thoigian}</Text>
    //                 </View>
    //                 <Text style={{ fontWeight: 'bold', marginLeft: 80, color: 'white', textAlignVertical: 'center' }}>Chờ xác nhận</Text>

    //             </View>

    //         </View>
    //     );
    // }
    const renderEmptyCart = () => (
        <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
    );


   
    const Choxacnhan = ({ trangThai }) => {
       
      
        const check = () => {
          const filteredItems = dspro.filter((item) => {
            return item.trangthai.toLowerCase().includes(trangThai.toLowerCase());
          });
      
          setShowButton(trangThai.toLowerCase() === "chờ xác nhận"); // Cập nhật biến showButton
      
          return filteredItems;
        };
      
     
      
        const renderCartItem = ({ item }) => {

   const huydon = (itemId) => {
let obj = {trangthai: "Đã hủy"}
fetch(
    "http://172.16.10.100:9997/hoadon/sua/" + loginInfo._id+"/"+itemId,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }
  )
    .then((res) => {
      if (res.status === 200) {
        console.log("Hủy thành công");
        return res.json();
      } else {
        throw new Error("Hủy thất bại");
      }
    });

      
        };


          return (
            <View style={styles.cartItemContainer}>
<TouchableOpacity onPress={() => props.navigation.navigate('Payment',{item:item})}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ width: 270, marginLeft: 20 }}>
                            <Text style={styles.productName}>Tên người mua:{item.tennguoimua}</Text>
                            <Text style={styles.productPrice}>Phone:{item.sdt}</Text>
                            <Text style={styles.productPrice}>Phương thức thanh toán: {item.pttt}</Text>
                            <Text style={styles.productPrice}>Địa chỉ: {item.diachi}</Text>
                            <Text style={styles.productPrice}>Tổng tiền: {item.tongtien}</Text>
                            <Text style={styles.productPrice}>Ngày mua {item.thoigian}</Text>
                        </View>
                        <View style={{marginTop:50}}>
                        <Text style={{ fontWeight: 'bold', marginLeft: 50, color: '#000000', textAlignVertical: 'center', marginTop:20 }}>{item.trangthai}</Text>
                       {showButton && (
           <Text style={{marginLeft:50, marginTop:20,}} onPress={()=>{huydon(item._id)}}>Hủy đơn hàng</Text>
           
          )}
                      </View>
               

                    </View>
                </TouchableOpacity>
            </View>
          );
        };
      
        const renderCart = () => (
          <View style={{ flex: 1, marginTop: 10 }}>
            {check().length > 0 ? (
              <FlatList
                data={check()}
                renderItem={({ item }) =>
                  renderCartItem({ item, showButton })
                }
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

    const Dang_giao = ({trangThai}) => {



        const check = () => {
            return dspro.filter((item) => {
              return item.trangthai.toLowerCase().includes(trangThai.toLowerCase());
            });
          };

          const renderCart = () => (
            <View style={{ flex: 1, marginTop: 10 }}>
              {check().length > 0 ? (
                <FlatList
                  data={check()} // Sử dụng danh sách đã lọc
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
        )
       


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

        )
    }
    const Da_giao = ({trangThai}) => {
        const check = () => {
            return dspro.filter((item) => {
              return item.trangthai.toLowerCase().includes(trangThai.toLowerCase());
            });
          };

          const renderCart = () => (
            <View style={{ flex: 1, marginTop: 10 }}>
              {check().length > 0 ? (
                <FlatList
                  data={check()} // Sử dụng danh sách đã lọc
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
        )
       


        return (
            <View style={styles.container}>
                {dspro.length > 0 ? (
                    renderCart()
                ) : (
                    <View style={styles.emptyCartContainer}>
                        <Text style={styles.emptyCartText}>Chưa có đơn nào đã giao</Text>
                    </View>
                )}
            </View>

        )
    }
    const Da_huy = ({trangThai}) => {
        const check = () => {
            return dspro.filter((item) => {
              return item.trangthai.toLowerCase().includes(trangThai.toLowerCase());
            });
          };

          const renderCart = () => (
            <View style={{ flex: 1, marginTop: 10 }}>
              {check().length > 0 ? (
                <FlatList
                  data={check()} // Sử dụng danh sách đã lọc
                  renderItem={renderCartItem}
                  keyExtractor={(item) => item._id}
                  ListEmptyComponent={renderEmptyCart}
                />
              ) : (
                    <View style={styles.emptyCartContainer}>
                        <Text style={styles.emptyCartText}>Chưa có đơn nào bị hủy</Text>
                    </View>
                )}
    </View>
        )
       


        return (
            <View style={styles.container}>
                {dspro.length > 0 ? (
                    renderCart()
                ) : (
                    <View style={styles.emptyCartContainer}>
                        <Text style={styles.emptyCartText}>Chưa có đơn nào bị hủy</Text>
                    </View>
                )}
            </View>

        )
    }
    const RedComponent = ({ page, setPage }) => {
        return (
            <View style={styles.container}>

                <Text style={styles.dontrangthai}>Đơn trạng thái</Text>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>

                    <TouchableOpacity onPress={() => { setPage(CHO_XAC_NHAN) }} disabled={page === CHO_XAC_NHAN ? true : false}>
<Text style={styles.left}>Chờ xác nhận</Text>
                        {page === CHO_XAC_NHAN ? <View style={{ position: 'absolute', bottom: 0, marginLeft: 10, height: 3, width: '100%', backgroundColor: '#DF5A5A' }}></View>
                            : null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setPage(DANG_GIAO) }} disabled={page === DANG_GIAO ? true : false}>
                        <Text style={styles.chu}>Đang giao</Text>
                        {page === DANG_GIAO ? <View style={{ position: 'absolute', bottom: 0, marginLeft: 20, height: 3, width: '100%', backgroundColor: '#DF5A5A' }}></View>
                            : null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setPage(DA_GIAO) }} disabled={page === DA_GIAO ? true : false}>
                        <Text style={styles.chu}>Đã giao</Text>
                        {page === DA_GIAO ? <View style={{ position: 'absolute', bottom: 0, marginLeft: 30, height: 3, width: '100%', backgroundColor: '#DF5A5A' }}></View>
                            : null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setPage(DA_HUY) }} disabled={page === DA_HUY ? true : false}>
                        <Text style={styles.chu}>Đã Huỷ</Text>
                        {page === DA_HUY ? <View style={{ position: 'absolute', bottom: 0, marginLeft: 30, height: 3, width: '90%', backgroundColor: '#DF5A5A' }}></View>
                            : null}
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <View style={{ height: '15%', width: '100%' }}>
                <RedComponent page={page} setPage={setPage} />
            </View>
            <View style={{ height: '85%', width: '100%' }}>
                {page === CHO_XAC_NHAN ? <Choxacnhan trangThai="Chờ xác nhận" /> : null}
                {page === DANG_GIAO ? <Dang_giao trangThai="Đang giao" /> : null}
                {page === DA_GIAO ? <Da_giao trangThai="đã giao"/> : null} 
                {page === DA_HUY ? <Da_huy trangThai="Đã hủy" /> : null}
            </View>
        </View>

    )
}
export default TrangThai
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 16,
        borderRadius: 8,
    },
    productDetails: {
flex: 1,
        backgroundColor: '#DF5A5A',
        marginLeft: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000000'
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
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