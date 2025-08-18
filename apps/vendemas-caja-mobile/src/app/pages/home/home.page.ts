import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  currentTime = new Date().toLocaleString();

  constructor() {
    console.log('HomePage constructor called');
    console.log('Current time:', this.currentTime);
    console.log('Quick actions:', this.quickActions);
  }

  quickActions = [
    {
      title: 'Nueva Venta',
      description: 'Iniciar una nueva transacción',
      icon: 'add',
      color: 'primary',
      route: '/pos',
    },
    {
      title: 'Inventario',
      description: 'Gestionar productos y stock',
      icon: 'cart',
      color: 'secondary',
      route: '/inventory',
    },
    {
      title: 'Analytics',
      description: 'Ver reportes de ventas',
      icon: 'analytics',
      color: 'tertiary',
      route: '/analytics',
    },
    {
      title: 'Ubicación',
      description: 'Compartir ubicación',
      icon: 'location',
      color: 'success',
      route: '/location',
    },
    {
      title: 'Notificaciones',
      description: 'Promociones y alertas',
      icon: 'notifications',
      color: 'warning',
      route: '/notifications',
    },
  ];

  onQuickAction(action: any) {
    console.log('Quick action:', action);
    // TODO: Implement navigation
  }
}
