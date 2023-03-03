import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import {
  NgxViacepService,
  Endereco,
  CEPError,
  CEPErrorCode,
} from '@brunoc/ngx-viacep';
import { catchError, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CepService {

  enderecoVazio = {
    cep: '',
    complemento: '',
    gia: '',
    ibge: '',
    localidade: '',
    logradouro: '',
    uf: '',
    unidade: '',
    bairro: '',
  };

  constructor(private viacep: NgxViacepService, toast: ToastController) {}


  /* FUNÇÃO QUE O SITE RECOMENDA. Consegui puxar o endereço, mas não consegui retornar ele na página de cadastro.
  async consultaCEP(cep: string) {
    await this.viacep
      .buscarPorCep(cep)
      .pipe(
        catchError((error: CEPError) => {
          // Ocorreu algum erro :/
          console.log(error.message);
          return EMPTY;
        })
      )
      .subscribe((endereco: Endereco) => {
        console.log(endereco);
        return endereco;
      }
    );
  }
  */

  async consultaCEP(cep: string): Promise<Endereco> {
    try {
      const endereco = await firstValueFrom(this.viacep.buscarPorCep(cep));
      return endereco;
    } catch (error) {
      console.log(error);
      this.enderecoVazio.gia = String(error);
      return this.enderecoVazio;
    }
  }
}
