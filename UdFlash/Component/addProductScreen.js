import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

const AddProductScreen = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [productType, setProductType] = useState('Food');
    const [quantity, setQuantity] = useState('');

    const handleAddProduct = () => {
        // TODO: Thêm sản phẩm vào danh sách hoặc gửi thông tin sản phẩm đi đâu đó
        // Ví dụ:
        // addProductToCart({ productName, price, productType, quantity });
        // navigateToProductListScreen();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Thêm sản phẩm</Text>

            <View style ={styles.sp}>
                <View style ={styles.sp1}>
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
                <View style ={styles.sp1}>
                    <Image source={require('../images/image2.png')} style={styles.productImage} />
                </View>
            </View>

            <Text style={styles.label}>Thông tin sản phẩm</Text>
            <View style={styles.radioContainer}>
                <TouchableOpacity
                    style={[styles.radioButton, productType === 'Food' ? styles.radioButtonSelected : null]}
                    onPress={() => setProductType('Food')}
                >
                    <Text style={[styles.radioLabel, productType === 'Food' ? styles.radioLabelSelected : null]}>Food</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.radioButton, productType === 'Drink' ? styles.radioButtonSelected : null]}
                    onPress={() => setProductType('Drink')}
                >
                    <Text style={[styles.radioLabel, productType === 'Drink' ? styles.radioLabelSelected : null]}>Drink</Text>
                </TouchableOpacity>
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

            <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                <Text style={styles.buttonText}>Thêm</Text>
            </TouchableOpacity>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    sp:{
        flexDirection: 'row',
    },
    sp1:{
        flex: 0.5,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
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
    radioContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    radioButton: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        padding: 8,
        marginRight: 16,
    },
    radioButtonSelected: {
        backgroundColor: 'gray',
    },
    radioLabel: {
        fontWeight: 'bold',
    },
    radioLabelSelected: {
        color: 'white',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    quantityInput: {
        flex: 1,
    },
    addButton: {
        backgroundColor: '#DF5A5A',
        padding: 10,
        borderRadius: 20,
        marginBottom: 50,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    productImageContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    productImage: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
    productInfo: {
        textAlign: 'center',
        fontSize: 16,
    },
});

export default AddProductScreen;