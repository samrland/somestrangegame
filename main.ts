// Some Strange Game
game.splash("Some Strange Game")
console.log("Begin;")

// Setup
// Music Setup
// Music Setup
let gameMusic = "C:2 D:2 E:2 F:2 G:8 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:2 G:2 F:2 E:2 D:2 E:4 D:4 C:4"
game.onUpdateInterval(8500, function () {
    music.playSound(gameMusic)
})
console.log("Music started;")
// Sprite Creation
let projectileAddKind = SpriteKind.create()
let emeraldKind = SpriteKind.create()
let playerMain = sprites.create(assets.image`playerMain`, SpriteKind.Player)
let enemy = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
let apple = sprites.create(assets.image`apple`, SpriteKind.Food)
let projectileAdd = sprites.create(assets.image`projectileAdd`, projectileAddKind)
let emerald = sprites.create(assets.image`emerald`, emeraldKind)
console.log("Sprites created (playerMain, enemy, apple);")
// Player Setup
controller.moveSprite(playerMain) // setup controller
enemy.follow(playerMain, 50, 50) // make enemy follow player
info.player1.setLife(3) // set lives
scene.cameraFollowSprite(playerMain) // camera follow player
scene.setTileMapLevel(assets.tilemap`level1`)
let projectilesLeft = 10
// Apple Setup
let randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
let randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
apple.setPosition(randomLocationX, randomLocationY)
// Enemy Setup
randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
enemy.setPosition(randomLocationX, randomLocationY)
let enemyLives = 5
// +1 Projectile Setup
randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
projectileAdd.setPosition(randomLocationX, randomLocationY)
// Emerald Setup
game.onUpdateInterval(1000, function () {
    animation.runImageAnimation(emerald, assets.animation`shine`, 200, false)
})
randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
emerald.setPosition(randomLocationX, randomLocationY)
let level = 1
// Debug
controller.B.onEvent(ControllerButtonEvent.Released, function() {
    let option = game.askForNumber("Debug Menu. Choose a level (0 is debug): ")
    if (option == 1) {
        scene.setTileMapLevel(assets.tilemap`level1`)
    } else if (option == 2) {
        scene.setTileMapLevel(assets.tilemap`level2`)
    } else if (option == 3) {
        scene.setTileMapLevel(assets.tilemap`level3`)
    } else if (option == 4) {
        scene.setTileMapLevel(assets.tilemap`level4`)
    } else if (option == 5) {
        scene.setTileMapLevel(assets.tilemap`level5`)
    } else if (option == 0) {
        scene.setTileMapLevel(assets.tilemap`debugMap`)
    } else {
        console.log("Number too high;")
        game.ask("Error. Check console")
    }
})

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
        animation.runImageAnimation(playerMain, assets.animation`projectileThrow`, 200, false)
        let projectile = sprites.createProjectileFromSprite(assets.image`projectile`, playerMain, 50, 50)
        projectilesLeft--
        console.log("Projectile shot;")
    } else {
        music.playSound("C:1")
        console.log("No projectiles left;")
    }
})
// Food Overlap
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(sprite: Sprite, otherSprite: Sprite) {
    console.log("apple eaten by playerMain;")
    playerMain.sayText("Tasty!", 500, true)
    music.playSound("C:1 G:1")
    animation.runImageAnimation(playerMain, assets.animation`eating`, 200, false) // eating animation
    info.player1.changeLifeBy(+1) // add 1 life
    otherSprite.destroy() // destroy apple
})
// Enemy Overlap
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function(sprite: Sprite, otherSprite: Sprite) {
    console.log("playerMain hurt by enemy;")
    playerMain.sayText("Ouch!", 500, true)
    music.playSound("C:1 C:1")
    info.player1.changeLifeBy(-1) // remove 1 life
    randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
    randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
    enemy.setPosition(randomLocationX, randomLocationY)
})
// Projectile Overlap
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function(sprite: Sprite, otherSprite) {
    console.log("enemy hurt by projectile;")
    enemy.sayText("Ouch!", 500, true)
    music.playSound("C:1 G:1")
    randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
    randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
    enemy.setPosition(randomLocationX, randomLocationY)
    enemyLives--
})
// +1 Projectile Overlap
sprites.onOverlap(SpriteKind.Player, projectileAddKind, function(sprite: Sprite, otherSprite: Sprite) {
    console.log("projectileAdd picked up by playerMain;")
    playerMain.sayText("Yeah!", 500, true)
    music.playSound("C:1 G:1")
    animation.runImageAnimation(playerMain, assets.animation`projectileAddAnim`, 200, false)
    randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
    randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
    projectileAdd.setPosition(randomLocationX, randomLocationY)
    projectilesLeft++
})
// Emerald Overlap
sprites.onOverlap(SpriteKind.Player, emeraldKind, function(sprite: Sprite, otherSprite: Sprite) {
    if (level < 2) {
        console.log("Next Level;")
        if (level == 1) {
            // Apple
            let randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            let randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            apple.setPosition(randomLocationX, randomLocationY)
            // Enemy
            randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            enemy.setPosition(randomLocationX, randomLocationY)
            // +1 Projectile
            randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            projectileAdd.setPosition(randomLocationX, randomLocationY)
            // Emerald
            randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            emerald.setPosition(randomLocationX, randomLocationY)
            // Next Level
            scene.setTileMapLevel(assets.tilemap`level2`)
        } // else if (level == 2) {
            // // Apple
            // let randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            // let randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            // apple.setPosition(randomLocationX, randomLocationY)
            // // Enemy
            // randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            // randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            // enemy.setPosition(randomLocationX, randomLocationY)
            // // +1 Projectile
            // randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            // randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            // projectileAdd.setPosition(randomLocationX, randomLocationY)
            // // Emerald
            // randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            // randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            // emerald.setPosition(randomLocationX, randomLocationY)
            // // Next Level
        //     scene.setTileMapLevel(assets.tilemap`level3`)
        // } else if (level == 3) {
            // // Apple
            // let randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            // let randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            // apple.setPosition(randomLocationX, randomLocationY)
            // // Enemy
            // randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            // randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            // enemy.setPosition(randomLocationX, randomLocationY)
            // // +1 Projectile
            // randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            // randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            // projectileAdd.setPosition(randomLocationX, randomLocationY)
            // // Emerald
            // randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            // randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            // emerald.setPosition(randomLocationX, randomLocationY)
            // // Next Level
        //     scene.setTileMapLevel(assets.tilemap`level4`)
        // } else if (level == 4) {
            // // Apple
            // let randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            // let randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            // apple.setPosition(randomLocationX, randomLocationY)
            // // Enemy
            // randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            // randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            // enemy.setPosition(randomLocationX, randomLocationY)
            // // +1 Projectile
            // randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            // randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            // projectileAdd.setPosition(randomLocationX, randomLocationY)
            // // Emerald
            // randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
            // randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
            // emerald.setPosition(randomLocationX, randomLocationY)
            // // Next Level
        //     scene.setTileMapLevel(assets.tilemap`level5`)
        // } else {
        //     console.log("Error;")
        // }
        level++
    } else {
        console.log("Win;")
        scene.setTileMapLevel(assets.tilemap`end`)
        console.log("End;")
    }
})
