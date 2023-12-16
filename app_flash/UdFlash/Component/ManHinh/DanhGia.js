import { View, StyleSheet, Image, Text } from "react-native";
import { useState } from "react";

const Danhgia = ({navigation, route}) =>{
    const [img, setimg] = useState(route.params.item.img);
    const [tensp, settensp] = useState(route.params.item.tensp);
    const [giasp, setgiasp] = useState(route.params.item.giasp);
    const [soluongmua, setsoluongmua] = useState(route.params.item.soluongmua);
    
    
    
    
return(
    <View style={styles.container}>
        
<View style={{backgroundColor:'white', width:'100%', height:80, flexDirection:'row'}}>
<Image source={{ uri: img }} style={{ width: 70,
      height: 70,
      marginRight: 5,
     margin:5,
     marginBottom:10,
     marginLeft:10,
     borderRadius:10}} />
                    <View style={{ width: 250, marginLeft: 5, marginTop:5 }}>
                        <Text style={styles.productName}>{tensp}</Text>
                        <Text style={styles.productPrice}> $ {giasp}</Text>
                        <Text style={styles.productPrice1}>Số lượng mua: {soluongmua}</Text>
                    </View>

</View>

<View style={{backgroundColor:'white', width:'250', height:250, margin:10, padding:10, }}>

</View>


    </View>
)
}
export default Danhgia ;


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#DF5A5A',
  },
  productName:{
    fontWeight:'bold'
  }
});