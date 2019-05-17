import {
    trigger, animateChild, group,
    transition, animate, style, query, keyframes
} from '@angular/animations';


// Routable animations
export const SlideInAnimation =
    trigger('myFadeinTrigger', [
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateY(-10%)'
             }),
            animate('0.8s 100ms ease-in-out', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
        ]),
        transition(':leave', [
            animate('1s', style({ opacity: 0 }))
        ])
    ]);
