/*
Created by Freshek on 07.10.2017
*/

class AssetRemovedHandler {
  static get ID() {
    return 2047;
  }

  constructor() {
    this._handler = function(e, a) {
      var parsedCmd = JSON.parse(e.detail);

      if (parsedCmd.hash == a.targetBoxHash) {
        a.targetBoxHash = null;
      }

      if (parsedCmd.hash in a.boxes) {
        delete a.boxes[parsedCmd.hash];
      }
    }
  }

  get handler() {
    return this._handler;
  }
}
