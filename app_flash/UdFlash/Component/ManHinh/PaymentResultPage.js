import React from 'react';

class PaymentResultPage extends React.Component {
  componentDidMount() {
    const vnpay = window.vnpay;

    // Kiểm tra xem có kết quả từ VNPay hay không
    if (vnpay && vnpay.isSuccess()) {
      const responseCode = vnpay.getResponseCode();
      // Xử lý kết quả thanh toán dựa trên responseCode
      if (responseCode === '00') {
        console.log('Thanh toán thành công');
      } else {
        console.log('Thanh toán thất bại');
      }
    }
  }

  render() {
    return (
        alert("đặt hàng thành công")
    );
  }
}

export default PaymentResultPage;