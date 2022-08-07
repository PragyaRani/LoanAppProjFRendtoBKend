import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoanService } from 'src/app/core/services/loan.service';

const LOAN_TYPES: any[] = [
  { value: 'HOUSE_LOAN', label: 'HOUSE LOAN' },
  { value: 'EDUCATION_LOAN', label: 'EDUCATION LOAN' },
  { value: 'AUTOMOBILE_LOAN', label: 'AUTOMOBILE LOAN' },
  { value: 'BUSINESS_LOAN', label: 'BUSINESS LOAN' },
  { value: 'PERSONAL_LOAN', label: 'PERSONAL LOAN' },
];

@Component({
  selector: 'app-edit-loan',
  templateUrl: './edit-loan.component.html',
  styleUrls: ['./edit-loan.component.css'],
})
export class EditLoanComponent implements OnInit {
  // @ts-ignore
  loanForm: FormGroup;
  message = {
    type: 'INFO',
    message: '',
    show: false,
  };
  loanId: number = 0;
  onEditMode: boolean = false;
  loanTypes = LOAN_TYPES;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loanService: LoanService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onEditMode = false;
    this.activatedRoute.params.subscribe((params) => {
      if (params['loanId']) {
        this.loanId = params['loanId'];
        this.onEditMode = true;
        this.loanService.searchLoan({LoanNumber:this.loanId}).subscribe({
          next: (res: any) => {
            if (res && !res.success) {
              this.message = {
                show: true,
                message: res.message || 'Something went wrong',
                type: 'ERROR',
              };
              return;
            }
            res = res.data.userLoans;
            console.log(res);
            this.patchForm(res);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    });
    this.createLoanForm();
    this.userFName?.valueChanges.subscribe({
      next: (data: any) => {
        console.log(data);
      },
    });
  }
  private createLoanForm(): void {
    this.loanForm = this.fb.group({
      userFName: ['', [Validators.required]],
      userLName: ['', [Validators.required]],
      propertyInfo: ['', [Validators.required]],
      amount: [10000, [Validators.required]],
      type: ['HOUSE LOAN', [Validators.required]],
      term: [5, [Validators.required]],
      creationDate: new Date().toISOString(),
    });
  }
  private patchForm(user: any): void {
    this.loanForm.patchValue({
      userFName: user[0].firstName,
      userLName: user[0].lastName,
      propertyInfo: user[0].propertyInfo,
      amount: user[0].amount,
      type: user[0].type,
      term: user[0].term,
      creationDate: user[0].date,
    });
  }
  onSubmit(): void {
    this.clearMessage();
    this.loanService.addloan(this.loanForm.value).subscribe({
      next: (res: any) => {
        if (res && !res.success) {
          this.message = {
            show: true,
            message: res.message || 'Something went wrong',
            type: 'ERROR',
          };
          return;
        }
        this.router.navigate(['/layout/admin/dashboard'], {
          queryParams: { tab: 'LOANS' },
        });
      },
      error: (err: any) => {
        if (err && !err.success)
          this.message = {
            show: true,
            message: err.error.message || 'Something went wrong',
            type: 'ERROR',
          };
      },
    });
  }
  onEdit(): void {
    this.loanService
      .modifyloan({
        loanNumber: this.loanId,
        amount: this.amount?.value,
        type: this.type?.value,
        propertyInfo: this.propertyInfo?.value,
        term: this.term?.value,
      })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res && !res.success) {
            this.message = {
              show: true,
              message: res.message || 'Something went wrong',
              type: 'ERROR',
            };
            return;
          }
          this.router.navigate(['/layout/admin/dashboard'], {
            queryParams: { tab: 'LOANS' },
          });
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  onCancel(): void {
    this.router.navigate(['/layout/admin/dashboard'], {
      queryParams: { tab: 'LOANS' },
    });
  }

  TermValidators(control: AbstractControl) {
    if (control.value > 0 && control.value <= 30) return { termRange: true };
    return false;
  }

  get userFName(): FormControl | null {
    return this.loanForm.get('userFName') as FormControl;
  }
  get userLName(): FormControl | null {
    return this.loanForm.get('userLName') as FormControl;
  }
  get propertyInfo(): FormControl | null {
    return this.loanForm.get('propertyInfo') as FormControl;
  }
  get amount(): FormControl | null {
    return this.loanForm.get('amount') as FormControl;
  }
  get type(): FormControl | null {
    return this.loanForm.get('type') as FormControl;
  }
  get term(): FormControl | null {
    return this.loanForm.get('term') as FormControl;
  }

  private clearMessage(): void {
    this.message = { show: false, message: '', type: 'INFO' };
  }
}
