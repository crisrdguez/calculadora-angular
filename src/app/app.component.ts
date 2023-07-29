import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Proyecto Calculadora';

  screen = "0"; //[(ngModel)]="screen"
  currentValue='';

  //funcion
  displayNumber(value:string){
    this.currentValue = this.currentValue + value;
    this.screen = this.currentValue;
  }

  /*
  equals(){
    this.screen = eval(this.currentValue);
    this.currentValue=this.screen;
  }*/

  equals() {
    try {
      this.screen = eval(this.currentValue); // Utilizamos el servicio eval() de JavaScript
      this.currentValue = this.screen.toString();
    } catch (error) {
      this.screen = 'Error';
      this.currentValue = '';
    }
  }


  clear(){
    this.currentValue='';
    this.screen='0';
  }

  back(){
    this.currentValue = this.currentValue.slice(0,-1);
    this.screen=this.currentValue;
    if(this.currentValue==''){
      this.screen='0';
    }
    
  }

  calcvalue(solve:any){
    if(solve.charAt(0)=='0'){
      solve = solve.slice(1,);
    }
    this.screen = eval(solve);
  }


  ngOnInit(): void {
      
  }
}
