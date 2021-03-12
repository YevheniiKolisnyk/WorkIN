import {animate, keyframes, state, style, transition, trigger} from '@angular/animations'

export const toastAnimation = [
  trigger('state', [
    state('from', style({
      right: '-500px',
      padding: '0 150px 200px'
    })),

    state('to', style({
      right: '20px'
    })),

    transition('void => *', animate('.6s ease', keyframes([
      style({right: '-500px', offset: 0}),
      style({right: '50px', offset: .7}),
      style({right: '20px', offset: 1})
    ]))),

    transition('* => void', animate('.6s ease', keyframes([
      style({right: '20px', offset: 0}),
      style({right: '50px', offset: .4}),
      style({right: '-500px', offset: 1})
    ])))
  ])
]
