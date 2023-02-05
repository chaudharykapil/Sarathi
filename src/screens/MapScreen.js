import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
class MapScreen extends Component {
    render() {
        return (
            <View style = {{flex:1,backgroundColor:"#aa1122"}}>
                <MapView                  
                style = {{
                        ...StyleSheet.absoluteFillObject,
                    }}
                    initialRegion = {{
                        latitude: 23.210569,
                        longitude:  72.594771,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0121,
                    }}
                    showsUserLocation = {true}
                    showsMyLocationButton = {true}
                    provider={PROVIDER_GOOGLE}
                >
                    {
                    this.props.crashData?this.props.crashData.map((v,i)=><Marker title = "Crash" 
                    pinColor = "#aa2211" coordinate={{latitude:parseFloat(v.Latitude),longitude:parseFloat(v.Longitude)}} key = {String(i)} />):null
                }
                </MapView>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({})

export default MapScreen;
