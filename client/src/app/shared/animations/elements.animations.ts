import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations'

export const elementsAnimations = [
  trigger("addList", [
    transition("void => *", [
      style({
        maxHeight: 0,
        overflow: 'hidden',
        padding: '0 50px',
        opacity: 0
      }),
      animate(
        ".3s ease",
        style({
          maxHeight: '500px',
          padding: '40px 50px',
          overflow: 'visible',
          opacity: 1
        })
      )
    ]),
    transition("* => void", [
      style({
        maxHeight: '500px',
        padding: '40px 50px',
        overflow: 'visible',
        opacity: 1
      }),
      animate(
        ".3s ease",
        style({
          maxHeight: 0,
          overflow: 'hidden',
          padding: '0 50px',
          opacity: 0
        })
      )
    ])
  ]),

  trigger("list", [
    transition("void => *", [
      style({transform: "scale(0)", padding: '0', opacity: 0}),
      animate(".4s ease", style({transform: "scale(1)", padding: '30px 50px', opacity: 1})
      )
    ]),
    transition("* => void", [
      style({transform: "scale(1)", opacity: 1, padding: '30px 50px', height: "*"}),
      animate(".4s ease", style({
          padding: '0',
          transform: "scale(0)",
          opacity: 0,
          height: "0px",
        })
      )
    ])
  ]),

  trigger("scaleAnimation", [
    transition("void => *", [
      style({transform: "scale(0)", opacity: 0}),
      animate(".3s ease",
        style({transform: "scale(1)", opacity: 1})
      )
    ]),
    transition("* => void", [
      style({transform: "scale(1)", opacity: 1}),
      animate(".3s ease",
        style({transform: "scale(0)", opacity: 0,})
      )
    ])
  ]),
]
