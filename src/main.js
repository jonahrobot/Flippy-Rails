/*

Name: Jonah Ryan
Game: Flippy Rails!
Hours spent: 35

Creative Tilt: 

I'm really proud of my level generation system! I built a cursor that tracks where we are currently
generating rails. Then after when the level changes, the cursor moves down or up depending on if going up would go
out of bounds or not. When it moves the track it also adds fake tracks to fake out the player. To insure the game
knows if the player goes off course each flip switch placed holds a memory of what the correct direction is and checks
the players current direction on collision. It was a lot of thought that went into making sure it generated correctly
and I am really proud with how it turned out!

I'm really also proud of my minimalistic art style with the text all in the top right and how the "press space" is utilized
in multiple contexts. I tried something original with the endless runner making the player control the environment instead
of the character. This could have been more expanded on like the player placing the rails, but for sake of the time I had
I cut down to this simple flip switch design.

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
    scene: [Loading, Play , Title, Lose]
  }

let game = new Phaser.Game(config);
