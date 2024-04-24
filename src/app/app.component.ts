// import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { StyleManager } from './shared/services/style-manager/style-manager.service';
// import { IframeService } from './shared/services/iframe/iframe.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent implements OnInit, AfterViewInit {
//   constructor(
//     private _iframeService: IframeService,
//     private styleManager: StyleManager,
//     private _cdf: ChangeDetectorRef
//   ) {}
//   baseOrigin: string = 'http://localhost:4200';
//   isLoaded: boolean = false;

//   ngAfterViewInit(): void {
//     window.addEventListener('message', (e:any) => {
//       // console.log(e)
//       if (e.origin == this.baseOrigin) {
//       let parentData = JSON.parse(e.data);
//       let parser = JSON.parse(e?.data);
//       // console.log(sessionStorage.setItem('access_token',parser?.access_token),'aoocomponen')
//       sessionStorage.setItem('access_token',parser?.access_token);
//         this._iframeService.getIframeMessages(parentData);
//         for (const key in parentData) {
//           if (Object.prototype.hasOwnProperty.call(parentData, key)) {
//             const value = parentData[key];
//             // sessionStorage.setItem(key, value);
//           }
//         }
//         this.isLoaded = true;
//         this._cdf.detectChanges();
//         // this.sendMessage('Received From Child', e.origin);
//       }
//     });

//     window.addEventListener('load', (e) => {
//       this.sendMessage('Received From Child', this.baseOrigin);
//     });
//   }

//   sendMessage(body: any, targetOrigin: string) {
//     // Make sure you are sending a string, and to stringify JSON
//     window.parent.postMessage(JSON.stringify(body), targetOrigin);
//   }

//   ngOnInit() {
//     // sessionStorage.setItem('access_token',
//     // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjM4LCJjdXN0b21lcl9pZCI6MTEsImNvdW50cnlfY29kZSI6ImluIiwiY3VzdG9tZXJfc3ViX2RvbWFpbl9uYW1lIjoidGVhbSIsInJlZ2lzdGVyZWRfZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fbmFtZSI6ImJiY2RiIiwidGltZV96b25lX2lhbmFfc3RyaW5nIjoiQXNpYS9Lb2xrYXRhIiwiaXNfZGVmYXVsdF9hY2FkZW1pY195ZWFyX2Zvcm1hdF9zcGFubmluZ190d29fY2FsZW5kYXJfeWVhcnMiOjEsImRlZmF1bHRfYWNhZGVtaWNfeWVhcl9zdGFydF9kYXRlX2FuZF9tb250aCI6IjYvNSIsInNvY2tldF9pZCI6IiIsImVkdWNhdGlvbmFsX2luc3RpdHV0aW9uX2NhdGVnb3J5X2lkIjoibWNRVW5ESDBCZEZKdDc0LFJMTDU1U3B3S29KaGd0SCIsInVzZXJfcmVnaXN0ZXJlZF9jYXRlZ29yaWVzX2lkcyI6IkkxZWpYZkRSc0hWT2NYdSxQeVpDVm5SS0Nnb1NPV0wiLCJ1c2VyX3JlZ2lzdHJhdGlvbl9sb2dpbl9hcHByb3ZhbF9zdGF0dXMiOjMsImNvdW50cnkiOiJ3cyIsInBpbl9jb2RlIjoiNjM1NzUyIiwic3RhdGVfcHJvdmluY2UiOiJUYW1pbCBOYWR1IiwiY2l0eV9kaXN0cmljdF9jb3VudHkiOiJUaXJ1cGF0dHVyIiwiYWRkcmVzc19saW5lXzEiOiJWYW5peWFtYmFkaSIsImFkZHJlc3NfbGluZV8yIjoiVmFuaXlhbWJhZGkiLCJkZWZhdWx0X2N1cnJlbmN5IjoiSU5SIiwiY291cnNlX3N1YmplY3RfdXNlcl9jYXRlZ29yeV9hbGxvY2F0aW9uX2lkIjo3fSwiaWF0IjoxNjkxMzk4MDc3LCJleHAiOjEuNmUrMjZ9.LuAfShu4cv8Zy-59QVEX6uRvvDDEqBRbNz40CQb_et4'
//     //  );
//     this._iframeService.getIframeEmit.subscribe((res) => {
//       // this.toggleDarkTheme();
//       // this.styleManager.toggleDarkTheme();
//     });
//     this._iframeService.sendIframeEmit.subscribe((res) => {
//       // console.log('Child', res);
//     });
//   }

//   ngOnDestroy() {
//     // if (this.mySubscription) {
//     //   this.mySubscription.unsubscribe();
//     // }
//   }
// }
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IframeService } from './shared/services/iframe/iframe.service';
import { StyleManager } from './shared/services/style-manager/style-manager.service';
import { ApiService } from './shared/services/api/api.service';
declare var GoogleTranslate: Function;
export let globalShareBaseOrigin: string;
export let baseOriginUrl:string;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  // _iframeService: any;
  // styleManager: any;
  // _cdf: any;
  // @HostListener('document:mousemove')
  // @HostListener('document:click')
  // @HostListener('document:keydown')
  // resetIdleTimeout() {
  //   this.sendMessage({ is_idle_active: false }, this.baseOrigin);
  // }
  constructor(
    private _iframeService: IframeService,
    private styleManager: StyleManager,
    private _cdf: ChangeDetectorRef,
    private _apiService: ApiService
  ) {
    this.baseOrigin = window.location.ancestorOrigins[0];
    // this.baseOrigin = window.location.ancestorOrigins[0];
    globalShareBaseOrigin = this.baseOrigin;
    baseOriginUrl= this.baseOrigin
    // globalShareBaseOrigin = this.baseOrigin;
  }

  // baseOrigin: string = 'http://u3.getster.tech';
  baseOrigin!: string;
  isLoaded: boolean = false;

  ngOnInit() {
    this._iframeService.getIframeData.subscribe({
      next: (next: any) => {
        if (next) {
          this.styleManager.toggleDarkTheme(next.dark ?? false);
          setTimeout(() => {
            GoogleTranslate(next.googleTranslate);
          }, 1000);
        }
      },
    });
  }
  ngAfterViewInit(): void {
    this.iframeLoaded();
  }

  ngOnDestroy() {
    sessionStorage.clear();
  }

  iframeLoaded() {
    window.addEventListener('message', (e) => {
      // console.log(e,'iframe')
      // console.log(this.baseOrigin,'this.baseOrigin')
      // console.log(e.origin,'e.origin')
      if (e.origin == this.baseOrigin) {
        let parentData = JSON.parse(JSON.parse(JSON.stringify(e.data)));
              let parser = JSON.parse(e?.data);
              console.log(parser,'parser')
              // console.log(sessionStorage.setItem('access_token',parser?.access_token),'aoocomponen')
              sessionStorage.setItem('access_token',parser?.access_token);
        for (const key in parentData) {
          // console.log(key, 'sdf');
          if (Object.prototype.hasOwnProperty.call(parentData, key)) {
            const value = parentData[key];
            sessionStorage.setItem(key, value);
          }
        }
        this.isLoaded = true;
        this.sendMessage(false, baseOriginUrl);
        this._iframeService.sendIframeData(parentData);
        this._cdf.detectChanges();
        // this.sendMessage('Received From Child', e.origin);
      }
    });

    // Send data to parent message first time
    window.addEventListener('load', (e) => {
      this.sendMessage('Connected Successful.', this.baseOrigin);
      this._cdf.detectChanges();
    });
  }
  sendMessage(body: any, targetOrigin: string) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(JSON.stringify(body), targetOrigin);
  }
}
