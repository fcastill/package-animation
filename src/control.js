
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
    this.sprite.showSprite(2);
    this.sprite.play(this.stateNames.walking, {
      run: -1,
    });
  }

  wait() {
    this.bgAnimation.pause();
    this.sprite.play(this.stateNames.waiting, {
      run: -1,
    });
  }

  fall() {
    this.bgAnimation.pause();
    this.sprite.play(this.stateNames.falling, {
      run: 1,
      onStop: () => this.respawn(),
    });
  }

  respawn() {
    this.sprite.play(this.stateNames.respawn, {
      run: 1,
      onStop: () => this.wait(),
    });
  }
  
}
