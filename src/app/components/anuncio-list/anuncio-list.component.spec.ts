import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnuncioListComponent } from './anuncio-list.component';

describe('AnuncioListComponent', () => {
  let component: AnuncioListComponent;
  let fixture: ComponentFixture<AnuncioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnuncioListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnuncioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
