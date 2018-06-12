import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    /* Redirect users to returnUrl after log them in */
    this.auth.user$.subscribe(user => {
      if (user) {
        //  save new user or changed user credentials;
        //  using google auth: must update user, because user can change name on google account
        this.userService.save(user);

        // returnUrl, saved in login method, to return user after redirection from 3part auth providers, like google auth
        const returnUrl = localStorage.getItem('returnUrl');

        // redirect auth user
        this.router.navigateByUrl(returnUrl).then(/* do something after redirection */);
      }
    });
  }
}
