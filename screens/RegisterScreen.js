import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import React, { useState} from "react";
import * as Crypto from 'expo-crypto';
import { firebase } from '../config';

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    


    registerUser = async (email, password) => {
        try{
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log("Register Successful")
            const hashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,password);
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    hashedPassword,
                    email,
                    phone
                })

                

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.text}>Register Screen</Text>
            <TextInput
                label = "Name"
                theme={{ colors: { primary: 'blue' } }}
                mode="outlined"
                right={<TextInput.Icon icon="account" />}
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <TextInput
                label = "Email"
                mode="outlined"
                right={<TextInput.Icon icon="email" />}
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                
                label="Password"
                mode="outlined"
                onChangeText={(text) => setPassword(text)}
                value={password}
                right={<TextInput.Icon icon="eye" />}
                secureTextEntry={true}
            />
            <TextInput
                
                label="Phone"
                mode="outlined"
                onChangeText={(text) => setPhone(text)}
                right={<TextInput.Icon icon="phone" />}
                value={phone}
            />
                <TouchableOpacity style={styles.button} onPress={() => registerUser(email, password)}>
                <Button >Register</Button>
                        </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <Button >Dashboard</Button>
                </TouchableOpacity>
        </ScrollView>
    )
    }
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 20,
        alignSelf: "center",
        marginBottom: 20,
        marginTop: 20,
    },
    input: {
        justifyContent:"center",
        height: 40,
        flex: 1,
        margin: 10,
        padding: 8,
        color: 'white',
        fontSize: 18,
        
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
    link:{  
        color: '#0000FF',
        textDecorationLine: 'underline',
    }
})
export default RegisterScreen;