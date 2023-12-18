import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const MhChao = (props) => {


  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);


  return (
    <View style={styles.mau}>
      <View style={styles.container}>
        <View>
          <Image
            style={{
              width: 480, height: 300, borderWidth: 1, backgroundColor: "white",
              borderColor: "black"
            }}
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTocfSsilou6XtJ7f4Y5Sn6IcMgIV6LGMj_JQ&usqp=CAU' }}
          />
        </View>
        <View>
          <Text style={styles.chu1}>
           Chào mừng bạn đã đến vớI app đặt 
           </Text>
            <Text  style={styles.chu2}> đồ ăn Flash của chúng tôi</Text>  
         
        </View>
        <View style={styles.canbang}>
          <Image
            style={{
              width: 130, height: 130,
              borderRadius: 25, marginTop: 40, marginLeft: 90
            }}
            source={{ uri: 'https://previews.123rf.com/images/distrologo/distrologo1902/distrologo190200759/117609989-flash-sale-logo-icon-design-template-flash-shop-logo-design-template.jpg' }}
          />
          <Text style={styles.texthello}>Flash Shop</Text>
        </View>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 480
  },
  mau: {
    flex: 1,
    backgroundColor: "#DF5A5A",
  },
  texthello: {
    color: "red",
    fontSize: 35,
    marginTop: 75,
    marginLeft: 20
  },
  canbang: {
    flexDirection: "row",
    marginTop:50
  },
  button: {
    width: "50%",
    paddingVertical: 10,
    borderRadius: 8,
    color: "red",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    backgroundColor: "white",
  },
  chu1: {
    marginTop: 60,
    marginLeft: 33,
    color: "red",
    fontSize: 27
},
chu2: {
  marginLeft: 80,
  color: "red",
  fontSize: 27
}
});
export default MhChao