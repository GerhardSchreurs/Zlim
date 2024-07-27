import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Settings } from '../util/settings/settings';
import { ISettings } from '../util/settings/ISettings';
import { INotebook } from '../util/settings/INotebook';

export default function Config() {
	const [settings, setSettings] = useState<ISettings>();
	const settingsFetcher = new Settings();

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

	useEffect(() => { fetchItems();	}, []);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Config scherm!</Text>
			</View>
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
				<Text>Add notebook:</Text>
				<TextInput placeholder="Name">
				</TextInput>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	test: {
		backgroundColor: 'red'
	},

	addNotebookContainer: {
		alignSelf: 'stretch',
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

	flatListContentContainer: {
		flexGrow: 1,
	}
});
