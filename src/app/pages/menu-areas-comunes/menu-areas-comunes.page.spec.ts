import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuAreasComunesPage } from './menu-areas-comunes.page';

describe('MenuAreasComunesPage', () => {
  let component: MenuAreasComunesPage;
  let fixture: ComponentFixture<MenuAreasComunesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAreasComunesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuAreasComunesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
