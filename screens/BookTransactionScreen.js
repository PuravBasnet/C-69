import React from 'react';
import * as Permissons from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';


export default class TransactionScreen extends React.Component{
    constructor() {
      super();
      this.state={
          hasCameraPermissions:null,
          scanned:false,
          scannedData:'',
          buttonState:'normal',
      }
    }
    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if (buttonState === "clicked" && hasCameraPermissions){
          return( <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned
          } 
             style={StyleSheet.absoluteFillObject} /> 
            ); 
            } 
            else if (buttonState === "normal"){
                 return( 
                  <View style={styles.container
                  }> 
                    <Text style={styles.displayText}>
                    { hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission" }
                    </Text> 
                    <TouchableOpacity onPress={this.getCameraPermissions} style={styles.scanButton}>
                      <Text style={styles.buttonText}>Scan QR Code</Text> 
                    </TouchableOpacity> 
                  </View> ); 
                  } 
        }
    getCameraPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
          /*status==="granted" is true when user has granted permission status==="granted" is false when user has not granted the permission*/
          hasCameraPermissions: status === 'granted',
          buttonState: 'clicked',
          scanned: false,
        });
      };
      handleBarCodeScanned = async ({ type, data }) => {
        this.setState({ scanned: true, scannedData: data, buttonState: 'normal' });
      };      
}

const styles =StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
        },
    displayText:{
        fontSize:15,
        textDecorationLine:'red',
        },
    scanButton:{
        padding:10,
        backgroundColor:'#219653',
        margin:10,     
        },
});