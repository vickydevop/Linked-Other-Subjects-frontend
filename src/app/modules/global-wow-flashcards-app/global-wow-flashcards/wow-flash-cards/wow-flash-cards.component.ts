import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { IframeService } from 'src/app/shared/services/iframe/iframe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wow-flash-card',
  templateUrl: './wow-flash-cards.component.html',
  styleUrls: ['./wow-flash-cards.component.scss']
})
export class WowFlashCardsComponent implements OnInit {

  //* --------------------------  Start  -----------------------------------*//
  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild('message') message!: ElementRef;
  @ViewChild('content') content!: ElementRef;
  @ViewChild('app_frame', { static: false }) appframe!: ElementRef;
  //* -----------------------  Variable Declaration  -----------------------*//
  iframeSource!: string;
  user_id!: number;
  customer_id!: number;
  country_id!: string;

  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public _dialogRef: MatDialogRef<WowFlashCardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _customSpinnerService: CustomSpinnerService
  ) { }
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  async ngOnInit(): Promise<void> {
    this.user_id = this.data?.user_id;
    this.iframeSource = `${environment.access_wow_flashcards}`;
  }
  ngAfterViewInit(): void {
    this.iframeLoaded();
  }
  //* --------------------------  Public methods  --------------------------*//
  amt_success: any;
  iframeLoaded() {
    let iframe: HTMLIFrameElement = this.appframe
      .nativeElement as HTMLIFrameElement;
    iframe.src = String(this.iframeSource).toString();
    this._customSpinnerService.open();
    console.log(this.data?.access_token, 'this.data?.access_token')
    // Receive a message child to parent iframe
    window.addEventListener('message', (e) => {
      this.sendMessage({ access_token: `${this.data?.access_token}` }, String(this.iframeSource).toString());
      this._customSpinnerService.close();
    });
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

  onclick() {
    if (this.amt_success != null) {
      this._dialogRef.close(1);
    } else {
      this._dialogRef.close(0);
    }
  }
  sendMessage(body: any, targetOrigin: string) {
    let iframeEl = this.appframe.nativeElement as HTMLIFrameElement;
    iframeEl.contentWindow?.postMessage(JSON.stringify(body), targetOrigin);
  }
  //! -------------------------------  End  --------------------------------!//
}
