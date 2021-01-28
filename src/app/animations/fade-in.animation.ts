// import the required animation functions from the angular animations module
import { trigger, animate, transition, style, state } from '@angular/animations';

const NICE_EASING = 'cubic-bezier(0.35, 0, 0.25, 1)';
export const fadeInAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimation', [
        // route 'enter' transition
        transition(':enter', [
            // css styles at start of transition
            style({ opacity: 0 }),
            // animation and styles at end of transition
            animate('.9s', style({ opacity: 1 }))
        ]),
    ]);

export const flyInOut =
    trigger('flyInOut', [
        state('in', style({ transform: 'translateX(0)' })),
        transition('void => *', [
            style({ transform: 'translateX(-50%)' }),
            animate(100)
        ]),
        transition('* => void', [
            animate(100, style({ transform: 'translateX(-50%)' }))
        ])
    ]);


export const flyInFromLeft =
    trigger('flyInFromLeft', [
        state('in', style({ opacity: 1, transform: 'translateX(0)' })),
        transition('void => *', [
            style({ opacity: 0, transform: 'translateX(-50%)', height: '*' }),
            animate('0.5s 0.1s ' + NICE_EASING)
        ]),
        transition('* => void', [
            style({ opacity: 1, height: '*' }),
            animate(250, style({ opacity: 0, height: 0 }))
        ])
    ]);

export const flyInFromDown =
    trigger('flyInFromDown', [
        state('in', style({ opacity: 1, transform: 'translateX(0)' })),
        transition('void => *', [
            style({ opacity: 0, transform: 'translateY(-50%)', height: '*' }),
            animate('0.5s 0.1s ' + NICE_EASING)
        ]),
        transition('* => void', [
            style({ opacity: 1, height: '*' }),
            animate(250, style({ opacity: 0, height: 0 }))
        ])
    ]);

