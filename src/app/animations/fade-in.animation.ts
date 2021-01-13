// import the required animation functions from the angular animations module
import { trigger, animate, transition, style, state } from '@angular/animations';


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
            style({ transform: 'translateX(400%)' }),
            animate(100)
        ]),
        transition('* => void', [
            animate(100, style({ transform: 'translateX(400%)' }))
        ])
    ]);

