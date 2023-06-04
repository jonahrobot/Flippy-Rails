/*

Name: Jonah Ryan
Game: Do the Right Thing
Hours spent: 35

*/

let config = {
    type: Phaser.WEBGL,
    width: 940,
    height: 580,
    backgroundColor: '#3ECC4B',
    roundPixels: true,
    pixelArt: false,
    autoCenter: true,
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
    scene: [Loading, Play]
  }

let game = new Phaser.Game(config);
