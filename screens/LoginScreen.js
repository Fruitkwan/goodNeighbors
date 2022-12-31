import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, { useState} from "react";
import { firebase } from '../config';
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    loginUser = async (email, password) => {
        try{
                await  firebase.auth().signInWithEmailAndPassword(email, password)
                console.log("Login Successful")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login Screen</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />  
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={() => loginUser(email, password)}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.buttonText}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 20,
        marginBottom: 20
    },
    input: {
        height: 40,
        width: '90%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        width: '90%',
        margin: 12,
    },
    buttonText: {
        fontSize: 20,
    }

})


export default LoginScreen;