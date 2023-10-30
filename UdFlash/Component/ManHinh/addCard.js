import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const AddThe = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [exDate, setExDate] = useState('');
  const [CVC, setCVC] = useState('');
  
  

  const handleSaveCard = () => {
    // Thực hiện lưu địa chỉ
    // Gọi API hoặc thực hiện xử lý ở đây

    // Hiển thị thông báo lưu thành công
    alert('Đã Thêm Thẻ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add a new card</Text>

    <View
    style={{
        paddingLeft:20,
        paddingBottom:10
    }}>
        <Image source={require('../images/mastercard.png')}/>
    </View>


      <Text style={styles.label}>Card Number</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder=""
          value={cardNumber}
          onChangeText={setCardNumber}
        />
      </View>
      <Text style={styles.label}>Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder=""
          value={name}
          onChangeText={setName}
        />
      </View>


      <View
      style={{
        
      }}>
        <Text style={styles.label}>Expires Dates</Text>
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            placeholder=""
            value={exDate}
            onChangeText={setExDate}
            />
        </View>


        <Text style={styles.label}>CVC</Text>
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            placeholder=""
            value={CVC}
            onChangeText={setCVC}
            />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSaveCard}>
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
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

export default AddThe;