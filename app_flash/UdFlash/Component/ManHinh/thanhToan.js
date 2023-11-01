import React, { useMemo, useState } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { View, TextInput, StyleSheet, FlatList, VirtualizedList, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const ThanhToan = (props) => {

    const [tennguoimua, settennguoimua] = useState();
    const [sdt, setsdt] = useState();
    const [diachi, setdiachi] = useState();
    const [tongtien, settongtien] = useState(props.route.params);

    const [open, setOpen] = useState(false);  // sổ list xuống hay không
    const [value, setValue] = useState(null);  // giá trị người dùng chọn
    const [pttt, setpttt] = useState([    // mảng các phần tử
        { label: 'Tại nhà', value: 'Tại nhà' },
        { label: 'Ví VNPay', value: 'Ví VNPay' },

    ]);


    const totalPrice = props.route.params;


    const Save_UserMua = () => {
        let objUserMua = { tennguoimua: tennguoimua, sdt: sdt, diachi: diachi, pttt: value
            , tongtien: tongtien }
        let url_api_hoadon = 'http://192.168.19.254:9997/hoadon/them'



        fetch(url_api_hoadon, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objUserMua)
        }).then((res) => {
            if (res.status == 201)

                alert("đặt hàng thành công")
            // DelPro();

        })
            .catch((e) => {
                console.log(e);
            })


    }




    const navigation = useNavigation();
    const handleAddDiaChi = () => {
        navigation.navigate('SanPham');
    };
    const handleAddCard = () => {
        navigation.navigate('SanPham');
    };


    const [selectedId, setSelectedId] = useState("");


    return (
        <View
            style={
                styles.container
            }

        >
            <TouchableOpacity onPress={() => { navigation.navigate('AddAddress') }}>
                <View
                    style={{
                        margin: 10,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: 'grey'
                    }}

                >
                    <Ionicons
                        style={{
                            paddingTop: 50,
                            textAlign: "center",
                        }}
                        name="add" size={50} color="grey"
                    />
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 25,
                            paddingBottom: 50,
                            color: "grey"
                        }}
                    >
                        Add New Adress
                    </Text>
                </View>
            </TouchableOpacity>

            <ScrollView>
                <View
                    ScrollView
                >
                    <View style={{
                        flexDirection: 'row',
                        paddingBottom: 10,

                    }}>

                    </View>

                    <View
                        style={{ flexDirection: 'row', padding: 20, borderTopWidth: 0.5 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{}}>
                                Deliver to Tradly Team, 75119
                            </Text>
                            <Text style={{ color: 'grey' }}>
                                Kualalumpur, Malaysia
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate('AddAddress') }}>
                            <Text style={{
                                backgroundColor: 'red',
                                borderRadius: 20,
                                padding: 10,
                                left: 100,
                                width: 100,
                                textAlign: 'center',
                                color: 'white'
                            }}
                            >Change</Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity>



                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', paddingTop: 15 }}>
                        <Text style={{ fontSize: 30, paddingLeft: 20 }}>
                            Price Details
                        </Text>
                        <View style={{ flexDirection: 'row', paddingTop: 20, paddingLeft: 20 }}>

                            <View>
                                <TextInput style={styles.chu} placeholder='Tên người mua' onChangeText={(txt) => settennguoimua(txt)}>
                                </TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 20, paddingLeft: 20 }}>
                            <View>
                                <TextInput style={styles.chu} placeholder='Số điện thoại' onChangeText={(txt) => setsdt(txt)}>
                                </TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 20, paddingLeft: 20 }}>
                            <View>
                                <TextInput style={styles.chu} placeholder='Địa chỉ' onChangeText={(txt) => setdiachi(txt)}>
                                </TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 20, paddingLeft: 20 }}>


                                <DropDownPicker
                                   
                                    style={styles.chu1}
                                    open={open}
                                    value={value}
                                    items={pttt}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setpttt}
                                    defaultValue="1"
                                    placeholder={"Chọn phương thức thanh toán"} // hoặc placeholder={null}


                                />
                       
                        </View>
                        <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', paddingTop: 30, paddingLeft: 20 }}>
                                Total Price
                            </Text>
                            <Text style={{ fontSize: 20, paddingLeft: 230, fontWeight: '700', paddingTop: 30, }}>
                                ${totalPrice}
                            </Text>
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity onPress={Save_UserMua}>
                            <Text style={styles.button} >Checkout</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>
        </View>


    );
};

export default ThanhToan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        left: 90,
        margin: 30,
        width: 200,
        paddingVertical: 10,
        borderRadius: 20,
        color: "white",
        fontSize: 25,
        fontWeight: "700",
        textAlign: "center",
        backgroundColor: "red",
    },
    chu: {
        fontSize: 15,
        width: 450,
        marginTop: 20,
        height: 50,
        borderWidth: 1,
        marginLeft: 20
    },
    chu1: {
        fontSize: 15,
        width: 450,
        height: 50,
        borderWidth: 1,
        marginLeft: 20,
        marginBottom: 30,
        marginTop: 20,
    }
});