import { Component } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FEproblem1';

  constructor(private commonService:CommonService){

  }
  ngOnInit() {
    this.getToken();
  }
  setToken(token) {
    localStorage.setItem("kingShan-token", token);
  }
  getToken() {
    this.commonService.getToken().subscribe(res => {
      this.setToken(res.token);
    })
  }
}
