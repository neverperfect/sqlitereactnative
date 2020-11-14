import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    login = () => {
        if (this.state.username === 'admin' && this.state.password === 'root') {
            this.props.navigation.navigate('HomeScreen')
        } else {
            alert('Username or Password wrong')
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behaviour='padding' style={styles.wrapper}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput} placeholder='Username'
                        onChangeText={(username) => this.setState({ username })}
                        underlineColorAndroid='transparent'
                    />     
                    <TextInput
                        style={styles.textInput} placeholder='Password'
                        onChangeText={(password) => this.setState({ password })}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                    />      
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={ this.login }>
                        <Text>Login</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
        fontWeight: 'bold',
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#f05555',
        color: '#ffffff',
        padding: 20,
        alignItems: 'center',
    }
})
