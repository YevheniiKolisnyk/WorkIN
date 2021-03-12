import {
  animate,
  animateChild,
  group,
  keyframes,
  query,
  state,
  style,
  transition,
  trigger
} from '@angular/animations'

export const authAnimations = [
  trigger('description', [
    state('default', style({
      width: '40%',
      right: 'unset',
      left: 0
    })),

    state('move', style({
      width: '40%',
      left: 'unset',
      right: 0
    })),

    transition('default => move', [
      group([
        query('@button-text-register', animateChild()),
        query('@button-text-login', animateChild()),
        query('@description-login', animateChild()),
        query('@description-register', animateChild()),
        animate(
          '1.2s ease',
          keyframes([
            style({width: '70%', offset: .3}),
            style({left: '30%', offset: .8}),
            style({left: 'unset', right: 0, offset: .81}),
            style({width: '40%', offset: 1}),
          ])
        )
      ])

    ]),

    transition('move => default', [
      group([
        query('@button-text-register', animateChild()),
        query('@button-text-login', animateChild()),
        query('@description-login', animateChild()),
        query('@description-register', animateChild()),
        animate(
          '1.2s ease',
          keyframes([
            style({width: '70%', offset: .3}),
            style({right: '30%', offset: .8}),
            style({right: 'unset', left: 0, offset: .81}),
            style({width: '40%', offset: 1}),
          ])
        )
      ])

    ]),
  ]),
  trigger('description-login', [
    state('default', style({
      transform: 'translateX(-1000px)',
      opacity: 0,
      visibility: 'hidden',
      position: 'absolute',
    })),
    state('move', style({
      transform: 'translateX(0)',
      opacity: 1,
      visibility: 'visible',
      position: 'relative'
    })),

    transition('default => move', [
      animate('.1s', style({position: 'relative'})),
      animate('1s .2s ease')
    ]),
    transition('move => default', [
      animate('.1s', style({position: 'absolute'})),
      animate('.8s ease')
    ])
  ]),


  trigger('description-register', [
    state('default', style({
      transform: 'translateX(1000px)',
      opacity: 0,
      visibility: 'hidden',
      position: 'absolute'
    })),
    state('move', style({
      transform: 'translateX(0)',
      opacity: 1,
      visibility: 'visible',
      position: 'relative'
    })),

    transition('default => move', [
      animate('.1s', style({position: 'relative'})),
      animate('1s .2s ease'),
    ]),
    transition('move => default', [
      animate('.1s', style({position: 'absolute'})),
      animate('.8s ease')
    ])
  ]),


  trigger('button-text-register', [
    state('default', style({
      transform: 'translateX(0)',
      opacity: 1,
      visibility: 'visible',
      position: 'relative'
    })),
    state('move', style({
      transform: 'translateX(-240px)',
      opacity: 0,
      visibility: 'hidden',
      position: 'absolute'
    })),

    transition('default => move', [
      animate('1s ease',)
    ]),
    transition('move => default', [
      animate('1s ease')
    ])
  ]),


  trigger('button-text-login', [
    state('default', style({
      transform: 'translateX(0)',
      opacity: 1,
      visibility: 'visible',
      position: 'relative'
    })),
    state('move', style({
      transform: 'translateX(240px)',
      opacity: 0,
      visibility: 'hidden',
      position: 'absolute'
    })),

    transition('default => move', [
      animate('1s ease',)
    ]),
    transition('move => default', [
      animate('1s ease')
    ])
  ]),


  trigger('form-container', [
    state('default', style({
      right: 0,
      left: 'unset'
    })),
    state('move', style({
      left: 0,
      right: 'unset'
    })),

    transition('default => move', [
      group([
        animate('1.2s ease',
          style({right: '40%'}),),
        query('@form', [
          animateChild()
        ])
      ])
    ]),
    transition('move => default', [
      group([
        animate('1.2s ease',
          style({left: '40%'}),),
        query('@form', [
          animateChild()
        ])
      ])
    ]),
  ]),


  trigger('form', [
    state('default', style({
      visibility: 'hidden',
      position: 'absolute'
    })),
    state('move', style({
      visibility: 'visible',
      position: 'relative'
    })),
    transition('default => move',
      animate('.4s .25s')),
    transition('move => default',
      animate('.01s .47s')),
  ])
]
