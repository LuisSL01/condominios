import { Component, OnInit } from '@angular/core';

import { UserData } from '../../../providers/user-data';
import { ActivatedRoute } from '@angular/router';
import { Visita } from '../../../models/visita.model';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.page.html',
  styleUrls: ['./extra.page.scss'],
})
export class ExtraPage implements OnInit {

  elementType = 'canvas';
  qr = '';

  visita: Visita = new Visita();

  constructor(
    private userData: UserData,
    public activatedRoute: ActivatedRoute,
    private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.visita = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));    
    if(this.visita != null){
      var encodeDataVisita = btoa(this.visita.id+"|"+this.visita.uuid);
      this.qr = encodeDataVisita
    }
  }

  compartir(){
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();

    this.socialSharing.share(null, 'Mi QR de Visita', imageData, null)
    .then(() => {})
    .catch(err => {
      alert('Error: ' + err)
    });
  }

}
