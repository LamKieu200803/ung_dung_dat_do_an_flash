import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography, Button } from 'react-native';

const PaymentOptionsScreen = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    // Xử lý logic khi người dùng chọn phương thức thanh toán
  };

  return (
    <div>
      <Typography variant="h5" component="h2">
        Select a payment option:
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup value={selectedOption} onChange={handleOptionChange}>
          <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
          <FormControlLabel value="applePay" control={<Radio />} label="Apple Pay" />
          <FormControlLabel value="googlePay" control={<Radio />} label="Google Pay" />
        </RadioGroup>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Proceed to Payment
      </Button>
    </div>
  );
};

export default PaymentOptionsScreen;