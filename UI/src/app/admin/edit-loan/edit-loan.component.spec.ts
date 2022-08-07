import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { EditLoanComponent } from './edit-loan.component';

describe('EditLoanComponent', () => {
  let component: EditLoanComponent;
  let fixture: ComponentFixture<EditLoanComponent>;
  class MockDummyService extends LoaderService {
    // mock everything used by the component
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLoanComponent ],
      imports:[FormsModule,RouterTestingModule,HttpClientModule,ReactiveFormsModule,SharedModule,BrowserAnimationsModule],
      providers:[{provide:FormBuilder},{provide: LoaderService, useClass:MockDummyService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });
  it('should call onSubmit', () => {
    expect(component.onSubmit).toBeTruthy();
  });
  it('should call onEdit', () => {
    expect(component.onEdit).toBeTruthy();
  });
  it('should call onCancel', () => {
    expect(component.onCancel).toBeTruthy();
  }); 
  it('should call TermValidators', () => {
    expect(component.TermValidators).toBeTruthy();
  }); 
});
