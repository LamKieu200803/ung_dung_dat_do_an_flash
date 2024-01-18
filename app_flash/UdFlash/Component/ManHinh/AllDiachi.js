import React, { useMemo, useState, useEffect } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { View, TextInput, StyleSheet, FlatList, VirtualizedList, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";


const AllDiachi = (props) => {
    const [isLoading, setisLoading] = useState(true);
    const [dsPro, setdsPro] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [addressselect, setAddressselcect] = useState();
    const [email, setEmail] = useState('');
    const [stateselect, setStateselect] = useState('');
    const [loginInfo, setloginInfo] = useState('');
    const getListPro = async () => {
        console.log("id"+loginInfo._id);
        let url_api_diachi = 'http://172.16.10.109:9997/diachi/'+loginInfo._id

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

                    <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 30 }}>
                        <View style={{ flexDirection: 'column', width: 300, height: 50, marginLeft: 15,marginRight: 50 }}>
                            <Text style={{ fontSize: 15 }}>
                                {item.name}   |   {item.phone}
                            </Text>
                            <Text style={{ color: 'grey' }}>
                                {item.address}
                            </Text>
                        </View>

                        <TouchableOpacity style={{backgroundColor: "#DF5A5A",borderRadius: 10, marginBottom:20,paddingTop:5}}>
                        <Text style={{
                            fontSize: 15,
                            textAlign: 'center',
                            color: 'white',
                            paddingHorizontal:20
                        }}
                        onPress={()=>{props.navigation.navigate('SuaDiaChi',{item:item})}}>Sửa</Text>
                        </TouchableOpacity>



                    </View>
                    <View>
                        <Text style={{ borderBottomColor: '#F38E8E', borderBottomWidth: 1 }}></Text>
                    </View></TouchableOpacity>
</View>

        );
    };


    const getLoginInfo = async () => {
        try {
            const value = await AsyncStorage.getItem('loginInfo')
            if (value !== null) {
                // láy được dữ liệu 
                setloginInfo(JSON.parse(value))
                setisLoading(false)

            }
        } catch (e) {

            console.log(e);
        }
    };
    useEffect(() => {
        const loadData = async () => {
            await getLoginInfo();
            getListPro()
            getLoginInfo()
        };
        loadData();
    }, [isLoading]);
    React.useEffect(() => {
        const unsubcribe = props.navigation.addListener('focus', () => {
            getListPro();

        });
        return unsubcribe
    }, [props.navigation]);



    return (
        <View style={styles.container}>  
            <View style={{
                width: 500,
                height:640
            }}>
                {
                    (isLoading) ? (
                        <ActivityIndicator />
                    ) : (
                        <FlatList
                            data={dsPro}
                            keyExtractor={(item) => item._id}
                            renderItem={renderdiachi}
                        />
                    )
                }

            </View>

            <View style={{paddingVertical: 20, borderTopWidth: 1, }}>
                <TouchableOpacity  onPress={() => { props.navigation.navigate('AddAddress') }}>
                    <View style={{ alignItems: 'center', backgroundColor: '#DF5A5A', paddingTop: 10, paddingBottom: 10, marginHorizontal:150, borderRadius:15 }}>
                        <Text style={{ color: 'white' }}>Thêm địa chỉ</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        


    );
};

export default AllDiachi

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
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