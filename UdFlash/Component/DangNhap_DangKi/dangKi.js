import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native'
  import React, { useState } from "react";

const DangKi = (props) => {

    return (
        <View style={styles.container} backgroundColor = "#DF5A5A">
        <Text style={styles.texthello}>Welcome to Flash Shop</Text>
        <Text style = {{color: "white", paddingBottom: 70, paddingTop: 50}}>Sign Up to your account</Text>
  
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.textInput} placeholder="Email/Phone Number"
          />
        </View>
        <View style={styles.inputcontainer}>
          <View style={[styles.textInput, { flexDirection: 'row', alignItems: 'center' }]}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Nhập mật khẩu"
            />
          </View>
        </View>
        <View style={styles.inputcontainer}>
          <View style={[styles.textInput, { flexDirection: 'row', alignItems: 'center' }]}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Nhập lại mật khẩu"
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 100,
            marginVertical: 10,
          }}>
          <Text style={styles.button}>Đăng ký</Text>
        </TouchableOpacity>
        <Text style={{color: "white"}}>Đã có tài khoản ? Đăng nhập</Text>
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
        paddingTop: 100,
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "700",
        paddingVertical: 20,
    },
    inputcontainer: {
        color: "white",
        position: "relative",
        marginHorizontal: 30,
        width: "85%",
        padding: 10,
    },
    textInput: {
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderWidth: 1,
        marginVertical: 5,
        borderRadius: 8,
        borderColor: "white",
    },
    bottominput: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "90%",
    },
    button: {
        width: "100%",
        paddingVertical: 10,
        borderRadius: 8,
        color: "red",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
        backgroundColor: "white",
    },
  });
  
export default DangKi
  