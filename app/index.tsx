import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Settings } from '../util/settings/settings';
import { Link } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { registerRootComponent } from 'expo';

export const test = async() => {
	// let result = await SecureStore.getItemAsync('config');

	// if (result) {
	//   alert("🔐 Here's your value 🔐 \n" + result);
	// } else {
	//   alert('No values stored under that key.');
	// }

	// return result;

	// let settingsFetcher = new Settings();
	// let settings = await settingsFetcher.getSettings();
	// let bla = '';

	console.log('here');

	alert('hello');

	return true;
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
			<StatusBar style="auto" />
			<Text style={styles.title}>Welcome to Zlim</Text>

			<View style={{height: 20}} />

			<TouchableOpacity onPress={async() => await test()}>
				<Text>Hallo</Text>
			</TouchableOpacity>

			<View style={{height: 20}} />

			<TouchableOpacity onPress={async() => await browse()}>
				<Text>Hallo 2</Text>
			</TouchableOpacity>

			<View style={{height: 20}} />

			<Link href="/config">Config</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontWeight: 'bold',
	},
});
  
registerRootComponent(App) //This line is important