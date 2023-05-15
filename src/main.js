/*

Name: Jonah Ryan
Game: Flippy Rails!
Hours spent: 15
Creative Tilt: 

*/

let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    backgroundColor: '#3ECC4B',
    roundPixels: true,
    pixelArt: false,
    physics: {
      default: 'arcade',
      arcade: {
          //debug: true,
          gravity: {
              x: 0,
              y: 0
          }
      }
    },
    scene: [Loading, Play , Title]
  }

let game = new Phaser.Game(config);
