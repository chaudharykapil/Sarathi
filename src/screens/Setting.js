import React, { Component } from 'react';
import {View, StyleSheet ,Text} from 'react-native';

class Setting extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text style = {{color:"#000000"}}>Setting Page</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Setting;
