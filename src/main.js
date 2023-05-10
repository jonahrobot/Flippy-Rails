let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    pixelArt: true,
    autoCenter: true,
    physics: {
      default: 'arcade',
      arcade: {
        tileBias: 4,
        gravity: { y: 250 },
      }
    },
    scene: [ Play ]
  }

let game = new Phaser.Game(config);
