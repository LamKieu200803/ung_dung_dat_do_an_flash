import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
const ThanhToan1 = 'http://172.20.10.11:8888/order/create_payment_url';
const Webview = (props) =>  {
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <View style={{ width: '100%', height: '100%' }}>

                <WebView
                    source={{ uri: ThanhToan1 }}
                    onLoad={console.log('Loaded')}
                >

                </WebView>
            </View>
        </View>
    )
}
export default Webview
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})