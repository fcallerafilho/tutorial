import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { FirebaseService } from 'src/app/services/firebase.service';
@Injectable({
	providedIn: 'root',
})

export class StorageService {
	constructor() {}

	public async saveStorage(user: User) {
		let userString = JSON.stringify(user);
		await Storage.set({ key: 'usuario', value: userString });
	}

	public async getStorage(): Promise<string> {
		const { value } = await Storage.get({ key: 'usuario' });
		return new Promise(resolve => {
			resolve(value as any);
		});
	}

}
