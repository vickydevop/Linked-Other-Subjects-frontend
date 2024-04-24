import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
// import { UserProfileCardComponent } from 'src/app/modules/launch-app/user-profile/user-profile-card/user-profile-card.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-administrator-list',
  templateUrl: './app-administrator-list.component.html',
  styleUrls: ['./app-administrator-list.component.scss'],
})
export class AppAdministratorListComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  appAdministratorList: any[] = [];
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private cdr:ChangeDetectorRef,
    public _dialogRef: MatDialogRef<AppAdministratorListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {



  }
  onNoClick(): void {
    this._dialogRef.close();
  }
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void { 
          
    this.appAdministratorList = this.data;
    console.log(this.appAdministratorList,"admin data");
    this.cdr.detectChanges();
  
  }


  //* ----------------------------  APIs Methods  --------------------------*//

  
  //* --------------------------  Public methods  --------------------------*//

  getUSerProfileImage(user_id: number) {
    const url = environment.ceph_URL + `/in-${this.appAdministratorList[0].customer_id}/${user_id}.png`;
    console.log(url,"url");
    return url;
    
  }

  openGetsterProfile(data: any) {
    let user_id: number = data.user_id,
      customer_id: number = data.customer_id,
      country_id: string = data.country_code;

    let config: MatDialogConfig = {
      disableClose: true,
      minWidth: 'auto',
      // minWidth: '400px',
      // minHeight: 'calc(100vh - 500px)',
      minHeight: '450px',
      width: '288px',
      data: {
        user_id,
        customer_id,
        country_id,
      },
    };
    // const dialogRef = this.dialog.open(UserProfileCardComponent, config);
  }
  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//
}
