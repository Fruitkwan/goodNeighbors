import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { firebase } from '../config';

export default function Dashboard ({navigation, route}){

    // State
    const [data, setData] = useState(null);

    useEffect(() => {

        async function fetchUserData() {

            // Pega o UID via parametro de rota
            const uid = route.params.uid;

            // Referenciando documento
            const userDocument = doc(db, 'users', uid);

            // Pegando os dados
            const response = await getDoc(userDocument)

            setData(response.data())

        }

        fetchUserData();

    }, [])

    async function logout() {
        
        // Executa a funcao de logout do firebase
        signOut(auth)

    }

    return (
        
        <View style={globalStyle.centralizedContainer}>
            
            {/* Logica de carregamento */}
            {!data
                ? 
                (
                    <ActivityIndicator animating={true} size="large" color="#000" />
                ) 
                : 
                (
                    <>
                        <Text style={styles.profileTitle}>Bem vindo ao seu perfil!</Text>
                        <View style={{marginBottom: 15}}>
                            <Text>{data.email}</Text>
                            <Text>{data.name}</Text>
                        </View>
                        <CustomButton text={'Logout'} onPressHandler={logout} loader={false} />
                    </>
                )
            }

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    }
})

