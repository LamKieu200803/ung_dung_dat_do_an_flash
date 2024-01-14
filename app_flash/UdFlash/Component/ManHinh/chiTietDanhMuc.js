import { View, StyleSheet, Text , ScrollView, FlatList, Image} from "react-native";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const ChiTietDanhMuc = ({ route, navigation }) => {

    const [tendanhmuc, settendanhmuc] = useState(route.params.item.tendanhmuc);
    const [iddanhmuc, setiddanhmuc] = useState(route.params.item._id);
    const [dsPro, setdsPro] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    
const getDuLieu = async() =>{
    let api_url_pro = 'http://172.16.10.109:9997/sanpham/danhsach/'+iddanhmuc;
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
        <TouchableOpacity onPress={()=>{navigation.navigate('SanPham',{item_sp:item})}}>
      <View style={{ backgroundColor: 'white' , padding:10, margin:5, borderRadius:10, }}>
        <View style={{flexDirection:'row'}}>
        <View style={{width:80, height:80,}}>
                <Image source={{uri: item.img}} style={{width:80, height:80 }} />
            </View>
        <View style={{marginLeft:10}}>
        <Text style={{fontSize:15, fontWeight:'bold'}}> {item.tensp}</Text>
        <Text style={{fontSize:13, color:'green'}}> loại đồ ăn : {tendanhmuc}</Text>
        <Text style={{fontSize:15, }}>{item.giasp}đ</Text>
        <Text style={{fontSize:12, }}> đã bán: {item.soluongban}</Text>
</View>
        </View>
      </View>
      </TouchableOpacity>
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
<Text style={{fontSize:25, fontWeight:'bold', padding:10, color:'white'}}>{tendanhmuc}</Text>

                <View>
                    <FlatList 
                        data={dsPro}
                        keyExtractor={(item_db) => item_db.id}
                        renderItem={renderCart}
                          
                    />
                </View>
  

       </View>
    )
}

export default ChiTietDanhMuc;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DF5A5A"
    }
})