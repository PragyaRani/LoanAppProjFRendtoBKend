import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderService } from 'src/app/core/services/loader.service';

import { MaterialLoaderComponent } from './material-loader.component';

describe('MaterialLoaderComponent', () => {
  let component: MaterialLoaderComponent;
  let fixture: ComponentFixture<MaterialLoaderComponent>;
  class MockDummyService extends LoaderService {
    // mock everything used by the component
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialLoaderComponent ],
      providers:[{provide: LoaderService, useClass:MockDummyService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
