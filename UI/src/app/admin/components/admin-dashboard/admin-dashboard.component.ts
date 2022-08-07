import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/user-model';

const USER_DATA: IUser[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    userId: 'john_doe',
    email: 'john_doe@user.com',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    userId: 'jane_doe',
    email: 'jane_doe@user.com',
  },
];

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  selectedTab: string = 'USERS';
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource = USER_DATA;
  constructor(private activateRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.selectedTab = params['tab'];

      this.router.navigate([], { queryParams: {} });
    });
  }
}
