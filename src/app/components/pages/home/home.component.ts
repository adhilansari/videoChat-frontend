import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
router = inject(Router)

goToRoom = ()=>{
  this.router.navigate(['/',uuidv4()])
}

}
