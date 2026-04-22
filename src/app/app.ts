import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Calculadora Angular');
  
  numeros: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]; // Array para parametrizar los botones
  actual: string[] = []; // Números a pintar en el resultado de la calculadora
  nuevoNumero: boolean = true; // Si es verdadero, el siguiente número se añade como uno nuevo
                               // Pero si es falso, se añade como un dígito al final del último número
  simbolo: boolean = false; // Variable que controla cuando se pulsa el botón + y pintar el símbolo

  // Como la calculadora permite sumar dos números o múltiples, estas variables lo determinarán
  modoDos: boolean = true;
  textoAlternar = "Alternar modo"

  // Se llama cada vez que se hace click sobre un número de la interfaz
  agregarNumero(num: string): void{
    // Calcular cuantos dígitos lleva la operación junto a los símbolos de +
    // De esta forma no se desbordará
    const total = this.getTotalDigitos() + this.actual.length;
    // Evitar que se añadan más dígitos si ya hay 12
    if(total >= 12){
      return;
    }

    // Determinar si es un número nuevo o un dígito del último número
    if(this.nuevoNumero){
      this.actual.push(num);
      this.nuevoNumero = false;
    }else{
      this.actual[this.actual.length - 1] = this.actual[this.actual.length - 1] + num
    }
  }

  // Actualiza el resultado en pantalla cada vez que se produce una actualización
  printActual(): string{
    if(this.simbolo){
      this.simbolo = false;
      return this.actual.join('+') + "+";  
    }
    else    
      return this.actual.join('+');    
  }

  // Añadir el símbolo de suma a la operación
  botonSumar(): void{
    // Si no hay ningún número, se añade 0 y el símbolo de suma
    if(this.actual.length === 0){
      this.actual.push("0");
    }

    // Calcular cuantos dígitos lleva la operación junto a los símbolos de +
    const total = this.getTotalDigitos() + this.actual.length;
    if(total >= 12){
      return;
    }

    // Permitir si se quiere sumar dos o más números
    if(this.modoDos && this.actual.length === 2){
      return;
    }

    this.nuevoNumero = true;
    this.simbolo = true;    
  }

  // Realizar la operación y mostrar el resultado
  botonIgual(): void{
    const resultado = this.actual.reduce((total, numero) => total + parseInt(numero), 0);
    this.actual = [resultado.toString()];
    this.nuevoNumero = false;
  }

  // Botón que limpia el cálculo
  limpiar(): void{
    this.actual = [];
    this.nuevoNumero = true;
  }

  getTotalDigitos(): number{
    return this.actual.reduce((total, numero) => total + numero.length, 0);
  }

  // Cambiar el modo y el texto del botón para cambiar de modo
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
