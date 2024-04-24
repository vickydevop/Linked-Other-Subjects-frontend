import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatRadioButton } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { DateTime } from 'luxon';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { WowFlashCardsComponent } from '../wow-flash-cards/wow-flash-cards.component';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { baseOriginUrl } from 'src/app/app.component';

@Component({
  selector: 'app-wow-resource-table',
  templateUrl: './wow-resource-table.component.html',
  styleUrls: ['./wow-resource-table.component.scss'],
})
export class WowResourceTableComponent implements OnInit {
  @Input() receive_data_to_table: any;

  //* --------------------------  Start  -----------------------------------*//
  // ELEMENT_DATA: PeriodicElement[] = [];
  @Input('checkData') checkData: any;
  sort_value: any;
  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild('radio') radio!: MatRadioButton;

  //* -----------------------  Variable Declaration  -----------------------*//
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  disableBtn: boolean = true;

  institutional_wow_flashcards_id: any;

  public is_disable: boolean = true;
  //* ---------------------------  Constructor  ----------------------------*//
  firstFormGroup!: UntypedFormGroup;
  public rating2: any[] = [];
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _apiService: ApiService,
    private dialog: MatDialog,
    private _spinner: CustomSpinnerService,
    private _snackBar: SnackBarService
  ) {
    this.firstFormGroup = this._formBuilder.group({
      institution: ['', Validators.required],
    });

    //
  }

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  decodedToken: any;
  based_on_id: any;
  public linked_global_wow_type: any;
  ngOnInit(): void {
    // this.loadData();
    const getToken: any = sessionStorage.getItem('access_token');
    const tokenPayload = getToken.split('.')[1];
    this.decodedToken = JSON.parse(atob(tokenPayload));
    if (this.decodedToken.user?.institutional_wow_video_id != null) {
      this.based_on_id = this.decodedToken.user?.institutional_wow_video_id
      this.linked_global_wow_type = 0;
    } else if (this.decodedToken.user?.institutional_wow_resource_id != null) {
      this.based_on_id = this.decodedToken.user?.institutional_wow_resource_id
      this.linked_global_wow_type = 3;
    } else if (this.decodedToken.user?.institutional_wow_flashcards_id != null) {
      this.based_on_id = this.decodedToken.user?.institutional_wow_flashcards_id
      this.linked_global_wow_type = 1;
    }
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  response_id: any;

  protected ngOnChanges() {
    console.log('sy', this.receive_data_to_table);
    if (this.receive_data_to_table?.syllabus_ids?.length > 0) {
      this.WOW_Flashcards_Relevant_To_Syllabus();
      this.firstFormGroup.controls['institution']?.enable;
    } else {
      this.firstFormGroup.controls['institution']?.disable;
      this.dataSource.data = [];
      this.is_disable = true;
    }
  }

  shw_ceph_img = (ev: any) => {
    return `${environment.ceph_URL}/${this.decodedToken.user?.country_code}-${this.decodedToken.user?.customer_id}/${ev}`;
  }

  protected WOW_Flashcards_Relevant_To_Syllabus() {
    this._spinner.open();
    this._apiService.WOW_Flashcards_Relevant_To_Syllabus(this.receive_data_to_table).subscribe({
      next: (res: any) => {
        this._spinner.close();
        // console.log(res,'_spinner');
        if(res.data.length>0){
          this.dataSource.data = res.data;
        }else{
          this._snackBar.success('Data Not Found');
        }
      }, error: () => {
        this._spinner.close();
      }
    })
  }

  protected link() {
    console.log(this.based_on_id, 'based_on_id')
    this._apiService.link(this.based_on_id, this.global_wow_flashcards_id, this.linked_global_wow_type)
      .subscribe({
        next: (res: any) => {
          // console.log(res,'ff')
          if (res.statusCode == 201) {
            this.WOW_Flashcards_Relevant_To_Syllabus();
            this.is_disable = true;
            this.sendMessage(true, baseOriginUrl);
            this._snackBar.success('Data Linked Successfully');
          } else {
            this.sendMessage(false, baseOriginUrl);
            this._snackBar.success('Error While Linking a Data');
          }
        }
      })

    //   (res) => {
    //   this._snackbar.success('Data Inserted Successfully');
    //   this.getWOWResourcesRelevantToSyllabus();
    //   this.is_disable = true;
    // });
  }

  sendMessage(body: any, targetOrigin: string) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(JSON.stringify(body), targetOrigin);
  }

  public global_wow_flashcards_id: any;
  // select row from table
  flashcard_token: any;
  row: any;
  selectRow(element: any) {
    // console.log(element, 'as');
    this.row = element;
    this.global_wow_flashcards_id = element.global_wow_flashcards_id;
    this.institutional_wow_flashcards_id = element.institutional_wow_flashcards_id;
    // console.log(this.row, 'row');
    this.is_disable = false;
    let data: any = {
      country_code: this.decodedToken.user?.country_code,
      customer_id: this.decodedToken.user?.customer_id,
      user_id: this.decodedToken.user?.user_id,
      time_zone_iana_string: this.decodedToken.user?.time_zone_iana_string,
      institutional_wow_flashcards_id: element?.institutional_wow_flashcards_id,
      global_wow_flashcards_id: null,
      address_line_1: this.decodedToken.user?.address_line_1,
      address_line_2: this.decodedToken.user?.address_line_2,
      city_district_county: this.decodedToken.user?.city_district_county,
      state_province: this.decodedToken.user?.state_province,
      pin_code: this.decodedToken.user?.pin_code,
      course_subject_user_category_allocation_id: this.decodedToken.user?.course_subject_user_category_allocation_id
    }
    this._apiService.from_flashcard_token(data).subscribe({
      next: (res) => {
        this.flashcard_token = res.data;
        // console.log(this.flashcard_token,'flashcard');
      }, error: () => {

      }
    })
  }
  access_wow_falshcards() {
    const dialogRef = this.dialog.open(WowFlashCardsComponent, {
      minHeight: 'auto',
      minWidth: '340px',
      width: '800px',
      data: {
        access_token: this.flashcard_token
      },
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  protected sortValue(data: any) {
    this.sort_value = data.value;
    // console.log(data);
    if (this.sort_value === 1) {
      this.dataSource.data = this.dataSource.data.sort((b, a) => {
        try {
          const dateA = new Date(a.globalized_datetime);
          const dateB = new Date(b.globalized_datetime);
          return dateA.getTime() - dateB.getTime();
        } catch (error) {
          // console.error('Error sorting by date:', error);
          return 0;
        }
      });
    }
    else if (this.sort_value === 2) {
      this.dataSource.data = this.dataSource.data.sort((b, a) => {
        return (
          a.one_time_subscription_cost_per_user_for_global_users -
          b.one_time_subscription_cost_per_user_for_global_users
        );
      });
    } else if (this.sort_value === 3) {
      this.dataSource.data = this.dataSource.data.sort((a, b) => {
        return (
          a.one_time_subscription_cost_per_user_for_global_users -
          b.one_time_subscription_cost_per_user_for_global_users
        );
      });
    }
  }

  //* --------------------------  Public methods  --------------------------*//

  facultyRating = {
    faculty_rating_value: '1',
    faculty_rating_update(item: any) {
      // console.log(item);

      this.faculty_rating_value = `${Math.round(item)}`;
    },
  };
  rating = {
    rating_value: '1',
    rating_update(item: any) {
      // console.log(item);

      this.rating_value = `${Math.round(item)}`;
    },
  };

  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = [
    'WOWFlashCardsName',
    'RelevantSyllabusCategories',
    'IsthisfromGlobal',
    'PopularityNoofUsers',
    'one_time_subscription_cost_per_user_for_global_users',
  ];

  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;

  rowValue: any[] = [];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    // console.log(this.selection.selected);
    this.rowValue = this.selection.selected;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }

  ngDoCheck(): void {
    if (this.selection.selected.length <= 0) {
      this.rowValue = [];
    }
  }

  table_json_data: any;
  pageChanged(event: PageEvent) {
    // console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.WOW_Flashcards_Relevant_To_Syllabus();
  }
  showPageSizeOptions: boolean = true;

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = 'First';
    paginator._intl.itemsPerPageLabel = 'Records Per Page';
    paginator._intl.lastPageLabel = 'Last';
    paginator._intl.nextPageLabel = 'Next';
    paginator._intl.previousPageLabel = 'Previous';
  }

  exportReport(fileName: any): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }
  onRowClicked(row: any) { }
  onPrint() {
    window.print();
  }

  @ViewChild('pdfTable0', { static: false }) pdfTable0!: ElementRef;

  public downloadAsPDF() {
    let jwt_token = sessionStorage.getItem('access_token');
    let token = this.decodedToken;
    // console.log(token, 'token');
    let app_name: string = token.user.registered_educational_institution_name;
    let districtStatePincode: string = `${token.user.city_district_county} ${token.user.state_province} ${token.user.pin_code}`;
    let addressline1_adressline2: string = `${token.user.address_line_1} ${token.user.address_line_2}`;

    let customer_logo = `${environment.ceph_URL}/${token.user.country_code}-${token.user.customer_id}/${token.user.customer_sub_domain_name}-icon-128x128.png`;

    let pageIndex: number = Number(this.paginator.pageIndex);
    let pageSize: number = Number(this.paginator.pageSize);

    let currentPageEnd = pageSize * (pageIndex + 1);
    let currentPageStart = currentPageEnd - (pageSize - 1);

    const htmlToPrint =
      '' +
      '<style type="text/css">' +
      '.pageFooter {' +
      '    display: table-footer-group;' +
      '    counter-increment: page;' +
      '}' +
      '.pageFooter:after {' +
      '   content: "Page " counter(page)' +
      '}' +
      '</style>';
    var printContents = document.getElementById('pdfTable0')!.innerHTML;
    let popupWin: any = window.open(
      'Angular Large Table to pdf',
      '_blank',
      'width=768,height=auto'
    );

    popupWin.document.write(
      '<html><head>' +
      '<link rel="stylesheet" href="' +
      'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>' +
      '<style type="text/css">' +
      '.pageFooter {' +
      '    display: table-footer-group;' +
      '    counter-increment: page;' +
      '}' +
      '.mat-radio-button {' +
      'display: none;' +
      '}' +
      '.pageFooter:after {' +
      '   content: "Page Number" counter(page)' +
      '}' +
      '</style>' +
      `</head>

        <body onload="window.print()">
          <style>
          .mat-column-select{display:none}
          .mat-table{
            margin-left:auto;
            margin-right:auto;
            width:80%;
           }
          </style>

          <div style="width:100%;  display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">
          <img style="width:100px;height:100px" src="${customer_logo}"  onerror="this.src='https://getsterapps.getwow.education/assets/icons/logo.png'"  alt="app-logo" />
          <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">${this.decodedToken?.user?.customer_sub_domain_name}</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">Link - Global WOW Flashcards</span>
            <span style="text-align: center;font-size:14px;color:black;font-weight:600;">Records : ( ${currentPageStart} - ${currentPageEnd} of ${this.paginator.length
      } ) ${this.filterValue.length >= 1
        ? `(Filtered by -" ${this.filterValue} ")`
        : ''
      } (${DateTime.local().toFormat('yyyy-MM-dd TT')})</span>
          </div>
          </div>

          ` +
      printContents +
      '</body>' +
      `
          <footer style="position: fixed; bottom: 0; width: 100%;">
          <div style=" display: flex;flex-direction: column; width:100%; align-items:center">
          <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">${addressline1_adressline2}</span>
          <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">${districtStatePincode}</span>
          </div>
          </footer>
        ` +
      '</html>'
    );
    popupWin.document.close();
  }

  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//
}

interface instName {
  name: string;
}
export interface PeriodicElement {
  name: string;
  WOWFlashCardsName: string;
  RelevantSyllabusCategories: string;
  IsthisfromGlobal: string;
  PopularityNoofUsers: number;
  one_time_subscription_cost_per_user_for_global_users: any;
  globalized_datetime: any;
}
