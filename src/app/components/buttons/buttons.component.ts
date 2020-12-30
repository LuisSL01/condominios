import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {

  @Input() valueLinkCancel: string;
  @Input() valueDisabled: boolean;
  
  constructor() { 
    console.log('valueLinkCancel: '+this.valueLinkCancel);
    console.log('valueDisabled: '+this.valueDisabled);
  }

  ngOnInit() {

    

  }

}
