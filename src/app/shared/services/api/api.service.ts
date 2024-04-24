import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtAuthService } from './jwtauthservice.service';
// import { JwtAuthService } from './jwtauthservice.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  customer_id: any;
  country_no: any;

  private httpClient: HttpClient;

  constructor(private http: HttpClient, private handler: HttpBackend,
    private _jwtAuthService: JwtAuthService
    ) {
    this.getvalues();
    this.httpClient = new HttpClient(handler);

  }

  getvalues() {
    this.customer_id = sessionStorage.getItem('customer_id');
    this.country_no = sessionStorage.getItem('country_no');
  }

  // post_form(body: any): Observable<any> {
  //   return this.http
  //     .post<any>(
  //       `${environment.form}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
  //       body
  //     )
  //     .pipe(
  //       map((m) => {
  //         let data = m.data;
  //         let msg = m.message;
  //         return [data, msg];
  //       })
  //     );
  // }


  get_global_syllabus_details(){
    return this.http.get<any>(
      `${environment.get_global_syllabus_details}`,this._jwtAuthService.getJwtToken()
    )
  }

  // get_tree_data(row_global_course_subject_id:number){
  //   return this.http.get<any>(
  //     `${environment.get_tree_data}?global_course_syllabus_id=${row_global_course_subject_id}`,
  //     this._jwtAuthService.getJwtToken()

  //   )
  // }

  // get_checked_tree_data(row_global_course_subject_id:number){
  //   return this.http.get<any>(
  //     `${environment.get_checked_tree_data}?institutional_course_subject_id=${row_global_course_subject_id}`,this._jwtAuthService.getJwtToken()
  //   )
  // }

  get_tree_view_based_on_global_course_subjectId( body: any) {
    return this.http.post<any>(
     `${environment.get_tree_view_based_on_global_course_subjectId}`, body, this._jwtAuthService.getJwtToken()
     );
   }

   WOW_Flashcards_Relevant_To_Syllabus(body:any){
    return this.http.post<any>(
      `${environment.WOW_Flashcards_Relevant_To_Syllabus}`,body,
      this._jwtAuthService.getJwtToken()

    )
  }
  
  // getWowSyllabusCategory(body:any){
  //   return this.http.post<any>(
  //     `${environment.getWowSyllabusCategory}`,body,
  //     this._jwtAuthService.getJwtToken()

  //   )
  // }

  link(institutional_wow_flashcards_id:number, global_wow_flashcards_id:number, linked_global_wow_type:number){
    return this.http.post<any>(
      `${environment.link}?institutional_wow_flashcards_id=${institutional_wow_flashcards_id}&global_wow_flashcards_id=${global_wow_flashcards_id}&linked_global_wow_type=${linked_global_wow_type}`,null,
      this._jwtAuthService.getJwtToken()
    )
  }

  from_flashcard_token(body: any) {
    return this.http.post<any>(
      `${environment.from_flashcard_token}`,body,this._jwtAuthService.getJwtToken()
    );
  }


  // onGetAppAdministratorList(body: any): Observable<any> {
  //   return this.http.get<any>(
  //     `${environment.get_app_administrator_list}?app_name=${body.app_name}`
  //   );
  // }

}
