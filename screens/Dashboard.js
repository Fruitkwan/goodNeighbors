import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react'

const Dashboard = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text>Welcome screen!</Text>

       
        
          <Button style={styles.button}  onPress={() => navigation.navigate('Login')} > Login</Button>
          <Button  style={styles.button}  onPress={() => navigation.navigate('Register')} > Register</Button>
          
        </View>
    
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

  
    button: {
        alignItems: "center",
        alignSelf: "center",
        
        padding: 10,
        width: '100%',
        margin: 12,
    },
  });

export default Dashboard