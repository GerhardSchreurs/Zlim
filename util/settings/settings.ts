import * as SecureStore from 'expo-secure-store';
import { INotebook } from './INotebook';
import { ISettings } from './ISettings';

const KEY_OPTIONS = 'options';

export class Settings {
	public async testStoreTestData(): Promise<boolean> {
		let settings:ISettings = {
			notebooks: [],
		}

		var notebook:INotebook = {} as INotebook;

		notebook.name = 'test';
		notebook.path = 'test';

		settings.notebooks.push(notebook);

		await SecureStore.setItemAsync(KEY_OPTIONS, JSON.stringify(settings));

		return true;
	}

	public async testRemoveSettings(): Promise<boolean> {
		await SecureStore.deleteItemAsync(KEY_OPTIONS);
		return true;
	}

	public async createAndStoreEmptySettings(): Promise<boolean> {
		let settings:ISettings = {
			notebooks: [],
		}

		await SecureStore.setItemAsync(KEY_OPTIONS, JSON.stringify(settings));
		return true;
	}

	async checkPath(path:string): Promise<boolean> {
		// try {
		// 	const statResult = await RNFS.stat(path);
		// 	return statResult.isDirectory();
		// } catch (error) {
		// 	console.error('Error checking path:', error);
		// 	return false;
		// }

		return true;
	}

	async getSettings(): Promise<ISettings> {
		await this.testRemoveSettings();

		let settingsString = await SecureStore.getItemAsync(KEY_OPTIONS);
	
		if (!settingsString) {
			//Not created yet or deleted
			await this.createAndStoreEmptySettings(); //TODO
		}

		settingsString = await SecureStore.getItemAsync(KEY_OPTIONS);

		let settings:ISettings = JSON.parse(settingsString) as ISettings;

		return settings;
	}
}

