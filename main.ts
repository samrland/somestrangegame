// Some Strange Game
game.splash("Some Strange Game", "very strange")
music.playTone(Note.C, BeatFraction.Half)

// Setup
// Sprite Creation
let playerMain = sprites.create(assets.image`playerMain`, SpriteKind.Player)
let enemy = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
let apple = sprites.create(assets.image`apple`, SpriteKind.Food)
// Player Setup
controller.moveSprite(playerMain) // setup controller
enemy.follow(playerMain, 50, 50) // make enemy follow player
info.player1.setLife(3) // set lives
playerMain.setBounceOnWall(true) // bounce on walls
// Random Apple Location
let appleLocationX = Math.floor(Math.randomRange(0, 64) * 2)
let appleLocationY = Math.floor(Math.randomRange(0, 64) * 2)
apple.setPosition(appleLocationX, appleLocationY)
// Random Enemy Location
let randomLocationX = Math.floor(Math.randomRange(0, 64) * 2)
let randomLocationY = Math.floor(Math.randomRange(0, 64) * 2)
enemy.setPosition(randomLocationX, randomLocationY)
scene.setTileMapLevel(assets.tilemap`level1`)
// Loop
// Food Overlap
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(sprite: Sprite, otherSprite: Sprite) {
    playerMain.sayText("Tasty!", 500, true) // say text, 500 milliseconds, animation true
    // music.playMelody("C E D E G", 120)
    music.playSound("C:1 G:1")
    animation.runImageAnimation(playerMain, assets.animation`eating`, 200, false)
    info.player1.changeLifeBy(+1) // add 1 life
    otherSprite.destroy() // destroy apple
})
// Enemy Overlap
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function(sprite: Sprite, otherSprite: Sprite) {
    playerMain.sayText("Ouch!", 500, true) // say text, 500 milliseconds, animation true
    info.player1.changeLifeBy(-1) // remove 1 life
    randomLocationX = Math.floor(Math.randomRange(0, 64) * 2)
    randomLocationY = Math.floor(Math.randomRange(0, 64) * 2)
    enemy.setPosition(randomLocationX, randomLocationY)
})
