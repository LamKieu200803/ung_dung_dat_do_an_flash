import React, { useState ,useEffect} from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity,navigation} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Thongtin= (props) => {
  const [tennguoimua, setTennguoimua] = useState('');
  const [phone, setPhone] = useState('');
  const [anh, setAnh] = useState('');
  const [loginInfo, setloginInfo] = useState('');
  const [isLoginInfoLoaded, setIsLoginInfoLoaded] = useState(false);
  const [IdUser, setIdUser] = useState('');
  

  const handleSaveAddress = () => {
    let objPro = { tennguoimua: tennguoimua, phone: phone, anh:anh }
    let url_api_diachi = 'http://172.16.10.109:9997/thongtin/them/'+ loginInfo._id;

    fetch(url_api_diachi, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objPro)
    }).then((res) => {
        if (res.status == 201)
            alert("Bạn đã thêm thông tin thành công")
            // console.log(loginInfo._id);
            console.log("aaaaaaa");
            // props.navigation.navigate('Profile',{tennguoimua,anh,phone})
    })
        .catch((e) => {
            console.log(e);
        })
    alert('Địa chỉ đã được lưu thành công');
  };
  const getLoginInfo = async () => {
    try {
        const value = await AsyncStorage.getItem('loginInfo')
        if (value !== null) {
            // láy được dữ liệu 
            setloginInfo(JSON.parse(value))
        }
    } catch (e) {

        console.log(e);
    }
   
}

useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // khi màn hình đc active thì lệnh hoạt động
      getLoginInfo();
    });
  
    return unsubscribe;
  }, [props.navigation]);
// }, [isLoginInfoLoaded]);
// React.useEffect(() => {
//   getLoginInfo();
  
//   if (loginInfo._id) {
//     setIdUser(loginInfo._id);
//     console.log(loginInfo._id);

    
//   }
  
// }, [loginInfo]);

// useEffect(() => {
//   if (isLoginInfoLoaded) {
//     getListPro();
//     console.log(loginInfo._id);
//   }
// }, [isLoginInfoLoaded]);

const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Điền thông tin</Text>
      <Text style={styles.label}>Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={tennguoimua}
          onChangeText={setTennguoimua}
        />
      </View>


      <Text style={styles.label}>Phone</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      <Text style={styles.label}>Ảnh</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ảnh"
          value={anh}
          onChangeText={setAnh}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nameText: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },

  button: {
    backgroundColor: '#DF5A5A',
    padding: 10,
    borderRadius: 20,
    marginTop: 70,
    marginBottom:50
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Thongtin;