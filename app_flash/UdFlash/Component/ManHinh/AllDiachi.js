import React, { useMemo, useState, useEffect } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { View, TextInput, StyleSheet, FlatList, VirtualizedList, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const AllDiachi = (props) => {
    const [isLoading, setisLoading] = useState(true);
    const [dsPro, setdsPro] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [addressselect, setAddressselcect] = useState();
    const [email, setEmail] = useState('');
    const [stateselect, setStateselect] = useState('');
    const getListPro = async () => {
        let url_api_diachi = 'http://172.16.10.106:9997/diachi'

        try {
            const response = await fetch(url_api_diachi);
            const json = await response.json();
            setdsPro(json);
            console.log(response);
        } catch (e) {
            console.log(e);
        } finally {
            setisLoading(false)

        }
    }

    const renderdiachi = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => props.navigation.navigate('ThanhToan', { item: item })}>

                    <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 20 }}>
                        <View style={{ flexDirection: 'column', width: 300, height: 50, marginLeft: 15 }}>
                            <Text style={{ fontSize: 15 }}>
                                {item.name}   |   {item.phone}
                            </Text>
                            <Text style={{ color: 'grey' }}>
                                {item.address}
                            </Text>
                        </View>

                        <Text style={{


                            padding: 10,
                            marginLeft: 80,
                            fontSize: 15,
                            textAlign: 'center',
                            color: 'red',
                        }}
                        onPress={()=>{alert("sua")}}
                        >sửa</Text>



                    </View>
                    <View>
                        <Text style={{ borderBottomColor: '#F38E8E', borderBottomWidth: 1 }}></Text>
                    </View></TouchableOpacity>
            </View>

        );
    };



    React.useEffect(() => {
        const unsubcribe = props.navigation.addListener('focus', () => {
            getListPro();

        });
        return unsubcribe
    }, [props.navigation]);


    return (
        <View style={styles.container}>
            <Text style={{ padding: 8, fontSize: 15, }}>Địa chỉ</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
                backgroundColor: '#FFFFFF',
                fontWeight: 'bold',
                marginTop: 5
            }}>
                {
                    (isLoading) ? (
                        <ActivityIndicator />
                    ) : (
                        <FlatList
                            data={dsPro}
                            keyExtractor={(itemdiachi) => itemdiachi._id.toString}
                            renderItem={renderdiachi}
                        />
                    )
                }

            </View>

            <TouchableOpacity  onPress={() => { props.navigation.navigate('AddAddress') }}>
                <View style={{ alignItems: 'center', backgroundColor: 'white', paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={{ color: 'red' }}>  Thêm địa chỉ</Text>
                </View>
            </TouchableOpacity>
        </View>


    );
};

export default AllDiachi

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DF5A5A',
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