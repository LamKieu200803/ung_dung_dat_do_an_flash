import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ProductDetailScreen = () => {
    const [ma, setMa] = useState(''); 
    const [name, setName] = useState('');
    const [address, setaddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [price, setPrice] = useState('');
    const [state, setState] = useState('');

  const updateStatus = () => {
    // TODO: Gọi API để cập nhật trạng thái của hóa đơn
    // Ví dụ:
    // callAPIToUpdateStatus(route.params.invoice.id, newStatus);
    // Sau khi cập nhật thành công, có thể cập nhật trạng thái trong state
    // setStatus(newStatus);
  };

  return (
    <View style={styles.container}>

<Text style={styles.label}>Mã</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Mã"
        value={ma}
        onChangeText={setMa}
      />
    </View>

    <Text style={styles.label}>Name</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
    </View>

    <Text style={styles.label}>Address</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setaddress}
      />
    </View>


    <Text style={styles.label}>Phone</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
    </View>





    <Text style={styles.label}>Price</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
      />
    </View>


    <Text style={styles.label}>State</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
    </View>

   

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
      marginBottom: 16,
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 8,
    },
    nameText: {
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      flex: 1,
    },
    input: {
      flex: 1,
      height: 40,
      paddingHorizontal: 8,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
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
  });

export default ProductDetailScreen;