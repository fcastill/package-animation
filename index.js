import Spriteling from 'spriteling';
import spriteUrl from './assets/sprite-walking.png';

const sprite = new Spriteling({
  url: spriteUrl,
  left: 460,
  cols: 5,
  rows: 1
}, '#package-guy')

sprite.play({
  run: -1,
  delay: 250
})
