import { User } from './../interfaces/user';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BuscaCEPService } from '../services/busca-cep.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userVetor: User[] = [];

  cep: string = '';

  constructor(
    private fireStore: AngularFirestore,
    private buscaCEP: BuscaCEPService
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

  async verificarCEP(cep: string) {
    console.log(cep);
    const enderecoColocado = await this.buscaCEP.consultaCEP(cep);
    console.log(enderecoColocado);
    console.log(enderecoColocado.logradouro);

  }
}
