import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState} from "react";
import { TextInput, Button } from "react-native-paper";
import { firebase } from '../config';
import { useNavigation } from "@react-navigation/native";
import alertFunction from "../helper/AlertFunction";

const LoginScreen = () => {
    const navigation = useNavigation();
     //google sign in

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  

    loginUser = async (email, password) => {
        try{

            if(email == '' || password == ''){
                alertFunction('Please fill in the details!')
                return;
            }
                await  firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
                    const uid = response.user.uid
                    const usersRef = firebase.firestore().collection('users')
                    usersRef
                        .doc(uid)
                        .get()
                        .then(firestoreDocument => {
                            if (!firestoreDocument.exists) {
                                alert("User does not exist anymore.")
                                return;
                            }
                            const user = firestoreDocument.data()
                            navigation.navigate('Dashboard', {user: user})})
                        })
                .catch (error => {
            alert(error)
        })
    } catch (error) {
    console.log(error)
}
}


    return (
        <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                    
                />
            <TextInput
                style={styles.input}
                label="Email"
                mode="outlined"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />  
            <TextInput
                style={styles.input}
                mode="outlined"
                label="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={() => loginUser(email, password)}>
                <Button >Login</Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Don't have an account? Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                <Text style={styles.link}>Forgot your password?</Text>
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

    input: {
        height: 40,
        width: '90%',
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        width: '60%',
        margin: 12,
    },
    buttonText: {
        fontSize: 20,
    },
    logo: {
        flex: 1,
        width: '95%',
        resizeMode: 'contain',
        alignSelf: "center",
    },
    buttonText: {
        fontSize: 12,
        color: 'purple',
    },

    link:{  
        color: 'purple',
        textDecorationLine: 'underline',
    }

})


export default LoginScreen;