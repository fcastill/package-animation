
export class AnimationController {
  /**
   * 
   * @param {Spriteling} sprite 
   * @param {*} bg 
   * @param {*} states 
   */
  constructor(sprite, bgAnimation, stateNames) {
    this.sprite = sprite;
    this.bgAnimation = bgAnimation;
    this.stateNames = stateNames;
  }

  walk() {
    this.bgAnimation.play();
    this._switchTo(this.stateNames.walking);
  }

  wait() {
    this.bgAnimation.pause();
    this.sprite.stop();
    this.sprite.goTo(1);
    setTimeout(() => this._switchTo(this.stateNames.waiting), 1);
    // setTimeout
    // this._switchTo(this.stateNames.waiting);
  }

  fall() {
    this.bgAnimation.pause();
    this._switchTo(this.stateNames.falling);
  }

  _switchTo(stateName) {
    this.sprite.play(stateName, {
      run: -1,
    });
    // setTimeout(() => this.sprite.play(stateName, {
    //   run: -1,
    // }));
  }
  
}
