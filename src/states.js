export const STATES_NAMES = {
  walking: 'walking',
  falling: 'falling',
  waiting: 'waiting',
  respawn: 'respawn',
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
      { sprite: 8, delay: 350 },
      { sprite: 9, delay: 300 },
      { sprite: 1, delay: 200 },
      { sprite: 9, delay: 200 },
      { sprite: 1, delay: 150 },
      { sprite: 9, delay: 100 },
      { sprite: 1, delay: 100 },
      { sprite: 9, delay: 50 },
      { sprite: 1, delay: 300 },
    ]
  ],
  [
    STATES_NAMES.respawn,
    [
      { sprite: 1, delay: 200 },
      { sprite: 16, delay: 150 },
      { sprite: 1, delay: 100 },
      { sprite: 16, delay: 100 },
      { sprite: 1, delay: 50 },
      { sprite: 16, delay: 300 },
    ]
  ],
  [
    STATES_NAMES.waiting,
    [
      // standby
      { sprite: 16, delay: 500 },
      { sprite: 19, delay: 100 },
      { sprite: 16, delay: 500 },
      { sprite: 19, delay: 100 },
      { sprite: 16, delay: 500 },
      { sprite: 19, delay: 100 },
      { sprite: 17, delay: 500 },
      { sprite: 18, delay: 100 },
      { sprite: 17, delay: 500 },
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
