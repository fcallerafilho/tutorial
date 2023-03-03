import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavegacaoService } from 'src/app/services/navegacao.service';
import { CepService } from 'src/app/services/cep.service';

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
    private toast: ToastService,
    private cepService: CepService
  ) {}

  ngOnInit() {}

  public realizarCadastro() {
    console.log(this.senha1, this.senha2);

    if (this.senha1 == this.senha2) {
      if (
        !!this.user.nome &&
        !!this.user.email &&
        !!this.user.cep &&
        !!this.user.cpf &&
        !!this.user.cidade &&
        !!this.user.endereco
      ) {
        this.user.nome = this.user.nome
          .split(' ')
          .map((name) => {
            return name[0].toUpperCase() + name.substring(1).toLowerCase();
          })
          .join(' ');
        let resp = this.firebaseService
          .signUp(this.user, this.senha1)
          .then(() => {
            if (resp != null) {
              console.log('cadastrou');
              this.nav.navegarPara('home');
            }
          })
          .catch(() => {
            this.toast.showToast('Erro ao cadastrar!');
          });
      } else {
        this.toast.showToast(
          'Cadastro não realizado, está faltando informações!'
        );
      }
    } else {
      this.toast.showToast('Conflito entre as senhas digitadas!');
    }
  }

  async buscarCEP(cep: string) {
    const meuEndereco = await this.cepService.consultaCEP(cep);
    console.log(meuEndereco);

    if (meuEndereco.logradouro == '') {
      this.toast.showToast(meuEndereco.gia);
    } else {
      this.user.endereco = meuEndereco.logradouro + ', ' + meuEndereco.bairro;
      this.user.cidade = meuEndereco.localidade + ' - ' + meuEndereco.uf;
    }
  }
}
