/*
Created by Freshek on 28.10.2017
*/
class Api {
  constructor() {
    this._blackListedBoxes = [];
    this.gates = [];
    this.boxes = {};
    this.ships = {};
    this.lastMovement = 0;
  }

  lockShip(ship) {
    if (!(ship instanceof Ship))
      return;

    if (this.ships[ship.id] == null)
      return;

    ship.update();
    var pos = ship.position;
    var scr = 'document.getElementById("preloader").lockShip(' + ship.id + ',' + Math.round(pos.x) + ',' + Math.round(pos.y) + ',' + Math.round(window.hero.position.x) + ',' + Math.round(window.hero.position.y) + ');';
    Injector.injectScript(scr);

    this.lockTime = $.now();
  }

  lockNpc(ship) {
    if (!(ship instanceof Ship))
      return;

    if (this.ships[ship.id] == null)
      return;

    this.lockTime = $.now();

    this.lockShip(ship);
  }

  collectBox(box) {
    if (!(box instanceof Box))
      return;

    if (this.boxes[box.hash] == null)
      return;

    if(MathUtils.random(1, 100) >= window.settings.collectionSensitivity){
      return;
    }

    Injector.injectScript('document.getElementById("preloader").collectBox' + box.hash + '()');

    this.collectTime = $.now();
  }

  move(x, y) {
    if (!isNaN(x) && !isNaN(y)) {
      window.hero.move(new Vector2D(x, y));
    }
  }

  blackListHash(hash) {
    this._blackListedBoxes.push(hash);
  }

  isOnBlacklist(hash) {
    return this._blackListedBoxes.includes(hash);
  }

  startLaserAttack() {
    Injector.injectScript('document.getElementById("preloader").laserAttack()');
  }
}
