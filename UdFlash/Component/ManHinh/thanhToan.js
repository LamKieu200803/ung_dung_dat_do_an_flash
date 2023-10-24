import React, { useMemo, useState } from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import { View, TextInput, StyleSheet, FlatList,VirtualizedList, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const GioHang = () => {
    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Debit / Credit Card',
            value: 'option1'
        },
        {
            id: '2',
            label: 'Netbanking             ',
            value: 'option2'
        },
        {
            id: '3',
            label: 'Cash on Delivery   ',
            value: 'option2'
        },
        {
            id: '4', 
            label: 'Wallet                      ',
            value: 'option2'
        },
    ]), []);
        
    const [selectedId, setSelectedId] = useState("");


    return (
        <View
            style={{
                paddingTop: 50
            }}
        >
            <TouchableOpacity>
            <View
            style={{
                margin: 10,
                borderRadius: 10,
                borderWidth: 2,
                borderColor:'grey'
            }}
            >
            <Ionicons 
                style={{
                    paddingTop:50,
                    textAlign:"center",
                }}
                name="add" size={50} color="grey" 
             />
            <Text
                style={{
                    textAlign:'center',
                    fontSize: 25,
                    paddingBottom: 50,
                    color:"grey" 
                }}
            >
                Add Payment Method
            </Text>
            </View>
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.container}>
                    
                    <View style={{ marginTop: 20,right: 90}}>
                    <RadioGroup 
                        radioButtons={radioButtons} 
                        onPress={setSelectedId}
                        selectedId={selectedId}
                    />
                    </View>
                    <View
                        style={{flexDirection:'row', padding: 20}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{}}>
                                Deliver to Tradly Team, 75119
                            </Text>
                            <Text style={{color:'grey'}}>
                                Kualalumpur, Malaysia
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={{
                                backgroundColor: 'red',
                                borderRadius: 20,
                                padding:10,
                                left:40,
                                width: 100,
                                textAlign: 'center',
                                color: 'white'
                            }}
                            >Change</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{flexDirection:'column',paddingLeft:20}}>
                            <Text style={{fontSize: 30,}}>
                                Price Details
                            </Text>
                            <View style={{flexDirection:'row',paddingTop: 20}}>
                                <Text style={{fontSize:20,}}>
                                    Price
                                </Text>
                                <Text style={{fontSize:20,paddingLeft: 220}}>
                                    $250
                                </Text>
                            </View>
                            <View style={{flexDirection:'row',paddingTop: 20}}>
                                <Text style={{fontSize:20,}}>
                                    Delivery Fee
                                </Text>
                                <Text style={{fontSize:20,paddingLeft: 160}}>
                                    Info
                                </Text>
                            </View>
                            <View style={{flexDirection:'row',paddingTop: 35}}>
                                <Text style={{fontSize:25,}}>
                                    Total Amount
                                </Text>
                                <Text style={{fontSize:25,paddingLeft: 110}}>
                                $250
                                </Text>
                            </View>
                        </View>
                    <View >
                        <TouchableOpacity>
                            <Text style={styles.button}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                    
                
                </View>
            </ScrollView>
        </View>
        

    );
};

export default GioHang

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menu: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 15
    },
    icon: {
        margin: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20
    },

    input: {
        flex: 1,
        fontSize: 20,
        color: '#333',
    },
    itemContainer: {
        margin: 10,
    },
    imageContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: 500,
        height: 200,
    },

    price: {
        marginBottom: 2,
        size: '20',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    discountedPrice: {
        fontSize: 16,
        color: 'green',
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
        color: 'red',
    },
    button: {
        left: 50,
        margin: 40,
        width: 200,
        paddingVertical:10,
        borderRadius: 20,
        color: "white",
        fontSize: 25,
        fontWeight: "700",
        textAlign: "center",
        backgroundColor: "red",
    },
});

// import React, { useMemo, useState } from 'react';
// import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

// export default function RadioButtonExample() {

//     const radioButtons = useMemo(() => ([
//         {
//             id: '1', // acts as primary key, should be unique and non-empty string
//             label: 'Option 1',
//             value: 'option1'
//         },
//         {
//             id: '2',
//             label: 'Option 2',
//             value: 'option2'
//         }
//     ]), []);

//     const [selectedId, setSelectedId] = useState("");

//     return (
//         <RadioGroup 
//             radioButtons={radioButtons} 
//             onPress={setSelectedId}
//             selectedId={selectedId}
//         />
//     );

// }