// Some Strange Game
scene.setTileMapLevel(assets.tilemap`title-map`)
game.splash("Some Strange Game")
console.log("Begin;")

let gameMusic = "C:2 D:2 E:2 F:2 G:8 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:2 G:2 F:2 E:2 D:2 E:4 D:4 C:4"
let gameMelody = "C5 B A G E G E G "
let musicOption = 1
let level = 1
let levelShake = true

/* used to switch levels */
const switchLevel = (option: number) => {
    switch (option) {
        case 0:
            scene.setTileMapLevel(assets.tilemap`title-map`)
            break
        case 1:
            scene.setTileMapLevel(assets.tilemap`level-1-map`)
            break
        case 2:
            scene.setTileMapLevel(assets.tilemap`level-2-map`)
            break
        case 3:
            scene.setTileMapLevel(assets.tilemap`level-3-map`)
            break
        case 4:
            scene.setTileMapLevel(assets.tilemap`level-4-map`)
            break
        case 5:
            scene.setTileMapLevel(assets.tilemap`level-5-map`)
            break
        case 6:
            scene.setTileMapLevel(assets.tilemap`level-6-map`)
            break
        case 7:
            scene.setTileMapLevel(assets.tilemap`level-7-map`)
            break
    }
}

// Setup
// Music Setup
forever(() => {
    if (musicOption == 1) {
        music.playSoundUntilDone(gameMusic)
    } else if (musicOption == 2) {
        music.playMelody(gameMelody, 120)
    }
})
console.log("Music started;")

// Sprite Creation
/* used to set a random position for sprites */
const spriteSetRandPos = (sprite: Sprite) => {
    let randomLocationX = Math.floor(Math.randomRange(0, 64) * 4)
    let randomLocationY = Math.floor(Math.randomRange(0, 64) * 4)
    sprite.setPosition(randomLocationX, randomLocationY)
}
// Player Setup
let player = sprites.create(assets.image`player`, SpriteKind.Player)
controller.moveSprite(player) // setup controller
info.setLife(3) // set lives
scene.cameraFollowSprite(player) // camera follow player
scene.setTileMapLevel(assets.tilemap`level-1-map`)
let projectilesLeft = 10
console.log("Setup sprite (player);")

// Enemy Setup
let enemy = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
enemy.follow(player, 50, 50) // make enemy follow player
spriteSetRandPos(enemy)
let enemyLives = 5

// Apple Setup
let apple = sprites.create(assets.image`apple`, SpriteKind.Food)
spriteSetRandPos(apple)

// +1 Projectile Setup
let projectileAddKind = SpriteKind.create()
let projectileAdd = sprites.create(assets.image`projectile-add`, projectileAddKind)
spriteSetRandPos(projectileAdd)

// Emerald Setup
let emeraldKind = SpriteKind.create()
let emerald = sprites.create(assets.image`emerald`, emeraldKind)
game.onUpdateInterval(1000, () => {
    animation.runImageAnimation(emerald, assets.animation`emeraldShine`, 200, false)
})
spriteSetRandPos(emerald)

// Menu
controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
    let option = game.askForNumber("Menu. [1] Music [2] Shake [0] Close", 1)
    if (option == 1) {
        let musicOptionT = game.askForNumber("Choose 1 or 2", 1)
        if (musicOptionT == 1) {
            music.stopAllSounds()
            musicOption = 1
        } else if (musicOptionT == 2) {
            music.stopAllSounds()
            musicOption = 2
        } else {
            console.log("Error: Number wrong;")
            game.ask("Error: Number wrong")
        }
    } else if (option == 2) {
        levelShake = game.ask("Turn on shake on level switch?")
    } else if (option == 0) {
        console.log("Menu closed;")
    } else {
        console.log("Error: Number wrong;")
        game.ask("Error: Number wrong")
    }
}) 

// Secret Menu
controller.combos.attachCombo("ududlrau+a", () => {
    let option = game.askForNumber("Level Selector. Choose a level: ", 1)
    if (option <= 7) {
        switchLevel(option)
        level = option
    } else {
        console.log("Error: Number wrong;")
        game.ask("Error: Number wrong")
    }
})

// Background Loop
forever(() => {
    if (enemyLives == 0) {
        enemy.destroy()
    }
    info.setScore(projectilesLeft)
})

// Main Loop
// Projectile Shooting
controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    if (projectilesLeft > 0) {
        // record direction moving
        let directionX = controller.dx() * 100
        let directionY = controller.dy() * 100
        // if not moving, set the directionX and directionY to shoot right
        if (directionX == 0 && directionY == 0) {
            directionX = 100
            directionY = 0
        }
        // create projectile in direction moving (or just right)
        let projectile = sprites.createProjectileFromSprite(assets.image`projectile`, player, directionX, directionY)
        projectilesLeft--
        console.log("Projectile shot;")
    } else {
        music.playSound("C:1")
        console.log("No projectiles left;")
    }
})

// Player Uses Food
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, (playerItem: Sprite, foodItem: Sprite) => {
    console.log("food eaten by player;")
    playerItem.sayText("Tasty!", 500, true)
    music.playSound("C:1 G:1")
    animation.runImageAnimation(playerItem, assets.animation`eating`, 200, false) // eating animation
    info.changeLifeBy(+1) // add 1 life
    spriteSetRandPos(foodItem) // randpos food
})

// Enemy Hurts Player
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, (enemyItem: Sprite, playerItem: Sprite) => {
    console.log("player hurt by enemy;")
    playerItem.sayText("Ouch!", 500, true)
    music.playSound("C:1 C:1")
    info.changeLifeBy(-1) // remove 1 life
    spriteSetRandPos(enemyItem) // randpos enemy
})

// Player (projectile) Hurts Enemy
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, (projectileItem: Sprite, enemyItem: Sprite) => {
    console.log("enemy hurt by projectile;")
    enemyItem.sayText("Ouch!", 500, true)
    music.playSound("C:1 G:1")
    spriteSetRandPos(enemyItem)
    enemyLives--
})

// Player Uses ProjectileAdd
sprites.onOverlap(SpriteKind.Player, projectileAddKind, (playerItem: Sprite, projectileAddItem: Sprite) => {
    console.log("projectileAdd picked up by player;")
    playerItem.sayText("Yeah!", 500, true)
    music.playSound("C:1 G:1")
    animation.runImageAnimation(playerItem, assets.animation`projectile-add-anim`, 200, false)
    spriteSetRandPos(projectileAddItem)
    projectilesLeft++
})

// Emerald Overlap
sprites.onOverlap(SpriteKind.Player, emeraldKind, (playerItem: Sprite, emeraldItem: Sprite) => {
    console.log("Next level;")

    // a little camera shake (if turned on)
    if (levelShake) {
        scene.cameraShake(4, 500)
    }

    // go to next level
    if (level < 7) {
        // set random locations
        spriteSetRandPos(apple)
        spriteSetRandPos(enemy)
        spriteSetRandPos(projectileAdd)
        spriteSetRandPos(emerald)

        // Next Level
        let upNext = level + 1
        // let nextLevel = assets.image`level-${upNext}-map`
        switchLevel(upNext)
        level++
    } else {
        console.log("Win;")

        // destroy all sprites
        apple.destroy()
        enemy.destroy()
        projectileAdd.destroy()
        emerald.destroy()

        // set ending tilemap
        scene.setTileMapLevel(assets.tilemap`title-map`)

        // add confetti effect
        effects.confetti.startScreenEffect(120000)

        // credits
        player.sayText("Thanks for playing!", 3000, true)
    }
})
