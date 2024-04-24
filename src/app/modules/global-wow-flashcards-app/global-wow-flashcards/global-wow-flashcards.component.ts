import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DateTime } from 'luxon';
import * as XLSX from 'xlsx';

import { of } from 'rxjs';
import { TreeData } from 'src/app/models/tree.interface';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { WowResourceTableComponent } from './wow-resource-table/wow-resource-table.component';
import { AppAdministratorListComponent } from '../app-administrator-list/app-administrator-list.component';
import { EditGlobalCourseComponent } from './edit-global-course/edit-global-course.component';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-global-wow-flashcards',
  templateUrl: './global-wow-flashcards.component.html',
  styleUrls: ['./global-wow-flashcards.component.scss'],
})
export class GlobalWowFlashcardsComponent implements OnInit {
  @ViewChild(WowResourceTableComponent)
  WowResourceTableComponent!: WowResourceTableComponent;

  firstFormGroup!: UntypedFormGroup;
  // sample_data: any = [
  //   {
  //     user_category_id: 5011,
  //     parent_user_category_id: null,
  //     user_category_name: 'SACRED HEART',
  //     is_the_category_hidden: 0,
  //     category_type: 2,
  //     children: [
  //       {
  //         user_category_id: 5012,
  //         parent_user_category_id: '5011',
  //         user_category_name: 'SHIFT 1',
  //         is_the_category_hidden: 0,
  //         category_type: 2,
  //         children: [
  //           {
  //             user_category_id: 5013,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'BCA',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5014,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'BSC',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5015,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'MATHS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5016,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'PHYSICS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5017,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'CS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5018,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'TAMIL',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //         ],
  //       },
  //       {
  //         user_category_id: 5019,
  //         parent_user_category_id: '5011',
  //         user_category_name: 'SHIFT 2',
  //         is_the_category_hidden: 0,
  //         category_type: 2,
  //         children: [
  //           {
  //             user_category_id: 5020,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'BCA',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5021,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'BSC',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5022,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'MATHS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5023,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'PHYSICS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5024,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'CS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5025,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'TAMIL',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5026,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'Management',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  constructor(
    private _headerTitle: HeaderTitleService,
    private _formBuilder: UntypedFormBuilder,
    public dialog: MatDialog,
    public _apiService: ApiService,
    public _dataShare: DataSharingService,
    private _spinner: CustomSpinnerService,
    private _snackBarService: SnackBarService,
  ) {
    this.firstFormGroup = this._formBuilder.group({
      institution: ['', Validators.required],
    });
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  nestedTreeControl: NestedTreeControl<TreeData>;
  nestedDataSource: MatTreeNestedDataSource<TreeData>;
  checklistSelection = new SelectionModel<TreeData>(true /* multiple */);
  selected_category_val: any = [];
  decodedToken: any;
  is_select_all: boolean = false;
  select_all: boolean = false;
  public is_checkbox_disabled =true;
  public is_disabled_tree = true;
  ngOnInit(): void {
    this.get_data();
    const getToken: any = sessionStorage.getItem('access_token');
    const tokenPayload = getToken.split('.')[1];
    this.decodedToken = JSON.parse(atob(tokenPayload));
  }
  @ViewChild('myCheckbox') myCheckbox!: MatCheckbox;
  uncheckCheckbox() {
    // console.log( this.myCheckbox)
    this.myCheckbox.checked = false;
  }

  public selectRelevantOfYourInterestComboBoxList: any[] = [];
  countryName: any[] = [];
  protected get_data() {
    this._spinner.open();
    this._apiService
      .get_global_syllabus_details()
      .subscribe({
        next: (res) => {
          this._spinner.close();
          if (res.data.length > 0) {
            this.selectRelevantOfYourInterestComboBoxList = res.data;
          }
        }, error: () => {
          this._spinner.close();
        }
      });
  }

  // EditGlobalCourse
  edit_global_course() {
    const dialogRef = this.dialog.open(EditGlobalCourseComponent, {
      width: '700px',
      data: {
        access_token: sessionStorage.getItem('access_token')
      },
    });

    dialogRef.afterClosed().subscribe((result) => { })
  }
  displayedColumns: string[] = [
    'CountryName',
    'EducationalInstitutionCategoryName',
    'GlobalCourse',
    'CourseSubject',
  ];

  // select row from table
  row_course_subject_type: any;
  row_course_subject_name: any;

  public selected_data: any;
  selectRow(element: any) {
    this.is_disabled_tree = false;
    this.is_checkbox_disabled = false;
    this.selected_data = element;
    this.checklistSelection.clear();
    this.share_data_to_table = {share_data:this.selected_data,syllabus_ids:null};

    this._spinner.open();
    this._apiService
      .get_tree_view_based_on_global_course_subjectId(element)
      .subscribe({
        next: (res) => {
          // console.log(res,'body');
          this._spinner.close();
          if (res.data.length > 0) {
            this.nestedDataSource.data = res?.data;
            this.nestedTreeControl.dataNodes = res.data;
            this.nestedTreeControl.expandAll();
          } else {
            this.nestedDataSource.data = [];
            this.nestedTreeControl.dataNodes = [];
          }
        },
        error: () => {
          this._spinner.close();
          this._snackBarService.success('Data not Found');
        },
      });
  }

  public syllabus_ids: any;
  public share_data_to_table:any;
  // -------------------------------------Tree Structure-----------------------------------------//
  private _getChildren = (node: TreeData) => of(node.children);
  total_count: any[] = [];


  hasNestedChild = (_: string, nodeData: TreeData) =>
    nodeData.children.length > 0;

  refreshTreeData() {
    const data = this.nestedDataSource.data;
    this.nestedDataSource.data = [];
    this.nestedDataSource.data = data;
  }

  getLevel = (node: TreeData): any => node.level;

  isExpandable = (node: TreeData) => node.expandable;

  descendantsAllSelected(node: TreeData): boolean {
    const descendants = this.nestedTreeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TreeData): boolean {
    const descendants = this.nestedTreeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TreeData): void {
    this.checklistSelection.toggle(node);
    const descendants = this.nestedTreeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
    this.selected_category_val = this.checklistSelection.selected;
    this.syllabus_ids = this.checklistSelection.selected;
    // console.log(node, 'treechecked');
    this.syllabus_ids = this.checklistSelection.selected.map((item:any)=>{
      return item.syllabus_id
    });

    // console.log(this.syllabus_ids ,'rr')
    this.share_data_to_table = {share_data:this.selected_data,syllabus_ids:this.syllabus_ids};
  }

  selectAll() {
    this.checklistSelection.clear(true);
    this.nestedDataSource.data.map((node) => {
      this.callRecursion(node);
    });
    this.syllabus_ids = this.checklistSelection.selected.map((item:any)=>{
      return item.syllabus_id
    });

    // console.log(this.syllabus_ids ,'rr');
    this.share_data_to_table = {share_data:this.selected_data,syllabus_ids:this.syllabus_ids};
  }
  callRecursion(node: TreeData) {
    this.checklistSelection.isSelected(node);
    this.total_count.push(node);
    this.todoLeafItemSelectionToggle(node);
    this.nestedTreeControl.expand(node);
    if (node.children) {
      node.children.forEach((childNode: any) => {
        this.callRecursion(childNode);
      });
    }
  }
  unselectAll() {
    this.checklistSelection.clear();
    // this.nestedTreeControl11.expandAll();
    this.nestedTreeControl.collapseAll();
    this.syllabus_ids = this.checklistSelection.selected.map((item:any)=>{
      return item.syllabus_id
    });

    // console.log(this.syllabus_ids ,'rr');
    this.share_data_to_table = {share_data:this.selected_data,syllabus_ids:this.syllabus_ids};
  }
  ngDoCheck() {
    if (this.selection.selected.length <= 0) {
      this.rowValue = [];
    }
  }

  // syllabus:any[]=[];


  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TreeData): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    this.selected_category_val = this.checklistSelection.selected;

    this.syllabus_ids = this.checklistSelection.selected;

    this.syllabus_ids = this.checklistSelection.selected.map((item:any)=>{
      return item.syllabus_id
    });

    // console.log(this.syllabus_ids ,'rr');
    this.share_data_to_table = {share_data:this.selected_data,syllabus_ids:this.syllabus_ids};
  }


  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TreeData): void {
    let parent: TreeData | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }
  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TreeData): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.nestedTreeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );

    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TreeData): TreeData | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    // const startIndex = this.nestedTreeControl.dataNodes.indexOf(node) - 1;
    // for (let i = startIndex; i >= 0; i--) {
    //   const currentNode = this.nestedTreeControl.dataNodes[i];
    //   if (this.getLevel(currentNode) < currentLevel) {
    //     return currentNode;
    //   }
    // }
    return null;
  }
  // Table Source

  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  rowValue: any[] = [];
  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

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
    // this.translateMatPaginator(this.paginator);
  }

  pageChanged(event: PageEvent) {
    // console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    // this.loadData();
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

  onPrint() {
    window.print();
  }

  onRowClicked(row: any) { }
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;

  public downloadAsPDF() {
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
    var printContents = document.getElementById('pdfTable')!.innerHTML;
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
      '.pageFooter:after {' +
      '   content: "Page Number" counter(page)' +
      '}' +
      '.mat-table {' +
      ' width: 80% ' +
      '}' +
      '.mat-radio-button {' +
      'visibility:hidden;' +
      '}' +
      '</style>' +
      `</head>

      <body onload="window.print()">
      <style>
      input[type=checkbox]{
                  display:none
                 }
                .mat-column-details,th,td,img{
                  height: 50px;
                  width: 50px;
                  padding-left:10px;
                }
      .mat-column-select{display:none}
      </style>

        <div style="width:100%;  display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">
        <img style="width:100px;height:100px" src="../../../../assets/icons/logo.png" alt="app-logo" />
        <div style=" display: flex;flex-direction: column; width:100%">
          <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">GETster.TECH PVT.LTD</span>
          <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">LIST OF PENDING DELIVERY REQUESTs FOR EMPTY BAGS</span>
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
        <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">Jr Plaza Fourth Floor, Tank Street, </span>
        <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">Hosur, Tamil Nadu 635109</span>
        </div>
        </footer>
      ` +
      '</html>'
    );
    popupWin.document.close();
  }

  // onGetAppAdministratorList() {
  //   let jwt_token = sessionStorage.getItem('access_token');
  //   let token = this.decodedToken;
  //   // console.log(token, 'token');

  //   let app_name: string = token.user.customer_sub_domain_name;

  //   let body: any = {
  //     app_name: app_name,
  //   };
  //   // this._apiService.onGetAppAdministratorList(body).subscribe({
  //   //   next: (res) => {
  //   //     // console.log(app_name,"appname");
  //   //     let config: MatDialogConfig = {
  //   //       disableClose: false,
  //   //       width: '330px',
  //   //       height: '410px',
  //   //       data: res.data,
  //   //     };

  //   //     const dialogRef = this.dialog.open(
  //   //       AppAdministratorListComponent,
  //   //       config
  //   //     );
  //   //     dialogRef.afterClosed().subscribe((res) => { });
  //   //   },
  //   //   error: (err) => {
  //   //     console.error(err);
  //   //   },
  //   // });
  // }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

interface instName {
  name: string;
}
