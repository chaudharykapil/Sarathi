import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {Surface,Text,Divider} from 'react-native-paper'
class ContactScreen extends Component {
    render() {
        return (
            <View>
                <Surface>
                    <Text style = {{fontSize:30,fontFamily:"Roboto_Bold",paddingVertical:20,paddingHorizontal:5,fontWeight:"bold"}}>Emergency Contacts</Text>
                </Surface>
                <View>
                    <View style = {{paddingHorizontal:10,paddingVertical:20}}>
                        <Text style = {{fontSize:20}}>Ambulance : 102</Text>
                    </View>
                    <Divider />
                    <View style = {{paddingHorizontal:10,paddingVertical:20}}>
                        <Text style = {{fontSize:20}}>Police : 100</Text>
                    </View>
                    <Divider />
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({})

export default ContactScreen;
