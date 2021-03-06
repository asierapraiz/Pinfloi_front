
import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, stagger
} from '@angular/animations';

export const listAnimation = trigger('pageAnimations', [
    transition(':enter', [
        query('.list, form', [
            style({ opacity: 0, transform: 'translateY(-100px)' }),
            stagger(-30, [
                animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
            ])
        ])
    ])
]);

export const slideInFromRight = trigger('pageAnimations', [
    transition(':enter', [
        query('.fromRight', [
            style({ opacity: 0, transform: 'translateX(100px)' }),
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
        ])
    ])
]);


export const slideInFrom = trigger('pageAnimations', [
    transition(':enter', [
        group([
            query('.fromLeft', [
                style({ opacity: 0, transform: 'translateX(-100px)' }),
                animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
            ], { optional: true }),
            query('.fromRight', [
                style({ opacity: 0, transform: 'translateX(100px)' }),
                animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
            ], { optional: true }),
            query('.fromUp', [
                style({ opacity: 0, transform: 'translateY(-100px)' }),
                animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
            ], { optional: true }),
            query('.fromDown', [
                style({ opacity: 0, transform: 'translateY(100px)' }),
                animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
            ], { optional: true })
        ])
    ])
]);





let routeAnimationToRight = [
    style({ position: 'relative' }),
    query(':enter, :leave', [
        style({
            position: 'fixed',
            width: '100%'
        })
    ]),
    query(':enter', [
        style({ transform: 'translateX(100%)' })
    ]),
    query(':leave', animateChild()),
    group([
        query(':leave', [
            animate('1000ms ease-out', style({ transform: 'translateX(-100%)' }))
        ]),
        query(':enter', [
            animate('1000ms ease-out', style({ transform: 'translateX(0%)' }))
        ])
    ]),
    query(':enter', animateChild()),
];

let routeAnimationToLeft = [
    style({ position: 'relative' }),
    query(':enter, :leave', [
        style({
            position: 'fixed',
            width: '100%'
        })
    ]),
    query(':enter', [
        style({ transform: 'translateX(-100%)' })
    ]),
    query(':leave', animateChild()),
    group([
        query(':leave', [
            animate('1000ms ease-out', style({ transform: 'translateX(100%)' }))
        ]),
        query(':enter', [
            animate('1000ms ease-out', style({ transform: 'translateX(0%)' }))
        ])
    ]),
    query(':enter', animateChild()),
];

let routeFadeIn = [
    // css styles at start of transition
    style({ opacity: 0 }),
    // animation and styles at end of transition
    animate('.9s', style({ opacity: 1 }))
];

export const routeAnimations =
    trigger('routeAnimations', [
        transition('LandingPage => SeleccionPage', routeAnimationToRight),
        transition('NodoBg => LandingPage', routeAnimationToLeft),
        transition('LandingPage => NodoBg', routeAnimationToRight),
        transition('LandingPage => NodoBg', routeAnimationToRight),
        transition('NodoBg => LandingPage', routeAnimationToLeft),
        transition('NodoDos => Nodo', routeAnimationToLeft),
        transition('NodoDos => Nombre', routeAnimationToRight),
        transition('Nodo => NodoDos', routeAnimationToRight),
        transition('Nombre => NodoDos', routeAnimationToLeft),
        transition('Nombre => Avatar', routeAnimationToRight),
        transition('Nodo => Login', routeAnimationToRight),
        transition('NodoDos => RegistroPage', routeAnimationToRight),
        transition('RegistroPage => Login', routeAnimationToRight),
        transition('RegistroPage => NodoBg', routeAnimationToLeft),
        transition('Login => Nodo', routeAnimationToLeft),
        transition('Login => Avatar', routeAnimationToRight),
        transition('NodoBg => RetoPage', routeAnimationToRight),
        transition('NodoPage => NodoDosPage', routeAnimationToRight),
        transition('JuegosPage => TareaPage', routeAnimationToRight),
        transition('TareasPage => JuegosPage', routeAnimationToRight),
        transition('JuegosPage => NameFormPage', routeAnimationToRight),
        transition('NameFormPage => JuegosPage', routeAnimationToLeft),
        transition('NameFormPage => AvatarFormPage', routeAnimationToRight),
        transition('AvatarFormPage => NameFormPage', routeAnimationToLeft),
        transition('* <=> TareaPage', routeAnimationToRight),
        transition('* <=> SumaPage', routeFadeIn),
        transition('* <=> RestaPage', routeFadeIn),
        transition('* <=> TablasPage', routeFadeIn),
        transition('* <=> MensajePage', routeFadeIn),
        transition('* <=> GamePage', routeAnimationToRight),

    ]);
