// Some Strange Game
game.splash("Some Strange Game", "very strange")
console.log("Begin")

// Setup
// Music Setup
let gameMusic = "C:2 D:2 E:2 F:2 G:8 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:2 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:8 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:2 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:8 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:2 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:8 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:2 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:8 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:2 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:8 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:2 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:8 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:2 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:8 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:2 G:2 F:2 E:2 D:2 E:4 D:4 C:4"
music.playSound(gameMusic)
console.log("Music started")
// Sprite Creation
let projectileAddKind = SpriteKind.create()
let emeraldKind = SpriteKind.create()
let playerMain = sprites.create(assets.image`playerMain`, SpriteKind.Player)
let enemy = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
let apple = sprites.create(assets.image`apple`, SpriteKind.Food)
let projectileAdd = sprites.create(assets.image`projectileAdd`, projectileAddKind)
let emerald = sprites.create(assets.image`emerald`, emeraldKind)
console.log("Sprites created (playerMain, enemy, apple)")
// Player Setup
controller.moveSprite(playerMain) // setup controller
enemy.follow(playerMain, 50, 50) // make enemy follow player
info.player1.setLife(3) // set lives
scene.cameraFollowSprite(playerMain) // camera follow player
scene.setTileMapLevel(assets.tilemap`level1`)
let projectilesLeft = 10
// Apple Setup
let appleLocationX = Math.floor(Math.randomRange(0, 64) * 4)
let appleLocationY = Math.floor(Math.randomRange(0, 64) * 4)
apple.setPosition(appleLocationX, appleLocationY)
// Enemy Setup
let randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
let randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
enemy.setPosition(randomLocationX, randomLocationY)
let enemyLives = 3
// +1 Projectile Setup
randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
projectileAdd.setPosition(randomLocationX, randomLocationY)
// Emerald Setup
randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
emerald.setPosition(randomLocationX, randomLocationY)

// Background Loop
forever(function() {
    if (enemyLives == 0) {
        enemy.destroy()
    }
    info.setScore(projectilesLeft)
})

// Main Loop
// Buttons
controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    // Shoot Projectile towards in direction facing
    if (projectilesLeft > 0) {
        // animation.runImageAnimation(playerMain, assets.animation`projectileThrow`, 200, false) lot of lag
        let projectile = sprites.createProjectileFromSprite(assets.image`projectile`, playerMain, 50, 50)
        projectilesLeft--
        console.log("Projectile shot")
    } else {
        music.playSound("C:1")
        console.log("No projectiles left")
    }
})
// Food Overlap
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(sprite: Sprite, otherSprite: Sprite) {
    console.log("apple eaten by playerMain")
    playerMain.sayText("Tasty!", 500, true)
    music.playSound("C:1 G:1")
    animation.runImageAnimation(playerMain, assets.animation`eating`, 200, false) // eating animation
    info.player1.changeLifeBy(+1) // add 1 life
    otherSprite.destroy() // destroy apple
})
// Enemy Overlap
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function(sprite: Sprite, otherSprite: Sprite) {
    console.log("playerMain hurt by enemy")
    playerMain.sayText("Ouch!", 500, true)
    music.playSound("C:1 C:1")
    info.player1.changeLifeBy(-1) // remove 1 life
    randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
    randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
    enemy.setPosition(randomLocationX, randomLocationY)
})
// Projectile Overlap
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function(sprite: Sprite, otherSprite) {
    console.log("enemy hurt by projectile")
    enemy.sayText("Ouch!", 500, true)
    music.playSound("C:1 G:1")
    randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
    randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
    enemy.setPosition(randomLocationX, randomLocationY)
    enemyLives--
})
// +1 Projectile Overlap
sprites.onOverlap(SpriteKind.Player, projectileAddKind, function(sprite: Sprite, otherSprite: Sprite) {
    console.log("projectileAdd picked up by playerMain")
    playerMain.sayText("Yeah!", 500, true)
    music.playSound("C:1 G:1")
    // animation.runImageAnimation(playerMain, assets.animation`projectileAddAnim`, 200, false) animation error
    randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
    randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
    projectileAdd.setPosition(randomLocationX, randomLocationY)
    projectilesLeft++
})
// Emerald Overlap
sprites.onOverlap(SpriteKind.Player, emeraldKind, function(sprite: Sprite, otherSprite: Sprite) {
    console.log("Win")
    playerMain.setPosition(0, 0)
    game.over(true)
})
