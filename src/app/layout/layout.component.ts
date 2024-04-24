import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../shared/dialogs/login/login.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }
  headerPosition: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.headerPosition = true;
    } else {
      this.headerPosition = false;
    }
  }




  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    const getToken: any = sessionStorage.getItem('access_token');
    const tokenPayload = getToken.split('.')[1];
    const decodedToken = JSON.parse(atob(tokenPayload));
    if (decodedToken.user.user_registration_login_approval_status == 3) {
      this.router.navigateByUrl('login-page');
    } else {
      this.checkGetsterCategoryId();
    }
  }

  checkGetsterCategoryId() {
    const dialogRef = this.dialog
      .open(LoginComponent, {
        disableClose: true,
        width: '450px',
        // height: '250px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.router.navigateByUrl('login-page');
          console.log(sessionStorage.getItem('name'));
        }
      });
  }}
