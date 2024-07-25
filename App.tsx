import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Settings } from './util/settings/settings';

export const test = async() => {
	// let result = await SecureStore.getItemAsync('config');

	// if (result) {
	//   alert("🔐 Here's your value 🔐 \n" + result);
	// } else {
	//   alert('No values stored under that key.');
	// }

	// return result;

	let settingsFetcher = new Settings();
	let settings = await settingsFetcher.getSettings();

	let bla = '';
}

export const browse = async() => {

	// var options:DocumentPicker.DocumentPickerOptions = {};
	// options.copyToCacheDirectory = false;
	// options.multiple = false;

	// let result = await DocumentPicker.getDocumentAsync(options);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

	  <View style={{height: 20}} />

	  <TouchableOpacity onPress={async() => await test()}>
      	<Text>Hallo</Text>
	  </TouchableOpacity>

	  <View style={{height: 20}} />

	  <TouchableOpacity onPress={async() => await browse()}>
      	<Text>Hallo 2</Text>
	  </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
