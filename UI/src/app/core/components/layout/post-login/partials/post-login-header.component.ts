import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-post-login-header',
  templateUrl: './post-login-header.component.html',
  styleUrls: ['./post-login-header.component.css'],
})
export class PostLoginHeaderComponent implements OnInit {
  @Input() userType: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
