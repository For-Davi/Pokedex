import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent {
  
  constructor(private router: Router){}

  goFeed():void{
    this.router.navigate(['feed'])
  }

}
