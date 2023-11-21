import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import VNPay from 'react-native-vnpay';
const PaymentButton = () => {
  const [amount, setAmount] = useState('');

  const handlePayment = async () => {
    try {
      const paymentData = {
        amount: amount,
        description: 'Payment for goods',
        otherInfo: 'Additional information',
      };

      const paymentResult = await VNPay.payment(paymentData);
      
      // Xử lý kết quả thanh toán ở đây
      if (paymentResult.isSuccess) {
        Alert.alert('Payment successful');
      } else {
        Alert.alert('Payment failed');
      }
    } catch (error) {
      console.log('Error occurred during payment:', error);
      Alert.alert('Error occurred during payment');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter amount"
        value={amount}
        onChangeText={text => setAmount(text)}
      />
      <Button title="Pay" onPress={handlePayment} />
    </View>
  );
};

export default PaymentButton;