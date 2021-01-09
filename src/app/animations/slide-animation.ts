
import {
    animation, trigger, animateChild, group,
    transition, animate, style, query
} from '@angular/animations';



export const slideInAnimation =
    trigger('routeAnimations', [
        transition('LandingPage => NameFormPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('700ms ease-out', style({ left: '-100%' }))
                ]),
                query(':enter', [
                    animate('700ms ease-out', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('NameFormPage => AvatarFormPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('700ms ease-out', style({ left: '-100%' }))
                ]),
                query(':enter', [
                    animate('700ms ease-out', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('AvatarFormPage => TareaPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('700ms ease-out', style({ left: '-100%' }))
                ]),
                query(':enter', [
                    animate('700ms ease-out', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('* <=> TareaPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('500ms ease-out', style({ left: '-100%' }))
                ]),
                query(':enter', [
                    animate('700ms ease-out', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('* <=> SumaPage', [

            // css styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('.9s', style({ opacity: 1 }))

        ]),
        transition('* <=> RestaPage', [

            // css styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('.9s', style({ opacity: 1 }))

        ]),
        transition('* <=> MensajePage', [

            // css styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('.9s', style({ opacity: 1 }))

        ]),
        transition('* <=> GamePage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('200ms ease-out', style({ left: '-100%' }))
                ]),
                query(':enter', [
                    animate('700ms ease-out', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ])
    ]);



