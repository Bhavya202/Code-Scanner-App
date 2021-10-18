import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal',
    });
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === 'clicked' && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    else if (buttonState === 'normal') {
      return (
        <View style={styles.container}>
          <View>
            <Image
              source={require('../assets/scanner.png')}
              style={{ width: 200, height: 200 }}
            />
          </View>
          <Text style={styles.displayText}>
            {hasCameraPermissions === true
              ? this.state.scannedData
              : 'Scan Any Qr Or Bar Code'}
          </Text>

          <TouchableOpacity
            onPress={this.getCameraPermissions}
            style={styles.scanButton}
            title="Bar Code Scanner">
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    background: 'linear-gradient(to bottom, #74ebd5, #acb6e5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    borderRadius: 5,
    borderWidth: 2,
    width: '70%',
    padding: 7.5,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 17.5,
    fontStyle: 'italic',
    cursor: 'copy',
  },
  scanButton: {
    background: 'linear-gradient(to top, #2193b0, #6dd5ed)',
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    width: '80%',
    height: 50,
    margin: 20,
    alignSelf: 'center',
    textAlign: 'center',
    cursor: 'default',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 500,
  },
});
