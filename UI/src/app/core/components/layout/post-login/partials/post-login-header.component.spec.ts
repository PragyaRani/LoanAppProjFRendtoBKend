import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/services/auth.service';

import { PostLoginHeaderComponent } from './post-login-header.component';

describe('PostLoginHeaderComponent', () => {
  let component: PostLoginHeaderComponent;
  let fixture: ComponentFixture<PostLoginHeaderComponent>;
  // import the service

  // mock the service
  class MockDummyService extends AuthService {
    // mock everything used by the component
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostLoginHeaderComponent ],
      imports: [RouterTestingModule,HttpClientModule],
      providers:[{provide:AuthService,useClass :MockDummyService},]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLoginHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
