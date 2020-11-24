import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsambleasPage } from './asambleas.page';

describe('AsambleasPage', () => {
  let component: AsambleasPage;
  let fixture: ComponentFixture<AsambleasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsambleasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsambleasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
