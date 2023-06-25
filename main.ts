// Some Strange Game
scene.setBackgroundImage(assets.image`backgroundImage`)
scene.setTileMapLevel(assets.tilemap`title-map`)
game.splash("Some Strange Game")
console.log("Begin;")

let gameMusic = "C:2 D:2 E:2 F:2 G:8 G:2 F:2 E:2 D:2 E:4 D:4 C:4 C:2 D:2 E:2 F:2 G:2 G:2 F:2 E:2 D:2 E:4 D:4 C:4"
let gameMelody = "C5 B A G E G E G "
let musicOption = 1
let level = 1
let levelShake = true

const levelAmount = 11

/* used to switch levels */
function switchLevel(option: number) {
    if (option <= levelAmount) {
        switch (option) {
            case -1:
                scene.setTileMapLevel(assets.tilemap`testing-map`)
                break
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
            case 8:
                scene.setTileMapLevel(assets.tilemap`level-8-map`)
                break
            case 9:
                scene.setTileMapLevel(assets.tilemap`level-9-map`)
                break
            case 10:
                scene.setTileMapLevel(assets.tilemap`level-10-map`)
                break
            case 11:
                scene.setTileMapLevel(assets.tilemap`level-11-map`)
                break
        }
    } else {
        console.log("Number wrong;")
    }
}

function reroll() {
    spriteSetRandPos(apple)
    spriteSetRandPos(enemy)
    spriteSetRandPos(projectileAdd)
    spriteSetRandPos(emerald)
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

let originalMusicOption = musicOption
function pauseMusic() {
    originalMusicOption = musicOption
    music.stopAllSounds()
    musicOption = 0
}

function resumeMusic() {
    musicOption = originalMusicOption
}

const imageKind = SpriteKind.create()

// Sprite Creation
/* used to set a random position for sprites */
function spriteSetRandPos(sprite: Sprite) {
    let randomLocationX = Math.floor(Math.randomRange(0, tiles.tilemapRows()) * 16)
    let randomLocationY = Math.floor(Math.randomRange(0, tiles.tilemapColumns()) * 16)
    sprite.setPosition(randomLocationX, randomLocationY)
    // tiles.placeOnRandomTile(sprite, assets.tile`grass`) // seems interesting, but tested and doesn't really follow the `grass` rule
}

// Player Setup
let player = sprites.create(assets.image`player`, SpriteKind.Player)
// controller.moveSprite(player) // setup controller
info.setLife(3) // set lives
scene.cameraFollowSprite(player) // camera follow player
scene.setTileMapLevel(assets.tilemap`level-1-map`)
let projectilesLeft = 10
game.onUpdate(() => {
    if (!menuIsVisible) {
        player.x += controller.dx() /* 1.1 */
        player.y += controller.dy() /* 1.1 */
    }
})

// Enemy Setup
let enemy = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
spriteSetRandPos(enemy)
let enemyLives = 5
let enemySpeed = 50
forever(() => {
    if (!menuIsVisible) {
        enemy.follow(player, enemySpeed, 50)
    } else {
        enemy.follow(null, 0, 0)
    }
})

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
    animation.runImageAnimation(emerald, assets.animation`anim-emerald-shine`, 200, false)
})
spriteSetRandPos(emerald)

// Menu
// controller.B.onEvent(ControllerButtonEvent.Pressed, menu)
let menuIsVisible = false
controller.menu.onEvent(ControllerButtonEvent.Pressed, menu)

function menu() {
    if (!(menuIsVisible)) {
        menuIsVisible = true
        pauseMusic()
        controller.moveSprite(null)

        const menuSprite = miniMenu.createMenuFromArray([
            miniMenu.createMenuItem("Music", assets.image`icon-music`),
            miniMenu.createMenuItem("Shake", assets.image`icon-none`),
            miniMenu.createMenuItem("Reroll", assets.image`icon-reroll`),
            miniMenu.createMenuItem("Debug", assets.image`icon-information`),
            miniMenu.createMenuItem("Close", assets.image`icon-close`),
        ])
        menuSprite.setTitle("Game Menu")
        menuSprite.setDimensions((scene.screenWidth() - 30), (scene.screenHeight() - 30))
        menuSprite.setPosition(scene.cameraProperty(CameraProperty.Left) + 15, scene.cameraProperty(CameraProperty.Top) + 15)
        scene.cameraFollowSprite(null)

        // menuSprite.setMenuStyleProperty(miniMenu.MenuStyleProperty.Padding, 4)
        // menuSprite.setMenuStyleProperty(miniMenu.MenuStyleProperty.Border, 1)
        // menuSprite.setMenuStyleProperty(miniMenu.MenuStyleProperty.BorderColor, 2)
        // menuSprite.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 2)
        // menuSprite.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 2)

        // menuSprite.onSelectionChanged(function (_selection, _selectedIndex) {
        //     // music.ringTone(Note.E)
        //     music.tonePlayable(Note.E, BeatFraction.Quarter)
        // })

        menuSprite.onButtonPressed(controller.A, function (selection, _selectedIndex) {
            // music.ringTone(Note.G)
            // music.tonePlayable(Note.G, BeatFraction.Quarter)
            switch (selection) {
                default: {
                    break
                }
                case "Music": {
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
                    break
                }
                case "Shake": {
                    levelShake = game.ask("Would you like to shake on level switch?")
                    break
                }
                case "Reroll": {
                    if (game.ask("Are you sure you want to reroll this level?"))
                        reroll()
                    break
                }
                case "Debug": {
                    info.setLife(9999)
                    break
                }
            }

            menuSprite.close()
            menuIsVisible = false
            resumeMusic()
            scene.cameraFollowSprite(player)
            controller.moveSprite(player)
        })
    }
}

// Secret Menu
controller.combos.attachCombo("ududlrau+a", () => {
    let option = game.askForNumber("Level Selector. Choose a level: ", 2)
    if (option <= levelAmount) {
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
    if (!menuIsVisible) {
        if (projectilesLeft > 0) {
            // record direction moving
            let velocityX = controller.dx() * 100
            let velocityY = controller.dy() * 100
            // if not moving, set the directionX and directionY to shoot right
            if (velocityX == 0 && velocityY == 0) {
                velocityX = 100
                velocityY = 0
            }
            // create projectile in direction moving (or just right)
            let projectile = sprites.createProjectileFromSprite(assets.image`projectile`, player, velocityX, velocityY)
            projectilesLeft--
            console.log("Projectile shot;")
        } else {
            music.playSound("C:1")
            console.log("No projectiles left;")
        }
    }
})

// Player Uses Food
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, (playerItem: Sprite, foodItem: Sprite) => {
    console.log("food eaten by player;")
    playerItem.sayText("Tasty!", 500, true)
    music.playSound("C:1 G:1")
    animation.runImageAnimation(playerItem, assets.animation`anim-player-eating`, 200, false) // eating animation
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
    animation.runImageAnimation(playerItem, assets.animation`anim-player-projectileadd`, 200, false)
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
    if (level < levelAmount) {
        // set random locations
        reroll()

        enemySpeed += 5

        // Next Level
        let upNext = level + 1
        // let nextLevel = assets.tilemap(`level-${upNext}-map`)
        // let nextLevel = assets.image`level-${upNext}-map`
        // scene.setTileMapLevel(nextLevel)
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
