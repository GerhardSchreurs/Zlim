import * as SecureStore from 'expo-secure-store';
import { INotebook } from './INotebook';
import { ISettings } from './ISettings';


const KEY_OPTIONS = 'options';

export class Settings {
	public async storeTestData(): Promise<boolean> {
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


	async getSettings(): Promise<ISettings> {
		let settingsString = await SecureStore.getItemAsync(KEY_OPTIONS);
	
		if (!settingsString) {
			//Not created yet or deleted
			await this.storeTestData(); //TODO
		}

		settingsString = await SecureStore.getItemAsync(KEY_OPTIONS);

		//OPTIONS FOUND
		let settings:ISettings = JSON.parse(settingsString) as ISettings;

		return settings;
	}
}

