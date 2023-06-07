import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.service
      .getUsers()
      .pipe(take(1))
      .subscribe((users) => {
        this.users = users;
      });
  }
}
