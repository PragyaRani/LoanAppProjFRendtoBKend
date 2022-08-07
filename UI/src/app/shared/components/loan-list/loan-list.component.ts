import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  switchMap,
  tap,
} from 'rxjs/operators';
import { LoanService } from 'src/app/core/services/loan.service';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css'],
})
export class LoanListComponent implements OnInit {
  @Input() userType: string = '';
  isAdmin: boolean = false;
  displayedColumns: string[] = [
    'loanNumber',
    'type',
    'userfname',
    'userlname',
    'amount',
    'term',
    'created',
  ];
  dataSource: any = [];
  message = {
    type: 'INFO',
    message: '',
    show: false,
  };
  initialValue: string = '';
  debounceTime = 300;
  // @ts-ignore
  searchForm: FormGroup;
  constructor(
    private loader: LoaderService,
    private router: Router,
    private loanService: LoanService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.userType && this.userType === 'ADMIN') this.isAdmin = true;
    if (this.isAdmin) this.displayedColumns.push('actions');
    this.createSearchForm();
    this.getLoans();
  }

  private createSearchForm(): void {
    this.searchForm = this.fb.group({
      loaneeFirstName: '',
      loaneeLastName: '',
      loanNumber: '',
    });
  }

  onAddLoan(): void {
    this.router.navigate(['/layout/admin/loan']);
  }

  getLoans(): void {
    // this.loader.show();
    const FILTER_CONTROLS = ['loaneeFirstName', 'loaneeLastName', 'loanNumber'];
    for (const controlName of FILTER_CONTROLS) {
      const control = this.searchForm.get(controlName);

      if (control) {
        control.valueChanges
          .pipe(
            // filter((res) => {
            //   return res !== null && res.length >= this.minLengthTerm;
            // }),
            distinctUntilChanged(),
            debounceTime(1000),
            tap(() => {
              this.loader.show();
            }),
            switchMap((value: any) => {
              const payload = {
                firstName: this.loaneeFirstName
                  ? this.loaneeFirstName.value
                  : '',
                lastName: this.loaneeLastName ? this.loaneeLastName.value : '',
                LoanNumber: this.loanNumber ? this.loanNumber.value : '',
              };
              return this.loanService.searchLoan(payload);
            })
          )
          .subscribe({
            next: (res: any) => {
              this.getloanList(res.data.userLoans);
            },
            error: (err: any) => {
              if (err && !err.success)
                this.message = {
                  show: true,
                  message: err.error.message || 'Something went wrong',
                  type: 'ERROR',
                };
              this.loader.hide();
            },
          });
      }
    }
  }

  onModifyLoan(loanNumber: number): void {
    this.router.navigate([`/layout/admin/loan/${loanNumber}`]);
  }

  private getloanList(users: any): void {
    this.dataSource = [];
    users.forEach((user: any) => {
      const loanInfo = {
        amount: user.amount,
        date: user.date,
        loanNumber: user.loanNumber,
        userfname: user.firstName,
        userlname: user.lastName,
        propertyInfo: user.propertyInfo,
        // status: "Pending"
        term: user.term,
        type: user.type,
      };
      this.dataSource.push(loanInfo);
      // user.loans.forEach((loan: any) => {
        
      // });
    });
    this.loader.hide();
  }
  get loaneeFirstName(): FormControl | null {
    return this.searchForm.get('loaneeFirstName') as FormControl;
  }
  get loaneeLastName(): FormControl | null {
    return this.searchForm.get('loaneeLastName') as FormControl;
  }
  get loanNumber(): FormControl | null {
    return this.searchForm.get('loanNumber') as FormControl;
  }

  // onInput(e: any) {
  //   console.log(
  //     this.loaneeLoanNumber?.value,
  //     this.loaneeFirstName?.value,
  //     this.loaneeLastName?.value
  //   );
  //   this.loanService
  //     .searchLoan(
  //       this.loaneeLoanNumber?.value,
  //       this.loaneeFirstName?.value,
  //       this.loaneeLastName?.value
  //     )
  //     .subscribe({
  //       next: (res: any) => {
  //         console.log(res);
  //       },
  //       error: (err: any) => {
  //         console.log(err);
  //       },
  //     });
  // }
}
