
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
    this.sprite.play(this.stateNames.walking, {
      run: -1,
      onPlay: () => this._change(this.stateNames.walking)
    });
  }

  wait() {
    this.bgAnimation.pause();
    this.sprite.play(this.stateNames.waiting, {
      run: 1,
      onPlay: () => this._change(this.stateNames.waiting),
      onStop: () => this.standby(),
    });
  }

  standby() {
    this.bgAnimation.pause();
    this.sprite.play(this.stateNames.standby, {
      run: -1,
      onPlay: () => this._change(this.stateNames.standby)
    });
  }

  fall() {
    this.bgAnimation.pause();
    this.sprite.play(this.stateNames.falling, {
      run: 1,
      onStop: () => this.respawn(),
      onPlay: () => this._change(this.stateNames.falling)
    });
  }

  respawn() {
    this.sprite.play(this.stateNames.respawn, {
      run: 1,
      onStop: () => this.standby(),
      onPlay: () => this._change(this.stateNames.respawn)
    });
  }

  _change(toState) {
    if (this.onStateChange) {
      this.onStateChange(toState);
    }
  }
  
}
