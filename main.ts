// Some Strange Game
scene.setTileMapLevel(assets.tilemap`title`)
game.splash("Some Strange Game")
console.log("Begin;")

// Setup
// Music Setup
forever(function () {
    music.playMelody("C5 B A G E G E G ", 120)
})
console.log("Music started;")
// Sprite Creation
let projectileAddKind = SpriteKind.create()
let emeraldKind = SpriteKind.create()
let playerMain = sprites.create(assets.image`playerMain`, SpriteKind.Player)
let enemy = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
let apple = sprites.create(assets.image`apple`, SpriteKind.Food)
let cherry = sprites.create(assets.image`cherry`, SpriteKind.Food)
let strawberry = sprites.create(assets.image`strawberry`, SpriteKind.Food)
let projectileAdd = sprites.create(assets.image`projectileAdd0`, projectileAddKind)
let emerald = sprites.create(assets.image`emerald`, emeraldKind)
console.log("Sprites created (playerMain, enemy, apple, cherry, strawberry projectileAdd, emerald);")
// Player Setup
controller.moveSprite(playerMain) // setup controller
enemy.follow(playerMain, 50, 50) // make enemy follow player
info.setLife(3) // set lives
scene.cameraFollowSprite(playerMain) // camera follow player
scene.setTileMapLevel(assets.tilemap`level1`)
let projectilesLeft = 10
// Apple Setup
let randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
let randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
apple.setPosition(randomLocationX, randomLocationY)
// Cherry Setup
randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
cherry.setPosition(randomLocationX, randomLocationY)
// Strawberry Setup
randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
strawberry.setPosition(randomLocationX, randomLocationY)
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
controller.combos.attachCombo("ududaba+b", function() {
    let option = game.askForNumber("Debug Menu. Choose a level: ", 1)
    if (option == 1) {
        scene.setTileMapLevel(assets.tilemap`level1`)
        let level = 1
    } else if (option == 2) {
        scene.setTileMapLevel(assets.tilemap`level2`)
        let level = 2
    } else if (option == 3) {
        scene.setTileMapLevel(assets.tilemap`level3`)
        let level = 3
    } else if (option == 4) {
        scene.setTileMapLevel(assets.tilemap`level04`)
        let level = 4
    } else if (option == 5) {
        scene.setTileMapLevel(assets.tilemap`level5`)
        let level = 5
    } else if (option == 6) {
        scene.setTileMapLevel(assets.tilemap`level06`)
        let level = 6
    } else if (option == 7) {
        scene.setTileMapLevel(assets.tilemap`level07`)
        let level = 7
    } else {
        console.log("Error: Number too high;")
        game.ask("Error: Number too high")
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
    // Shoot projectile towards direction moving
    if (projectilesLeft > 0) {
        let directionX = controller.dx() * 100
        let directionY = controller.dy() * 100
        if (directionX == 0 && directionY == 0) {
            // if not moving, shoot right
            let projectile = sprites.createProjectileFromSprite(assets.image`projectile0`, playerMain, 100, 0)
        } else {
            // if moving, shoot in direction moving
            let projectile = sprites.createProjectileFromSprite(assets.image`projectile0`, playerMain, directionX, directionY)
        }
        projectilesLeft--
        console.log("Projectile shot;")
    } else {
        music.playSound("C:1")
        console.log("No projectiles left;")
    }
})
// Food Overlap
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(sprite: Sprite, otherSprite: Sprite) {
    console.log("food eaten by playerMain;")
    playerMain.sayText("Tasty!", 500, true)
    music.playSound("C:1 G:1")
    animation.runImageAnimation(playerMain, assets.animation`eating`, 200, false) // eating animation
    info.changeLifeBy(+1) // add 1 life
    otherSprite.destroy() // destroy food
})
// Enemy Overlap
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function(sprite: Sprite, otherSprite: Sprite) {
    console.log("playerMain hurt by enemy;")
    playerMain.sayText("Ouch!", 500, true)
    music.playSound("C:1 C:1")
    info.changeLifeBy(-1) // remove 1 life
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
    animation.runImageAnimation(playerMain, assets.animation`projectileAddAnim0`, 200, false)
    randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
    randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
    projectileAdd.setPosition(randomLocationX, randomLocationY)
    projectilesLeft++
})
// Emerald Overlap
sprites.onOverlap(SpriteKind.Player, emeraldKind, function(sprite: Sprite, otherSprite: Sprite) {
    console.log("Next level;")
    scene.cameraShake(4, 500)
    if (level < 7) {
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
        let upNext = level + 1
        let nextLevel = "level" + upNext
        switch (upNext) {
            case 1:
                scene.setTileMapLevel(assets.tilemap`level1`)
                level++
                break
            case 2:
                scene.setTileMapLevel(assets.tilemap`level2`)
                level++
                break
            case 3:
                scene.setTileMapLevel(assets.tilemap`level3`)
                level++
                break
            case 4:
                scene.setTileMapLevel(assets.tilemap`level04`)
                level++
                break
            case 5:
                scene.setTileMapLevel(assets.tilemap`level5`)
                level++
                break
            case 6:
                scene.setTileMapLevel(assets.tilemap`level06`)
                level++
                break
            case 7:
                scene.setTileMapLevel(assets.tilemap`level07`)
                level++
                break
        }
    } else {
        console.log("Win;")
        apple.destroy()
        cherry.destroy()
        strawberry.destroy()
        enemy.destroy()
        projectileAdd.destroy()
        emerald.destroy()
        scene.setTileMapLevel(assets.tilemap`end`)
        effects.confetti.startScreenEffect(10000)
    }
})
