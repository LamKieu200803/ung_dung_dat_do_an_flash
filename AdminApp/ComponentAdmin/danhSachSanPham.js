import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const danhSachSanPham = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', image: require('../ComponentAdmin/images/image1.png'), price: 10 },
        { id: 2, name: 'Product 2', image: require('../ComponentAdmin/images/image1.png'), price: 20 },
        { id: 3, name: 'Product 3', image: require('../ComponentAdmin/images/image1.png'), price: 15 },
        { id: 4, name: 'Product 3', image: require('../ComponentAdmin/images/image1.png'), price: 15 },
        { id: 5, name: 'Product 3', image: require('../ComponentAdmin/images/image1.png'), price: 15 },
        { id: 6, name: 'Product 3', image: require('../ComponentAdmin/images/image1.png'), price: 15 },
        { id: 7, name: 'Product 3', image: require('../ComponentAdmin/images/image1.png'), price: 15 },
        { id: 8, name: 'Product 3', image: require('../ComponentAdmin/images/image1.png'), price: 15 },
    ]);
    
    const removeItem = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };
    
    const renderCartItem = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.cartItemContainer}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>Price: ${item.price}</Text>
            </View>
          <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteButton}>
            <Icon name="trash" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
    );
    
    const renderEmptyCart = () => (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
    );
    
    const renderCart = () => (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={renderEmptyCart}
        />
    );
    
    return (
        <View style={styles.container}>
        {cartItems.length > 0 ? (
            renderCart()
        ) : (
            <View style={styles.emptyCartContainer}>
              <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            </View>
        )}
          <TouchableOpacity style={styles.buyButton} onPress={() => alert('Chuyển sang màn thêm')}>
            <Text style={styles.buyButtonText}>Thêm sản phẩm</Text>
          </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F27171'
},
cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#B0E2FF',
    borderRadius: 10
},
productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
},
productDetails: {
    flex: 1,
},
productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'red'
},
productPrice: {
    fontSize: 14,
    color: 'red',
    marginBottom: 8,
},
quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
},
quantityButton: {
    paddingHorizontal: 8,
},
quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
},
deleteButton: {
    marginRight: 16,
},
emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
},
buyButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
    borderRadius: 10
},
buyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
},
});

export default danhSachSanPham;