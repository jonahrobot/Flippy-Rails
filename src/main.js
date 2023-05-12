/*

Name: Jonah Ryan
Game: Flippy Rails!
Hours spent: 15
Creative Tilt: 

*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    pixelArt: true,
    autoCenter: true,
    physics: {
      default: 'arcade',
      arcade: {
          debug: true,
          gravity: {
              x: 0,
              y: 0
          }
      }
    },
    scene: [ Play ]
  }

let game = new Phaser.Game(config);
