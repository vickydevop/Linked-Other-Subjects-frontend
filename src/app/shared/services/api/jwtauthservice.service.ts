/*
https://docs.nestjs.com/providers#services
*/

// import { Injectable } from '@angular/core';

@Injectable()
export class JwtAuthServiceService {}
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, catchError, delay, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtAuthService {
  return!: string;

  constructor(private route: ActivatedRoute) {
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjM4LCJjdXN0b21lcl9pZCI6MTEsImNvdW50cnlfY29kZSI6ImluIiwiY3VzdG9tZXJfc3ViX2RvbWFpbl9uYW1lIjoidGVhbSIsInJlZ2lzdGVyZWRfZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fbmFtZSI6ImJiY2RiIiwidGltZV96b25lX2lhbmFfc3RyaW5nIjoiQXNpYS9Lb2xrYXRhIiwiaXNfZGVmYXVsdF9hY2FkZW1pY195ZWFyX2Zvcm1hdF9zcGFubmluZ190d29fY2FsZW5kYXJfeWVhcnMiOjEsImRlZmF1bHRfYWNhZGVtaWNfeWVhcl9zdGFydF9kYXRlX2FuZF9tb250aCI6IjYvNSIsInNvY2tldF9pZCI6IiIsImVkdWNhdGlvbmFsX2luc3RpdHV0aW9uX2NhdGVnb3J5X2lkIjoibWNRVW5ESDBCZEZKdDc0LFJMTDU1U3B3S29KaGd0SCIsInVzZXJfcmVnaXN0ZXJlZF9jYXRlZ29yaWVzX2lkcyI6IkkxZWpYZkRSc0hWT2NYdSxQeVpDVm5SS0Nnb1NPV0wiLCJ1c2VyX3JlZ2lzdHJhdGlvbl9sb2dpbl9hcHByb3ZhbF9zdGF0dXMiOjMsImNvdW50cnkiOiJ3cyIsInBpbl9jb2RlIjoiNjM1NzUyIiwic3RhdGVfcHJvdmluY2UiOiJUYW1pbCBOYWR1IiwiY2l0eV9kaXN0cmljdF9jb3VudHkiOiJUaXJ1cGF0dHVyIiwiYWRkcmVzc19saW5lXzEiOiJWYW5peWFtYmFkaSIsImFkZHJlc3NfbGluZV8yIjoiVmFuaXlhbWJhZGkiLCJkZWZhdWx0X2N1cnJlbmN5IjoiSU5SIiwiY291cnNlX3N1YmplY3RfdXNlcl9jYXRlZ29yeV9hbGxvY2F0aW9uX2lkIjo3fSwiaWF0IjoxNjkwNTIyODA3LCJleHAiOjEuNmUrMjZ9.8SmTG8TdTeSUjAdFWoeXdhBi2A53J2Ef-ynhWlxS0gw'
    // sessionStorage.setItem('access_token',
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiIxIiwiY3VzdG9tZXJfaWQiOjEwNSwiY291bnRyeV9jb2RlIjoiaW4iLCJjdXN0b21lcl9zdWJfZG9tYWluX25hbWUiOiJ2ayIsInJlZ2lzdGVyZWRfZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fbmFtZSI6ImN2aWNreSIsInRpbWVfem9uZV9pYW5hX3N0cmluZyI6IkFzaWEvQ2FsY3V0dGEiLCJhcHBfbmFtZSI6InZrIiwiZGVmYXVsdF9jdXJyZW5jeV9zaG9ydGZvcm0iOiJJTlIiLCJhY2NvdW50aW5nX3N0YW5kYXJkc19pZCI6bnVsbCwiaXNfZGVmYXVsdF9hY2FkZW1pY195ZWFyX2Zvcm1hdF9zcGFubmluZ190d29fY2FsZW5kYXJfeWVhcnMiOjEsImRlZmF1bHRfYWNhZGVtaWNfeWVhcl9zdGFydF9kYXRlX2FuZF9tb250aCI6IjYvMTIiLCJzb2NrZXRfaWQiOiIiLCJ1c2VyX2NhdGVnb3J5X3R5cGUiOiI0IiwiZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fY2F0ZWdvcnlfaWQiOiI2cmNaZzFNYUVPTlZTUFoiLCJ1c2VyX3JlZ2lzdGVyZWRfY2F0ZWdvcmllc19pZHMiOiJ3M1lveEJKcFVIcFNDZHUiLCJ1c2VyX3JlZ2lzdHJhdGlvbl9sb2dpbl9hcHByb3ZhbF9zdGF0dXMiOjMsImNvdW50cnkiOiJpbiIsInBpbl9jb2RlIjoicnR5cnkiLCJzdGF0ZV9wcm92aW5jZSI6IlRhbWlsIE5hZHUiLCJjaXR5X2Rpc3RyaWN0X2NvdW50eSI6IlRpcnVwYXR0dXIiLCJhZGRyZXNzX2xpbmVfMSI6IlZhbml5YW1iYWRpIiwiYWRkcmVzc19saW5lXzIiOiJWYW5peWFtYmFkaSIsImN1c3RvbWVyX3R5cGUiOjAsImluc3RpdHV0aW9uYWxfd293X2ZsYXNoY2FyZHNfaWQiOjF9LCJpYXQiOjE3MDI1NTE4NjQsImV4cCI6MjkwMjU1MTg2NH0.5pzrRCoAIaJz-VwXl85OKwO_6vJ0lhuBFPPwICuQhcU'
    //  );
    this.route.queryParams.subscribe(
      (params) => (this.return = params['return'] || '/')
    );
  }

  getJwtToken() {

    let HTTP_OPTIONS = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer '+sessionStorage.getItem('access_token') as any,
      }),
    };

    return HTTP_OPTIONS;
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }
}
