import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { IframeService } from 'src/app/shared/services/iframe/iframe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-global-course',
  templateUrl: './edit-global-course.component.html',
  styleUrls: ['./edit-global-course.component.scss']
})
export class EditGlobalCourseComponent implements OnInit {

  //* --------------------------  Start  -----------------------------------*//

 //* -----------------------  Decorated Methods  --------------------------*//
 @ViewChild('message') message!: ElementRef;
 @ViewChild('content') content!: ElementRef;
 @ViewChild('app_frame', { static: false }) appframe!: ElementRef;

 //* -----------------------  Variable Declaration  -----------------------*//

 // iframeSource: string = 'https://g14.getbiz.app';
 // iframeSource: string = 'https://u31.getbiz.app';
 iframeSource!: string;
 user_id!: number;
 customer_id!: number;
 country_id!: string;
 getster_id!: number;

 //* ---------------------------  Constructor  ----------------------------*//
 constructor(
   // private jwtService: JwtHelperService,
   private _iframeService: IframeService,
   public _dialogRef: MatDialogRef<EditGlobalCourseComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   private _customSpinnerService: CustomSpinnerService
 ) {}
 //* -------------------------  Lifecycle Hooks  --------------------------*//
 async ngOnInit(): Promise<void> {
  //  console.log(this.data,'flashcard');
   this.getster_id = this.data?.getster_id;
   this.user_id = this.data?.user_id;
   this.iframeSource = `${environment.edit_global_popup}`;
     // this.iframeSource = 'http://localhost:4201';
     // this.iframeSource = 'http://localhost:4200/wow-assignments';
   const _data = 1;
   // = this.jwtService.decodeToken(
   //   sessionStorage.getItem('access_token')
   // ).user;

   // this.customer_id = _data.customer_id;
   // this.country_id = _data.country_code_of_user_id;
 }
 ngAfterViewInit(): void {
   this.iframeLoaded();
 }



 //* ----------------------------  APIs Methods  --------------------------*//

 //* --------------------------  Public methods  --------------------------*//
 amt_success:any;
 iframeLoaded() {
   let iframe: HTMLIFrameElement = this.appframe
     .nativeElement as HTMLIFrameElement;
   iframe.src = String(this.iframeSource).toString();
   this._customSpinnerService.open();

   // Send a message to the child iframe
  //  iframe.addEventListener('load', (e) => {
  //    let body = {
  //      // access_token: sessionStorage.getItem('access_token'),
  //      dark: sessionStorage.getItem('dark') ?? true,
  //      customer_id: this.data?.customer_id,
  //      country_id: this.data?.country_id,
  //      transaction_type: this.data?.transaction_type,
  //      debit_entry_amount:this.data?.debit_entry_amount,
  //      transaction_executed_by_user_id: this.data?.transaction_executed_by_user_id,
  //      receiver_wallet_id:this.data?.receiver_wallet_id,
  //      currency:this.data?.currency,
  //      app_name:this.data?.app_name,
  //      time_zone:this.data?.time_zone,
  //      total_debit_amount:this.data?.total_debit_amount
  //    };
    //  console.log("body",this.data?.access_token);

  //    this.sendMessage(body, String(this.iframeSource).toString());
  //    this._customSpinnerService.close();
  //  });

   // Receive a message child to parent iframe
   window.addEventListener('message', (e) => {
    this.sendMessage({access_token:`${this.data?.access_token}`}, String(this.iframeSource).toString());
    this._customSpinnerService.close();
    //  if (e.origin == this.iframeSource) {
    //    if (e.data) {
    //     //  console.log("message from child",e.data);
    //      this.amt_success = e.data;
    //    }
    //  }
   });
 }

 onNoClick(): void {
  this._dialogRef.close();
}

 onclick() {
   if(this.amt_success != null){
     this._dialogRef.close(1);
   } else {
     this._dialogRef.close(0);
   }
 }
 sendMessage(body: any, targetOrigin: string) {
   // Make sure you are sending a string, and to stringify JSON
   let iframeEl = this.appframe.nativeElement as HTMLIFrameElement;
   // window.parent.postMessage(JSON.stringify(body), targetOrigin);

   iframeEl.contentWindow?.postMessage(JSON.stringify(body), targetOrigin);
   // iframeEl.contentWindow.postMessage(body, '*');
 }


 //* ------------------------------ Helper Function -----------------------*//

 //! -------------------------------  End  --------------------------------!//


}
