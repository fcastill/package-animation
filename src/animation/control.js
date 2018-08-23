
export class AnimationController {
  /**
   * 
   * @param {Spriteling} sprite 
   * @param {*} bg 
   * @param {*} states 
   */
  constructor(sprite, bgAnimation, stateNames, onStateChange) {
    this.sprite = sprite;
    this.bgAnimation = bgAnimation;
    this.stateNames = stateNames;
    this.onStateChange = onStateChange;
  }

  walk() {
    this.bgAnimation.play();
    this.sprite.showSprite(2);
    const walkingState = this.stateNames.walking;
    this.sprite.play(walkingState, {
      run: -1,
      onPlay: () => this._change(walkingState)
    });
  }

  wait() {
    this.bgAnimation.pause();
    const waitingState = this.stateNames.waiting;
    this.sprite.play(waitingState, {
      run: 1,
      onPlay: () => this._change(waitingState),
      onStop: () => this.standby(),
    });
  }

  standby() {
    this.bgAnimation.pause();
    const standbyState = this.stateNames.standby;
    this.sprite.play(standbyState, {
      run: -1,
      onPlay: () => this._change(standbyState)
    });
  }

  fall() {
    this.bgAnimation.pause();
    const fallingState = this.stateNames.falling;
    this.sprite.play(fallingState, {
      run: 1,
      onStop: () => this.respawn(),
      onPlay: () => this._change(fallingState)
    });
  }

  respawn() {
    const respawnState = this.stateNames.respawn;
    this.sprite.play(respawnState, {
      run: 1,
      onStop: () => this.standby(),
      onPlay: () => this._change(respawnState)
    });
  }

  _change(toState) {
    if (this.onStateChange) {
      this.onStateChange(toState);
    }
  }
  
}
