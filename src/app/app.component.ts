import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Student Beans AU';
  name = 'JONNY DOE';
  onActivate(event){
    window.scroll(0,0);
  }
}
