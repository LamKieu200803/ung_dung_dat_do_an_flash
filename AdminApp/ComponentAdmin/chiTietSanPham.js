import React, { useState } from 'react';
import { View, TextInput, Button, FlatList,Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ChiTietSanPham = () => {
    const [ma, setMa] = useState(''); 
    const [name, setName] = useState('');
    const [address, setaddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [price, setPrice] = useState('');
    const [state, setState] = useState('');

    const [cartItems, setCartItems] = useState([
      { id: 1, name: 'Product 1', image: require('../ComponentAdmin/images/image1.png'), price: 10 },
      
  ]);

  const updateStatus = () => {
    // TODO: Gọi API để cập nhật trạng thái của hóa đơn
    // Ví dụ:
    // callAPIToUpdateStatus(route.params.invoice.id, newStatus);
    // Sau khi cập nhật thành công, có thể cập nhật trạng thái trong state
    // setStatus(newStatus);
  };
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>Price: ${item.price}</Text>
      </View>
      
    </View>
        
  );

  return (
    <View style={styles.container}>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Mã"
        value={ma}
        onChangeText={setMa}
      />
    </View>

    
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
    </View>

    
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setaddress}
      />
    </View>


    
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
    </View>

    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
      />
    </View>


    <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />
    </View>
    <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        
    />
   

    <TouchableOpacity style={styles.button} onPress={updateStatus}>
      <Text style={styles.buttonText}>Cập nhật trạng thái</Text>
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
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      color: 'black',
      paddingVertical: 10
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 8,
    },
    nameText: {
      borderBottomColor: 'black',
      flex: 1,
    },
    input: {
      flex: 1,
      height: 40,
      paddingHorizontal: 8,
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      
    },
  
    button: {
      backgroundColor: '#DF5A5A',
      padding: 10,
      borderRadius: 20,
      marginTop: 70,
      marginBottom:50
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    cartItemContainer: {
      marginTop: 30,
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

export default ChiTietSanPham;