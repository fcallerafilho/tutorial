import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	//public loading: HTMLIonLoadingElement;
	constructor(private toastCtrl: ToastController) {}

	async showToast(message: string, duration: number = 2000) {
		const toast = await this.toastCtrl.create({
			message: message,
			duration: duration,
			position: 'top',
		});
		await toast.present();
	}
}
