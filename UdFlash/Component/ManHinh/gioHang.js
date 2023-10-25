import React from 'react';
import { View, TextInput, StyleSheet, FlatList,VirtualizedList, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';




const products = [
    { id: 1, name: 'Burger', price: 5.99, discount: 0.5, image: require('../images/image2.png'),stt: 1 },
    { id: 2, name: 'Fries', price: 2.99, discount: 0.25, image: require('../images/image2.png'),stt: 1 },
    { id: 3, name: 'Pizza', price: 7.99, discount: 5.75, image: require('../images/image2.png'),stt: 1 },
    { id: 4, name: 'Pizza', price: 7.2, discount: 3.75, image: require('../images/image2.png'),stt: 1 },
    { id: 5, name: 'Pizza', price: 4.99, discount: 2.75, image: require('../images/image2.png'),stt: 1 },
    { id: 6, name: 'Pizza', price: 1.99, discount: 0.75, image: require('../images/image2.png'),stt: 1 },
    // Thêm các sản phẩm khác tại đây
];

const GioHang = () => {


    const renderItem1 = ({ item }) => {
        const discountedPrice = item.price - (item.price * item.discount);
        return (
            <TouchableOpacity onPress={handleImagePress}>
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.overlay}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.discountedPrice}>
                                <Text style={styles.strikeThrough}> ${item.price.toFixed(2)}</Text>
                                <Text> ${discountedPrice.toFixed(2)}</Text>
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row"
                                }}
                            >
                                <Ionicons name="remove" size={24} color="red" />
                                <Text style={styles.name}>{item.stt}</Text>
                                <Ionicons name="add" size={24} color="red" />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const navigation = useNavigation();

    const handleImagePress = () => {
        navigation.navigate('SanPham');
    };

    const handleThanhToan = () => {
        navigation.navigate('ThanhToan');
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                
                <View style={{ marginTop: 20 }}>
                    <FlatList
                        data={products}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem1}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity
                    onPress={handleThanhToan}>
                        <Text style={styles.button}>Buy</Text>
                    </TouchableOpacity>
                </View>

            
            </View>
        </ScrollView>

    );
};

export default GioHang

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DF5A5A"
    },
    menu: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 15
    },
    icon: {
        margin: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20
    },

    input: {
        flex: 1,
        fontSize: 20,
        color: '#333',
    },
    itemContainer: {
        margin: 10,
    },
    imageContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: 500,
        height: 200,
    },

    price: {
        marginBottom: 2,
        size: '20',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    discountedPrice: {
        fontSize: 16,
        color: 'green',
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
        color: 'red',
    },
    button: {
        left: 50,
        margin: 40,
        width: 150,
        paddingVertical:10,
        borderRadius: 10,
        color: "red",
        fontSize: 25,
        fontWeight: "700",
        textAlign: "center",
        backgroundColor: "white",
    },
});