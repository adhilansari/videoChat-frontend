import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RoomComponent } from './components/pages/room/room.component';
import { VideoPlayerComponent } from './components/pages/video-player/video-player.component';
import { MenuBottomComponent } from './components/menu-bottom/menu-bottom.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {withCredentials:true} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    VideoPlayerComponent,
    MenuBottomComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
