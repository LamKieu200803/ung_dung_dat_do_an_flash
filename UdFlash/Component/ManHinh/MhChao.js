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
        <View style={styles.container} backgroundColor = "#D8ADAD">
            <View>
                <Image
                style={{
                    width: 500, height: 250, borderWidth: 1, backgroundColor: "white",
                    borderColor: "black"
                }}
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTocfSsilou6XtJ7f4Y5Sn6IcMgIV6LGMj_JQ&usqp=CAU' }}
                />
            </View>
        
            <View 
                style={{
                    flexDirection: "column",
                }}
            >
                <Text style={styles.texthello}>Flash Shop</Text>
                <Image
                style={{
                    width: 100, height: 100, backgroundColor: "red",
                    borderRadius: 25, left: 70,
                }}
                source={{uri: 'https://previews.123rf.com/images/distrologo/distrologo1902/distrologo190200759/117609989-flash-sale-logo-icon-design-template-flash-shop-logo-design-template.jpg' }}
                />
                
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
        paddingTop: 170,
        paddingBottom: 10,
        color: "red",
        fontSize: 30,
        paddingHorizontal: 50,
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
  });
export default MhChao