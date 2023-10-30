import React, { useState } from 'react';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';

const HistoryScreen = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', image: require('../images/image1.png'), price: 10 },
    { id: 2, name: 'Product 2', image: require('../images/image2.png'), price: 20 },
    { id: 3, name: 'Product 3', image: require('../images/image3.png'), price: 15 },
  ]);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>Price: ${item.price}</Text>
      </View>
    </View>
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
      <Text style={styles.transactionsText}>Transactions     <Text style={styles.dateText}>Januari 2023</Text></Text>
      
      {cartItems.length > 0 ? (
        renderCart()
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#DF5A5A',
  },
  transactionsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius:10
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
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
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
  dateText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
    color:'green'
  },
});

export default HistoryScreen;