import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent {
  
  public audioVideo: boolean = true
  public statusAudio : number = 1

  constructor(private router: Router){}

  goFeed():void{
    this.router.navigate(['feed'])
  }

  changeVolumeOn():void{
    console.log('on');
    this.audioVideo = false
    this.statusAudio = 0
  }

  changeVolumeOff():void{
    console.log('off');
    this.audioVideo = true
    this.statusAudio = 1
  }

}
