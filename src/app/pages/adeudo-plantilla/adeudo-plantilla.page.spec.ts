import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdeudoPlantillaPage } from './adeudo-plantilla.page';

describe('AdeudoPlantillaPage', () => {
  let component: AdeudoPlantillaPage;
  let fixture: ComponentFixture<AdeudoPlantillaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdeudoPlantillaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdeudoPlantillaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
