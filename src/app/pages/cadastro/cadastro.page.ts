import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavegacaoService } from 'src/app/services/navegacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  contaExiste: boolean = false;
  user = {} as User;
  userAtual = {} as User;
  senha1: any;
  senha2: any;
  constructor(
    private firebaseService: FirebaseService,
    private nav: NavegacaoService,
    public alertController: AlertController,
    private toast: ToastService
  ) {}

  ngOnInit() {}

  public realizarCadastro() {
    console.log(this.senha1, this.senha2);

    if (this.senha1 != this.senha2) {
      this.toast.showToast('Senhas não conferem!');
    }

    if (
      !!this.user.nome &&
      !!this.user.email &&
      !!this.user.cep &&
      !!this.user.cpf &&
      !!this.user.cidade &&
      !!this.user.endereco
    ) {
      this.firebaseService.signUp(this.user, this.senha1);
    } else {
      this.toast.showToast(
        'Cadastro não realizado, está faltando informações!'
      );
    }
  }
}
