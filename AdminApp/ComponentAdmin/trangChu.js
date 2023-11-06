import { View, StyleSheet, FlatList, VirtualizedList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

const trangChuAd = (props) => {





    const navigation = useNavigation();
    const handleqlhd = () => {
        navigation.navigate('quanLiHD');
    };
    const handleListSp = () => {
        navigation.navigate('danhSachSanPham');
    };


    return (
        <View
            style={
                styles.container
            }
        >
            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                <Image
                style={styles.image}
                    source={require('../ComponentAdmin/images/theFlash-removebg-preview.png')}
                />
                <Text
                    style={styles.text}
                >
                    Flash Shop
                </Text>
            </View>
            <View>
                <View style={{paddingVertical: 30, }}>
                    <TouchableOpacity
                    style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.button} >Quản lí hóa đơn</Text>
                        <View style={{
                            right:70,
                            top: 12,
                        }}>
                            <Ionicons name="add" size={40} color="red"/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{paddingVertical: 30, }}>
                    <TouchableOpacity
                    style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.button} >Thống kê</Text>
                        <View style={{
                            right:70,
                            top: 12,
                        }}>
                            <Ionicons name="add" size={40} color="red"/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{paddingVertical: 30, }}>
                    <TouchableOpacity
                    onPress={handleListSp}
                    style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.button} >Danh sách sản phẩm</Text>
                        <View style={{
                            right:70,
                            top: 12,
                        }}>
                            <Ionicons name="add" size={40} color="red"/>
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{paddingVertical: 30}}>
                    <TouchableOpacity>
                        <Text style={styles.button1} >Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingVertical: 30, paddingLeft: 20}}>
                    <TouchableOpacity>
                        <Text style={styles.button1} >Đổi mật khẩu</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>


    );
};

export default trangChuAd

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F27171',
    },
    image:{
        top: 10,
        width: 140,
        height:140,
        left: 70
    },
    button: {
        marginHorizontal: 20,
        width: 400,
        paddingVertical: 20,
        borderRadius: 20,
        fontSize: 25,
        fontWeight: "700",
        textAlign: "left",
        backgroundColor: '#D9D9D9',
        color: 'red',
        paddingLeft: 10
    },
    button1: {
        left: 10,
        width: 200,
        paddingVertical: 10,
        borderRadius: 20,
        fontSize: 25,
        fontWeight: "700",
        textAlign: "center",
        backgroundColor: "#D9D9D9",
        color: 'red',
        
    },
    text:{
        left:80,
        top:70,
        color: 'white',
        fontSize:30
    }
   
});