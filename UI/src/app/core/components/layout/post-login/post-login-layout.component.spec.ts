import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/core/services/auth.service';

import { PostLoginLayoutComponent } from './post-login-layout.component';

describe('PostLoginLayoutComponent', () => {
  let component: PostLoginLayoutComponent;
  let fixture: ComponentFixture<PostLoginLayoutComponent>;
  class MockDummyService extends AuthService {
    // mock everything used by the component
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostLoginLayoutComponent ],
      imports: [HttpClientModule],
      providers:[{provide: AuthService, useClass:MockDummyService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLoginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
