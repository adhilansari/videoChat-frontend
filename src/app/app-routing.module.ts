import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { RoomComponent } from './components/pages/room/room.component';

const routes: Routes = [
  {path:'',component:HomeComponent,},
  {path:':id',component:RoomComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
