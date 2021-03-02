import { ApplicationRef, Component, OnInit } from '@angular/core';
/* import { OSNotificationPayload } from '@ionic-native/onesignal/ngx'; */
import { PushService } from '../../services/push.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  mensajes: any[] = [];


  constructor(public pushService: PushService,
    private applicationRef: ApplicationRef) { }

  ngOnInit() {
    /* this.pushService.pushListener.subscribe(noti => {
      this.mensajes.unshift(noti);
      this.applicationRef.tick();//Con esto le decimos a angular que actve su ciclo de deteccion de cambios
    }); */
  }

  async ionViewWillEnter() {
    console.log('Will enter cargar mensajes');

    /* this.mensajes = await this.pushService.getMensajes(); */
  }

  async borrarMensajes() {
    /* await this.pushService.borrarMensajes(); */
    this.mensajes = [];
  }

}
