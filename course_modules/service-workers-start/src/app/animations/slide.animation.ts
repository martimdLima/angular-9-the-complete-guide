import { trigger, style, animate, transition } from '@angular/animations';
 
export const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(500px)' }),
    animate('0.3s ease-out', style({ transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)' }),
    animate('0.3s ease-in', style({ transform: 'translateY(500px)' }))
  ])
]);