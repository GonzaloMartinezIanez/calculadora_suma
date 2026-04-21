import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Calculadora Angular');
  
  numeros: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  actual: string[] = [];
  nuevoNumero: boolean = true;
  simbolo: boolean = false;
  modoDos: boolean = true;
  textoAlternar = "Alternar modo"

  agregarNumero(num: string): void{
    const totalDigitos = this.actual.reduce((total, numero) => total + numero.length, 0);
    if(totalDigitos + this.actual.length >= 12){
      return;
    }

    if(this.nuevoNumero){
      this.actual.push(num);
      this.nuevoNumero = false;
    }else{
      this.actual[this.actual.length - 1] = this.actual[this.actual.length - 1] + num
    }
  }

  printActual(): string{
    if(this.simbolo){
      this.simbolo = false;
      return this.actual.join('+') + "+";  
    }
    else    
      return this.actual.join('+');    
  }

  botonSumar(): void{
    if(this.actual.length === 0){
      this.actual.push("0");
    }

    if(this.modoDos && this.actual.length === 2){
      return;
    }
    this.nuevoNumero = true;
    this.simbolo = true;    
  }

  botonIgual(): void{
    const resultado = this.actual.reduce((total, numero) => total + parseInt(numero), 0);
    this.actual = [resultado.toString()];
    this.nuevoNumero = false;
  }

  limpiar(): void{
    this.actual = [];
    this.nuevoNumero = true;
  }

  alternarModo(): void{
    this.modoDos = !this.modoDos;
    if(this.modoDos){
      alert("Ahora solo puedes sumar dos números.");
      this.textoAlternar = "Sumar dos";
    }
    else{
      alert("Ahora puedes sumar multiples números.");
      this.textoAlternar = "Sumar varios";
    }
  }
}
