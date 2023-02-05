import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, PermissionsAndroid} from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapScreen from './MapScreen';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

class HomeScreen extends Component {
    constructor() {
        super()
        this.state = {
            temp:"--",
            allcrash:[],
            iscrash:false,
            currentloc:null
        }
        Geolocation.setRNConfiguration({});
        
    }
    requestLocation = async()=>{
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title:"Location",
                    message:
                    "Please allow your loaction",
                    buttonNegative: "Deny",
                    buttonPositive: "Allow"
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED){
                console.log("permission granted")
                Geolocation.getCurrentPosition(info => {
                    let lati = info.coords.latitude
                    let longi = info.coords.longitude
                    this.setState({currentloc:info.coords})
                    this.getWeatherData(String(lati),String(longi))
                });
                
            } else {
                console.log("permission deny")
            }
            
        } catch (error) {
            console.warn(error)
        }
    }
    getWeatherData = (lati,longi)=>{
        let api = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat=${lati}&lon=${longi}`
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '9378d391bemsh997351772c06e99p1970bejsn111e9609b92e',
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        };
        
        fetch(api, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({temp:String(response.temp)+" C"})

            })
            .catch(err => console.error(err));

    }


    componentDidMount(){
        this.requestLocation()
        this.getcrashes()
        //this.authuser()
        
    
    }
    getcrashes = ()=>{
        fetch("https://kapil829.pythonanywhere.com/getdata").then(e=>{
            e.text().then(val=>{
                console.log(JSON.parse(val))
                this.setState({allcrash:JSON.parse(val)},()=>this.checknearchrashes())
            },er=>console.error(er))
        },err=>console.error(err))
    }
    checknearchrashes=()=>{
        if(this.state.allcrash.length){
            this.state.allcrash.map((val,i)=>{
                let x = parseFloat(val.Latitude-this.state.currentloc.latitude)
                let y = parseFloat(val.Longitude-this.state.currentloc.longitude)
                let dist = Math.sqrt(x*x + y*y)*100
                console.log(dist)
                if(dist < 200){
                    this.setState({iscrash:true})
                }
            })
        }
    }
    authuser = ()=>{
        
        auth()
        .signInWithEmailAndPassword('chaudharykapil8279@gmail.com', 'Kapil8279#')
        .then(() => {
            console.log('User account created & signed in!');
            ref = database().ref("/UserData").on("value",snap=>{
                console.log(snap.val())
            },err=>console.log(err))
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            
            }

            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }

            console.error(error);
        });
    }

    render() {
        return (
            <View style = {{flex:1,backgroundColor:""}}>
                <View style = {styles.maincontainer}>
                    {/* <Button mode='contained'>Open Map</Button> */}
                    <View style = {{flex:1,flexDirection:"row"}}>
                        <Card style = {{flex:1}}>
                            <Card.Content style = {{}}>
                                <View style = {{flexDirection:"row"}}>
                                    <View style = {{flex:1}}>
                                        <Text style = {{fontFamily:"Roboto_Black",fontSize:40, color:"#000000",fontWeight:"bold"}}>{this.state.temp}</Text>
                                        <Text variant="bodyMedium" style = {{color:"#AAAAAA"}}>Gandhinagar,Gujrat</Text>
                                    </View>
                                    <View style = {{flex:1}}>
                                        <Icon name ="nights-stay" size = {50} color = "#000000" />
                                    </View>
                                </View>
                                <View style = {{height:150,flexDirection:"column",alignItems:"flex-start",justifyContent:"center"}}>
                                    <Text style = {{fontSize:30,fontWeight:"bold",color:"#99D68B"}}>Drive Safely</Text>
                                    {this.state.iscrash?<Text style = {{fontSize:30,fontWeight:"bold",color:"#EA3C20"}}>Crash Ahead</Text>:null}
                                </View>
                            </Card.Content>
                        </Card>
                    </View>
                    <View style = {{flex:2,flexDirection:"row",marginVertical:5}}>
                        <MapScreen crashData = {this.state.allcrash} />
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer:{
        display:"flex",
        flex:1,
        margin:10,
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"center",


    }
})

export default HomeScreen;
