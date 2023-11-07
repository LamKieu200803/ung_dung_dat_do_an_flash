import React from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';

const StatisticScreen = () => {
  const data = [
    { x: 'Hủy đơn', y: 57.1 },
    { x: 'Đang xử lí', y: 14.3 },
    { x: 'Đã nhận hàng', y: 14.3 },
    { x: 'Đang giao hàng', y: 14.3 },
  ];

  

  return (
    <View>
      <VictoryPie
        data={data}
        colorScale={['#FF5722', '#2196F3', '#4CAF50', '#E91E63']}
        labels={({ datum }) => `${datum.x}\n${datum.y}%`}
      />
      <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>
        Biểu đồ thống kê đơn hàng
      </Text>
    </View>
  );
};

export default StatisticScreen;