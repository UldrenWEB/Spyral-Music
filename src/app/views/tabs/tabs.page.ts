import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/AuthServices';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private authService: AuthService) {}

  userRol: number = 2;
  
  ngOnInit(): void {
    this.userRol = this.authService.getUserRole();
  }

  

}
