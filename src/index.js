import Spriteling from 'spriteling';

import spritesUrl from '../assets/sprites.png';
import { FRAMES, STATES_NAMES } from './states';
import { AnimationController } from './control';

const CHARACTER_CONTAINER_ID = 'package-guy';
const BG_CONTAINER_ID = 'bg';
const COUNTER_ID = 'counter';

const counter = createCounter();
const animation = createAnimationControl(counter);
bindClick('#btn-wait', () => animation.wait());
bindClick('#btn-walk', () => animation.walk());
bindClick('#btn-fall', () => animation.fall());
animation.wait();

function createAnimationControl(counter) {
  let sprite = createSpriteAnimator();
  const bgControl = createBgControl();
  return new AnimationController(sprite, bgControl, STATES_NAMES, (stateName) => {
    if (stateName === STATES_NAMES.falling) {
      counter.increment();
    }
  });
}

function createSpriteAnimator() {
  const sprite = new Spriteling({
    url: spritesUrl,
    cols: 4,
    rows: 5,
  }, `#${CHARACTER_CONTAINER_ID}`, true);
  FRAMES.forEach(([name, frames]) => sprite.addScript(name, frames));
  return sprite;
}

function createBgControl() {
  const backgroundElement = document.querySelector(`#${BG_CONTAINER_ID}`);
  const applyPlayState = function(state) {
    if (backgroundElement.style.animationPlayState !== state) {
      backgroundElement.style.animationPlayState = state
    }
  }
  return {
    play: () => applyPlayState('running'),
    pause: () => applyPlayState('paused'),
  };
}

function createCounter() {
  const container = document.querySelector(`#${COUNTER_ID}`);
  let count = 0;
  const pad = n => n < 10 ? '0' + n : n; 
  return {
    increment() {
      count++;
      container.textContent = pad(count);
    }
  };
}

function bindClick(selector, cb) {
  document.querySelector(selector).onclick = cb;
}