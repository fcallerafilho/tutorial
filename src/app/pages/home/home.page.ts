import { ToastService } from './../../services/toast.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/interfaces/user';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, ToastController } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userVetor: User[] = [];
  segmentChange: String = 'visualizar';

  constructor(
    private fireStore: AngularFirestore,
    private alertCtrl: AlertController,
    private auth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private cepService: CepService,
    private toast: ToastService
  ) {
    this.getUserData();
  }

  private async getUserData(): Promise<void> {
    //primeira maneira de chamar todos os documentos de uma coleção
    const collectionRef = this.fireStore.collection('users');

    let userBanco = await collectionRef.get().toPromise();

    let users = userBanco?.docs.map((doc) => {
      return doc.data();
    });

    console.log(users);
    //teste
    //segunda maneira de chamar todos os documentos de uma coleção
    collectionRef.valueChanges().subscribe((data) => {
      this.userVetor = data as User[];
      console.log(this.userVetor);
    });
  }

  async alertVisualizarInformacoes(i: number) {
    console.log(this.userVetor[i].nome);
    const alert = await alertController.create({
      header: this.userVetor[i].nome,
      subHeader: 'Informações do usuário',
      message: `
      <ul>
        <li> Nome: ${this.userVetor[i].nome} </li>
        <p> </p>
        <li> CPF: ${this.userVetor[i].cpf} </li>
        <p> </p>
        <li> CEP: ${this.userVetor[i].cep} </li>
        <p> </p>
        <li> endereço: ${this.userVetor[i].endereco} </li>
        <p> </p>
        <li> Cidade: ${this.userVetor[i].cidade} </li>
        <p> </p>
        <li> Email: ${this.userVetor[i].email} </li>
      </ul>
      `,

      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertEditarInformacoes(i: number) {
    console.log(this.userVetor[i].nome);
    const alert = await alertController.create({
      header: this.userVetor[i].nome,
      subHeader: 'Informações do usuário',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome',
          value: this.userVetor[i].nome,
        },
        {
          name: 'cpf',
          type: 'text',
          placeholder: 'CPF',
          value: this.userVetor[i].cpf,
        },
        {
          name: 'cep',
          type: 'text',
          placeholder: 'CEP',
          value: this.userVetor[i].cep,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: async (data) => {
            const meuEndereco = await this.cepService.consultaCEP(data.cep);
            if (meuEndereco.logradouro == '') {
              this.toast.showToast(meuEndereco.gia);
            } else {
              console.log(data);
              this.fireStore
                .collection('users')
                .doc(this.userVetor[i].uid)
                .update({
                  nome: data.nome,
                  cpf: data.cpf,
                  cep: data.cep,
                  endereco: meuEndereco.logradouro,
                  cidade: meuEndereco.localidade,
                });
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async alertExcluirUsuario(i: number) {
    const alert = await alertController.create({
      header: 'Excluir usuário',
      message: `Deseja excluir o usuário ${this.userVetor[i].nome}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            // ESTA FUNÇÃO ESTÁ FUNCIONANDO.
            // this.fireStore
            //   .collection('users')
            //   .doc(this.userVetor[i].uid)
            //   .delete();

            this.deletarEmail(this.userVetor[i].uid);
          },
        },
      ],
    });
    await alert.present();
  }

  async deletarEmail(uid: any) {
    console.log('deletando email do ' + uid);

    /* FALTA DELETAR O EMAIL DO USUÁRIO
    await this.auth.currentUser.then(async (user:any) => {
      await user.delete();
      await this.fireStore.collection('users').doc(uid).delete();
    }, (erro:any) => {
      console.log(erro);
    }
    );
    */
  }
}
