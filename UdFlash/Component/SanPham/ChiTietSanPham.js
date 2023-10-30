import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import React, { useState } from "react";

  const ChiTietSanPham = (props) => {

    return (
        <View style={styles.container} backgroundColor = "#DF5A5A">
            <View>
                <Image
                style={{
                    width: 360, height: 250, borderWidth: 1, backgroundColor: "white",
                    borderColor: "black"
                }}
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTocfSsilou6XtJ7f4Y5Sn6IcMgIV6LGMj_JQ&usqp=CAU' }}
                />
            </View>
            
            <View
            style={{
                backgroundColor: "white",
                width: "100%",
                height: 100
            }}
            >
                <Text style={{color: "red",left: 10,  paddingTop: 20, fontSize: 20, fontWeight: '900'}}>
                    Coca Cola
                </Text>
                <Text style={{color: "#33907C",left: 10, paddingTop: 10, fontSize: 20, fontWeight: '900'}}>
                    $25
                </Text>
            </View>
            
            <View>
            <Text style={styles.texthello}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Lobortis cras placerat diam ipsum ut. Nisi vel adipiscing massa bibendum diam.
                Suspendisse mattis dui maecenas duis mattis. Mattis aliquam at arcu,
                semper nunc, venenatis et pellentesque eu. Id tristique maecenas tristique habitasse
                eu elementum sed. Aliquam eget lacus, arcu, adipiscing eget feugiat in dolor sagittis.
                Non commodo, a justo massa porttitor sed placerat in. Orci tristique etiam tempus 
                sed. Mi varius morbi egestas dictum tempor nisl.
            </Text>
            </View>
            
            <View
            style={{
                flexDirection: 'row'
            }}
            >
            <TouchableOpacity>
                <Text style={styles.button}>Add to card</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.button}>Buy</Text>
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
        paddingTop: 70,
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