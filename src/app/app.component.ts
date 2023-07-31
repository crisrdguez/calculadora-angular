import { Component, OnInit, ViewChild } from '@angular/core';
import * as math from 'mathjs'; // Importa math.js

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Proyecto Calculadora';

  screen = "0"; //[(ngModel)]="screen"
  currentValue='';
  ultimoInputOperador = false;


  displayNumber(value: string) {
    if (this.screen === '0' || this.screen === 'Error') {
      this.screen = value;
    } else {

        this.screen += value;
    }   

        this.ultimoInputOperador=false;
  }

  displayOperator(value: string) {
    if (!this.ultimoInputOperador && this.screen !== 'Error') {
      this.screen += value;
      this.ultimoInputOperador = true;

    }
  }

  

  //evalua la expresion y muestra el resultado
  equals() {
    try {
      this.currentValue = this.screen;
      const result = math.evaluate(this.screen);
      this.screen = result.toString();

      //Agregamos la operacion y el resultado al historial
    const operation = this.currentValue + ' = ' + result;
    this.operationHistory.push(operation);

    // Reiniciar currentValue para una nueva operación
    this.currentValue = '';

    this.ultimoInputOperador=false;



    } catch (error) {
      this.screen = 'Error';
      this.currentValue = '';
      this.ultimoInputOperador=false;
    }
  }


  clear(){
    this.currentValue='';
    this.screen='0';
    this.ultimoInputOperador=false;
  }


  // Elimina el ultimo caracter de la pantalla
  back() {
    if (this.screen !== 'Error') {
      this.screen = this.screen.slice(0, -1) || '0';
      this.ultimoInputOperador = this.esUltCaracterOperador();
    }
  }

  /**La función includes() se utiliza para verificar si un elemento está presente en un array. 
   * En este caso, se verifica si el último carácter de this.screen está presente en el array operators. 
   * Si es así, significa que el último carácter es un operador matemático, y la función devolverá true. Si no, devolverá false. */
  esUltCaracterOperador() {
    const operators = ['+', '-', '*', '/'];
    return operators.includes(this.screen.slice(-1));
  }

  calcvalue(solve: any) {
    try {
      const result = math.evaluate(solve);
      this.screen = result.toString();
    } catch (error) {
      this.screen = 'Error';
    }
    this.ultimoInputOperador=false;
  }


  //Historial de operaciones
  operationHistory:string[]=[];

  clearHistory(){
    this.operationHistory = [];
  }


  ngOnInit(): void {
      
  }
}
