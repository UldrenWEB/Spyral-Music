import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashScreenComponent implements OnInit {
    
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/startup']);
    }, 3000);
  }
}