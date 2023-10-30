import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ChangePasswordScreen = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        // Kiểm tra điều kiện hợp lệ của mật khẩu
        if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
            alert('Vui lòng nhập mật khẩu cũ, mật khẩu mới và mật khẩu nhập lại');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Mật khẩu mới và mật khẩu nhập lại không khớp nhau');
            return;
        }

        // Thực hiện việc đổi mật khẩu
        // Gọi API hoặc thực hiện xử lý ở đây

        // Hiển thị thông báo thành công
        alert('Mật khẩu đã được thay đổi thành công');
    };

    return (
        <View style={styles.container}>

            <Text style={styles.txt}>Đổi mật khẩu</Text>
            <Text style={styles.txt1}>Mật khẩu của bạn phải có ít nhất 6 ký tự, bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%).</Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Mật khẩu cũ"
                value={oldPassword}
                onChangeText={setOldPassword}
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#DF5A5A',
    },
    txt: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 100
    },
    txt1: {
        marginBottom: 60,
        marginTop: 70
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 40,
        paddingHorizontal: 8,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        marginTop: 70,
    },
    buttonText: {
        color: '#DF5A5A',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ChangePasswordScreen;