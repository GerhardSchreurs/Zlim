import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Settings } from '../util/settings/settings';
import { ISettings } from '../util/settings/ISettings';
import { INotebook } from '../util/settings/INotebook';
import { Button, TextInput } from 'react-native-paper';

export default function Config() {
	const [settings, setSettings] = useState<ISettings>();
	const settingsFetcher = new Settings();
	const [subject, setSubject] = useState(null);

	const [name, setName] = useState<string>();
	const [path, setPath] = useState<string>();


	const fetchItems = async () => {
		let settings = await settingsFetcher.getSettings();
		setSettings(settings);
	};

	const renderItem = ({item}:{item:INotebook}) => {
		console.log('renderItem');

		return (
			<View>
				<Text>{item.name}</Text>
			</View>
		);
	};

	const renderListEmpty = () => {
		return (
			<View style={styles.listEmptyView}>
				<Text>No notebooks found. Please add a notebook</Text>
			</View>
		);
	}

	const addNotebook = async() => {
		//Check if path exists and if we can access
		let canAccess = false;
		
		try {
			if (!name || name.length === 0) {
				throw new Error('forgot name');
			}
			if (!path || path.length === 0) {
				throw new Error('forgot path');
			}
			canAccess = await settingsFetcher.checkPath(path);
			
			if (!canAccess) {
				throw new Error('cannot access path: ' + path);
			}

		} catch (error) {
			Alert.alert("Error", error.message);
		}

		return true;
	}

	useEffect(() => { fetchItems();	}, []);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Config scherm!</Text>
			</View>
			<Text style={{margin: 10, marginLeft: 15, fontWeight: 'bold'}}>Your notebooks:</Text>
			<View style={styles.listContainer}>
				<FlatList 
					style={styles.flatList}
					contentContainerStyle={styles.flatListContentContainer}
					data={settings?.notebooks}
					renderItem={renderItem}
					ListEmptyComponent={renderListEmpty}
				/>
			</View>
			<View style={styles.addNotebookContainer}>
				<Text style={{margin: 10, marginLeft: 15, fontWeight: 'bold'}}>Add notebook:</Text>
				<TextInput
						style={styles.textInput}
						onChangeText={setName} 
						label="Title" 
				/>
				<TextInput
						style={styles.textInput}
						onChangeText={setPath} 
						label="Path" 
				/>

				<Button
					style={{ margin: 10 }}
					icon='send'
					mode='contained'
					onPress={async() => await addNotebook()}
				>
					Add notebook
				</Button>

			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	test: {
		backgroundColor: 'red'
	},

	addNotebookContainer: {
		height: 210,
	},

	flatListContentContainer: {
		flexGrow: 1,
	},

	textInput: {
		flex: 1,
		height: 60

	},

	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},

	titleContainer: {
		alignSelf: 'stretch',
		alignItems: 'center',
	},

	title: {
		fontWeight: 'bold',
	},

	listContainer: {
		flex: 1,
	},

	listEmptyView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	flatList: {
		flex: 1,
	},
});
