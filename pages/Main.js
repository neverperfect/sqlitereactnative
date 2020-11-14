import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class Main extends Component {


    render() {
      const { params } = this.props.navigation.state;
        return (
                <View style={styles.container}>
                    <Text style={styles.text}> Welcome Back {params.username} </Text>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
    text: {
        color: '#fff',
    }
})