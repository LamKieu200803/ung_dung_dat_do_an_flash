import { View, StyleSheet, Text , ScrollView, FlatList} from "react-native";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
const chiTietDanhMuc = ({ route, navigation }) => {

    const [tendanhmuc, settendanhmuc] = useState(route.params.item.tendanhmuc);
    const [iddanhmuc, setiddanhmuc] = useState(route.params.item._id);
    const [dsPro, setdsPro] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    
const getDuLieu = async() =>{
    let api_url_pro = 'http://172.16.10.106:9997/sanpham/danhsach/'+iddanhmuc;
    try {
      const response = await fetch(api_url_pro);
      const json = await response.json();
      setdsPro(json);
    console.log(json);
    } catch (e) {
      console.log(e);
    } finally {
      setisLoading(false);
    }
}

const renderCart = ({ item }) => {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <Text>tensp: {item.tensp}</Text>
        <Text>giá sp: {item.giasp}</Text>
      </View>
    );
  };


useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // khi màn hình đc active thì lệnh hoạt động
     getDuLieu();

    });

    return unsubscribe;
  }, [navigation]);


    return (
        <View style={styles.container}>
<Text style={{fontSize:20, fontWeight:'bold', padding:15, color:'white'}}>{tendanhmuc}</Text>

                <View>
                    <FlatList
              
                        style={{marginLeft:20}}
                        data={dsPro}
                        keyExtractor={(item_db) => item_db.id}
                        renderItem={renderCart}
                          
                    />
                </View>
  

       </View>
    )
}

export default chiTietDanhMuc;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DF5A5A"
    }
})