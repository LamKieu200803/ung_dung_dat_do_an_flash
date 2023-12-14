import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
const chiTietDanhMuc = ({ route, navigation }) => {

    const [tendanhmuc, settendanhmuc] = useState(route.params.item.tendanhmuc);
    const [iddanhmuc, setiddanhmuc] = useState(route.params.item._id);
    const [dsPro, setdsPro] = useState([]);
    
const getDuLieu = async() =>{
    let api_url_pro = 'http://172.16.10.106:9997/sanpham/danhsach/'+iddanhmuc;
    try {
      const response = await fetch(api_url_pro);
      const json = await response.json();
      setdsPro(json);
    } catch (e) {
      console.log(e);
    } finally {
      setisLoading(false);
    }
}


    return (
        <View style={styles.container}>
<Text style={{fontSize:20, fontWeight:'bold', padding:15, color:'white'}}>{tendanhmuc}</Text>
      <Text>{iddanhmuc}</Text>
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