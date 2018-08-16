export const STATES_NAMES = {
  walking: 'walking',
  falling: 'falling',
  waiting: 'waiting',
};

export const FRAMES = [
  [
    STATES_NAMES.walking,
    [
      { sprite: 2, delay: 200 },
      { sprite: 3, delay: 200 },
      { sprite: 4, delay: 200 },
    ]
  ],
  [
    STATES_NAMES.falling,
    [
      { sprite: 5, delay: 150 },
      { sprite: 6, delay: 150 },
      { sprite: 7, delay: 150 },
      { sprite: 8, delay: 250 },
      { sprite: 9, delay: 400 },
      { sprite: 8, delay: 500 },
      { sprite: 9, delay: 400 },
      { sprite: 8, delay: 500 },
      { sprite: 9, delay: 400 },
      { sprite: 8, delay: 500 },
      { sprite: 9, delay: 400 },
    ]
  ],
  [
    STATES_NAMES.waiting,
    [
      // standby
      { sprite: 2, delay: 1 },
      { sprite: 1, delay: 2400 },
      // tapping
      { sprite: 10, delay: 250 },
      { sprite: 11, delay: 250 },
      { sprite: 10, delay: 250 },
      { sprite: 11, delay: 250 },
      { sprite: 10, delay: 250 },
      // mad
      { sprite: 12, delay: 150 },
      // wave
      { sprite: 13, delay: 150 },
      { sprite: 14, delay: 150 },
      { sprite: 15, delay: 150 },
      { sprite: 14, delay: 150 },
      { sprite: 15, delay: 150 },
      { sprite: 14, delay: 150 },
      { sprite: 13, delay: 150 },
      // mad
      { sprite: 12, delay: 150 },
    ]
  ]
];
