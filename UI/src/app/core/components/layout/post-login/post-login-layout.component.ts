import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-post-login-layout',
  templateUrl: './post-login-layout.component.html',
  styleUrls: ['./post-login-layout.component.css'],
})
export class PostLoginLayoutComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.userValue;
  }
}
