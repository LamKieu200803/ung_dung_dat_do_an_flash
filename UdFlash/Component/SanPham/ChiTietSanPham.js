import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';

  const ChiTietSanPham = ({route, navigation}) => {
    const [img, setimg] = useState(route.params.item_sp.img);
    const [tensp, settensp] = useState(route.params.item_sp.tensp);
    const [giasp, setgiasp] = useState(route.params.item_sp.giasp);
    const [motasp, setmotasp] = useState(route.params.item_sp.motasp);
    const [soluong, setsoluong] = useState(route.params.item_sp.soluong);


    
    const Save_Pro = () =>{
        let objPro = {img: img , tensp:tensp , giasp:giasp , soluongmua: "1" }
        let url_api_giohang = 'http://192.168.19.254:9997/giohang/them'
    
        fetch(url_api_giohang, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objPro)
        }).then((res) => {
            if (res.status == 201)
                alert("them thanh cong")
            console.log("thanh cong")
      
        })
            .catch((e) => {
                console.log(e);
            })
      
        }


  

    const handleGioHang = () => {
        console.log('giỏ hàng');
        navigation.navigate('gioHang');
      };
    return (
        <View style={styles.container} backgroundColor = "#DF5A5A">
            <View>
                <Image
                style={{
                    width: 360, height: 250, borderWidth: 1, backgroundColor: "white",
                    borderColor: "black"
                }}
                source={{uri: route.params.item_sp.img}}
                />
            </View>
            
            <View
            style={{
                backgroundColor: "white",
                width: "100%",
                height: 150
            }}
            >
                <Text style={{color: "red",left: 10,  paddingTop: 20, fontSize: 20, fontWeight: '900'}}>
                {route.params.item_sp.tensp}
                </Text>
                <Text style={{color: "#33907C",left: 10, paddingTop: 10, fontSize: 20, fontWeight: '900'}}>
                ${route.params.item_sp.giasp}
                </Text>

              
                <Text style={{color: "#33907C",left: 10, paddingTop: 10, fontSize: 20, fontWeight: '900'}}>
                số lượng: {route.params.item_sp.soluong}
                </Text>
                
            </View>
            
            <View>
            <Text style={styles.texthello}>{route.params.item_sp.motasp}
            </Text>
            </View>
            
            <View
            style={{
                flexDirection: 'row'
            }}
            >
            <TouchableOpacity
onPress={Save_Pro}
            >
                <Text style={styles.button}
              
                >Add to card</Text>
            </TouchableOpacity>
           
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      textAlign: "center",
      alignItems: "center",
    },
    texthello: {
        paddingTop: 30,
        color: "#FFFFFF",
        fontSize: 15,
        paddingHorizontal: 50,
    },
    button: {
        margin: 40,
        width: 100,
        paddingVertical: 10,
        borderRadius: 10,
        color: "red",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
        backgroundColor: "white",
    },
  });
export default ChiTietSanPham