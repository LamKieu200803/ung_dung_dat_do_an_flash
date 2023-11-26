import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InvoiceScreen = () => {
    return (
        <View style={styles.container}>

            <View>
                <Text style={{ fontSize: 40, marginBottom: 30,  }}>Hóa Đơn</Text>
            </View>
            <View style ={styles.form}>
            <Text style={styles.date}>Ngày: 07/11/2023</Text>
            <View style={styles.divider} />
            <View style={styles.customerInfo}>
                <Text style={styles.info}>Tên: Nhất</Text>
                <Text style={styles.info}>Số điện thoại: 0123456789</Text>
                <Text style={styles.info}>Địa chỉ: </Text>
                <Text style={styles.info}>Tổng tiền: $100</Text>
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    date: {
        fontSize: 18,
        marginBottom: 16,
        color: '#FFFFFF',
        marginLeft: 20,
        marginTop: 10
    },
    divider: {
        height: 1,
        backgroundColor: '#000000',
        marginVertical: 16,
    },
    form:{
        backgroundColor: 'red',
        borderRadius: 10,
        
    },
    customerInfo: {
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    info: {
        fontSize: 16,
        marginBottom: 4,
        color: '#FFFFFF',
        marginLeft: 20
    },

});

export default InvoiceScreen;