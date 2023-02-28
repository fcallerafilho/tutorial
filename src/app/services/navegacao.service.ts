import { ToastService } from 'src/app/services/toast.service';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class NavegacaoService {
	constructor(
		private navCtrl: NavController,
		private toast: ToastService
	) {}

	// opções para a variável tipo:
	// Forward: navega para a próxima página
	// Back: navega para a página anterior
	// Root: navega para a página inicial

	navegarPara(
		nomeDaRota: string,
		tipo: string = 'Forward',
		params: any = null
	) {
		try {
			if (params) {
				const navigationExtras: NavigationExtras = {
					queryParams: { ...params },
				};

				console.log(navigationExtras);

				this.navCtrl.navigateBack;

				this.navCtrl[`navigateForward`](
					nomeDaRota
				);
			} else {
				this.navCtrl[`navigateForward`](nomeDaRota);
			}
		} catch (error) {
			this.toast.showToast(
				`Ocorrera um erro de navegação`, //: ${error.message}`,
				3000
			);
		}
	}
}
