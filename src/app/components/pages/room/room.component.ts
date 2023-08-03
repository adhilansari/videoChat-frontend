import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeerService } from 'src/app/services/peer.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit{
  roomName!:string
  currentStream:any
  listUser:Array<any>=[];
  route = inject(ActivatedRoute);
  webSocketService = inject(WebSocketService)
  peerService = inject(PeerService)

  ngOnInit(): void {
    this.checkMediaDevices()
    this.initPeer()
    this.initSocket()
    this.roomName = this.route.snapshot.params['id'];
  }

  initPeer(){
    const {peer} = this.peerService
    peer.on('open',(id:any)=>{
      const body = {
        idPeer:id,
        roomName:this.roomName
      };
      this.webSocketService.joinRoom(body)

    });

    peer.on('call', (callEnter:any)=>{
      callEnter.answer(this.currentStream);
      callEnter.on('stream',(streamRemote:any)=>{
        this.addVideoUser(streamRemote)
      })
    },(err:any) =>{
      console.log('*** ERROR***PEER CALL',err);

    })
  };

  initSocket(){
    this.webSocketService.cbEvent.subscribe((res:any)=>{
      if(res.name=== 'new-user'){
        const {idPeer} = res.data
        console.log(idPeer);

      this.sendCall(idPeer,this.currentStream)
      }
    })
  }

  checkMediaDevices(){
    if(navigator && navigator.mediaDevices){
      navigator.mediaDevices
      .enumerateDevices()
      .then(devices => console.log('Available Media Devices:', devices))
      .catch((error) =>
      console.warn(`Error enumerating device ${error}`)
      );
      navigator.mediaDevices.getUserMedia({
        audio:false,
        video:true
      }).then(stream=>{
        this.currentStream = stream
        this.addVideoUser(stream);
      }).catch(()=>{
        console.log('*** ERROR Not Permission');

      })
    }else{
        console.log("Your browser does not support media devices")
      }
  };

  addVideoUser(stream:any){
    this.listUser.push(stream);
    const unique = new Set(this.listUser);
    this.listUser = [...unique]
  }

  sendCall(idPeer:any,stream:any){
    const newUserCall = this.peerService.peer.call(idPeer,stream);
    if(!!newUserCall){
      newUserCall.on('stream',(userStream:any)=>{
       this.addVideoUser(userStream)
      })
    }
  }

}
