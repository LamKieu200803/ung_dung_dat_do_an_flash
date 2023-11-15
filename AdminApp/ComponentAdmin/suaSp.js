import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

const EditProductScreen = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productDescription, setProductDescription] = useState('');

    const handleEditProduct = () => {
        // TODO: Cập nhật thông tin sản phẩm hoặc gửi thông tin sửa sản phẩm đi đâu đó
        // Ví dụ:
        // editProduct({ productName, price, quantity, productDescription });
        // navigateToProductListScreen();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Sửa sản phẩm</Text>

            <View style={styles.productContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../ComponentAdmin/images/image2.png')} style={styles.productImage} />
                </View>

                <View style={styles.productInfo}>
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

                    <Text style={styles.label}>Số lượng</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Số lượng"
                        value={quantity}
                        onChangeText={setQuantity}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.label}>Mô tả sản phẩm</Text>
                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Mô tả sản phẩm"
                    value={productDescription}
                    onChangeText={setProductDescription}
                    multiline
                />
            </View>

            <TouchableOpacity style={styles.editButton} onPress={handleEditProduct}>
                <Text style={styles.buttonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 16,
backgroundColor: '#DF5A5A',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: 'white',
    },
    productContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
    },
    productInfo: {
        flex: 2,
        padding: 10,
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
        marginBottom: 10,
    },
    descriptionContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    editButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        marginBottom: 30,
    },
    buttonText: {
        color: '#DF5A5A',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default EditProductScreen;