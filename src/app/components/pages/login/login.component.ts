import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConstant } from 'src/app/core/constants/CommonConstant';
import { ILogin } from 'src/app/core/Models/interfaces/ILogin';
import { IUserResponse } from 'src/app/core/Models/interfaces/IUser';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginObj: ILogin = {
    email: '',
    password: '',
  };
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {}
  onLogin() {
    this.userService.login(this.loginObj).subscribe(
      (res: any) => {
        if (res.message == CommonConstant.ApiMessage.ValidUser) {
          let userResponse: IUserResponse = {
            id: res.data[0].id,
            name: res.data[0].name,
            email: res.data[0].email,
            phoneNumber: res.data[0].phoneNumber,
            roles: res.data[0].roles,
            jwtToken: res.data[1].jwtToken,
            refreshToken: res.data[1].refreshToken,
          };
          localStorage.setItem(
            'jwtToken',
            userResponse.jwtToken == null ? '' : userResponse.jwtToken
          );
          localStorage.setItem(
            'refreshToken',
            userResponse.refreshToken == null ? '' : userResponse.refreshToken
          );
          localStorage.setItem('userData', JSON.stringify(userResponse));

          if (userResponse.roles[0] === 'Admin') {
            location.href = '/index';
          } else if (userResponse.roles[0] === 'User') {
            location.href = '/index';
          }
        } else if (
          res.message == CommonConstant.ApiMessage.IncorrectUserOrPassword
        ) {
          alert(res.message);
        } else if (res.message == CommonConstant.ApiMessage.ValidationFailed) {
          let messageAlert: String = res.message + ':\n\n';
          for (const validation of res.data) {
            messageAlert =
              messageAlert + ' * ' + validation.errorMessage + '\n';
          }
          alert(messageAlert);
        } else {
          alert('Error ' + res.message);
        }
        //just redirect fail or pass no matters
        window.location.href = '/dashboard';
      },
      (error) => {
        alert('Error: ' + error);
      }
    );
  }
}
