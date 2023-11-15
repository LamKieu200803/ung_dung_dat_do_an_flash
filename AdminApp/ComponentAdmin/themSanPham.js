import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

const AddProductScreen = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [productType, setProductType] = useState('Food');
    const [quantity, setQuantity] = useState('');
    const [productDescription, setProductDescription] = useState('');

    const handleAddProduct = () => {
        // TODO: Thêm sản phẩm vào danh sách hoặc gửi thông tin sản phẩm đi đâu đó
        // Ví dụ:
        // addProductToCart({ productName, price, productType, quantity, productDescription });
        // navigateToProductListScreen();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Thêm sản phẩm</Text>

            <View style={styles.sp}>
                <View style={styles.sp1}>
                    <Text style={styles.label}>Tên sản phẩm</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tên sản phẩm"
                        value={productName}
                        onChangeText={setProductName}
                    />

                    <Text style={styles.label}>Giá tiền</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Giá tiền"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.sp1}>
                    <Image source={require('../ComponentAdmin/images/image2.png')} style={styles.productImage} />
                </View>
            </View>

            <View style={styles.quantityContainer}>
                <Text style={styles.label}>Số lượng</Text>
                <TextInput
                    style={[styles.input, styles.quantityInput]}
                    placeholder="Số lượng"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                />

                
            </View>

            <Text style={styles.mota}>Mô tả sản phẩm: </Text>
                <TextInput
                    style={styles.mota1}
                    placeholder="Mô tả sản phẩm"
                    value={productDescription}
                    onChangeText={setProductDescription}
                />

            <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                <Text style={styles.buttonText}>Thêm</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#DF5A5A',
    },
    sp: {
        flexDirection: 'row',
backgroundColor: 'white',
        marginBottom:50
    },
    sp1: {
        flex: 0.5,
        marginHorizontal: 15,
        
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        textAlign: 'center',
        marginTop: 150,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 40,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'white',
    },
    quantityInput: {
        flex: 1,
        marginRight: 16,
    },
    mota:{
        marginTop:30,
        backgroundColor: 'white',
    },
    mota1:{
        backgroundColor: 'white',
        marginBottom:50,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    addButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        marginBottom: 50,
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    productImage: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
});

export default AddProductScreen;