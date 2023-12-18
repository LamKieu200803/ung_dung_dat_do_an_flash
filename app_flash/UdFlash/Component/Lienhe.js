import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Lienhe = (props) => {
    return (
        <View style={styles.mau}>
            <View >
                <View>
                    <Image
                        style={{
                            width: 480, height: 260, borderWidth: 1, backgroundColor: "white",

                        }}
                        source={{ uri: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/370316691_256886410346983_2860853019783948050_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=510075&_nc_ohc=1-oyJEuHOvAAX9K4fSX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQlodyrQcgk_eY_qEKjhvxxjDVDreKdR5lnJHEfr1tNUA&oe=659FF4EE' }}
                    />
                </View>
            </View>
            <View>
                <Text style={styles.chu}>
                    Cảm ơn quý khách
                </Text>
                <View style={styles.canbang}>
                    <Image
                        style={{
                            width: 170, height: 170, borderWidth: 1, borderColor: '#000000', borderRadius: 25, marginTop: 20, marginLeft: 85
                        }}
                        source={{ uri: 'https://previews.123rf.com/images/distrologo/distrologo1902/distrologo190200759/117609989-flash-sale-logo-icon-design-template-flash-shop-logo-design-template.jpg' }}
                    />
                    <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                        <Text style={styles.texthello}>Flash</Text>
                        <Text style={styles.texthello1}>Shop</Text>
                    </View>

                </View>
                <Text style={styles.chu1}>
                    Vui lòng liên hệ với chúng tôi qua các phương thức dưới.

                </Text>
            </View>
                  <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 25 }}>
                <Text style={styles.diachi}>Địa chỉ:</Text>
                <Text style={styles.diachi1}>Tây Mỗ, Nam Từ Liêm, Hà Nội</Text>
            </View>
            <View>
                <Text style={styles.chu2} >----------------<Text style={{ fontWeight: 'bold' }}>Hotline:</Text> 0327409757----------------</Text>
            </View>
          
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 300,
        width: 480
    },
    diachi: {
        fontSize: 25,
        color: '#DF5A5A',
        fontWeight: 'bold',
        marginLeft: 5
    },
    diachi1: {
        fontSize: 25,
        marginLeft: 6,
        color: '#DF5A5A'
    },
    mau: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    texthello: {
        color: "#FFFFFF",
        fontSize: 45,
        marginTop: 40,
        marginLeft: 10
    },
    texthello1: {
        color: "#FFFFFF",
        fontSize: 45,
        marginTop: 5,
        marginLeft: 10
    },
    button: {
        width: "50%",
        paddingVertical: 10,
        borderRadius: 8,
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
        backgroundColor: "white",
    },
    chu1: {
        marginTop: 20,
        marginLeft: 15,
        color: "#DF5A5A",
        fontSize: 18.5
    },
    chu: {
        marginTop: 20,
        textAlign: 'center',
        color: "#DF5A5A",
        fontSize: 30,
        fontWeight: 'bold'
    },
    chu2: {
        textAlign: 'center',
        color: "#DF5A5A",
        fontSize: 25,
        marginTop:30    },
    canbang: {
        flexDirection: "row",
        marginTop: 10
    }, texthello: {
        color: "#DF5A5A",
        fontSize: 45,
        marginTop: 40,
        marginLeft: 20
    },
    texthello1: {
        color: "#DF5A5A",
        fontSize: 45,
        marginTop: 5,
        marginLeft: 20
    },
});
export default Lienhe