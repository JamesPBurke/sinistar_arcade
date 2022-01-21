function fireMissile () {
    missile.destroy()
    
}
function fireBullets (vx: number, vy: number) {
    for (let value of bullets) {
        value.destroy()
    }
    bullets = []
    for (let index = 0; index <= bcount - 1; index++) {
        bullets.push(sprites.create(bullet, SpriteKind.Projectile))
        bullets[index].setFlag(SpriteFlag.AutoDestroy, false)
        bullets[index].setPosition(sinistar.x, sinistar.y)
        bullets[index].setVelocity(Math.cos(3.1416 * 2 * index / bcount) * speed + vx, Math.sin(3.1416 * 2 * index / bcount) * speed + vy)
        pause(10)
    }
    fireball = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, sinistar, (ship.x - sinistar.x) * 3, (ship.y - sinistar.y) * 3)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.startEffect(effects.fire, 200)
    music.smallCrash.playUntilDone()
    otherSprite.destroy()
    scene.cameraShake(5, 500)
    info.changeLifeBy(-1)
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprite.destroy(effects.spray, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.startEffect(effects.fire, 200)
    music.pewPew.play()
    scene.cameraShake(6, 500)
})
let oldvely = 0
let oldvelx = 0
let fireball: Sprite = null
let bullets: Sprite[] = []
let missile: Sprite = null
let sinistar: Sprite = null
let bullet: Image = null
let bomb: Image = null
let speed = 0
let bcount = 0
let ship: Sprite = null
info.setLife(5)
let ship_f1 = assets.image`Ship n`
let ship_f2 = assets.image`Ship 2`
ship = sprites.create(assets.image`Ship 2`, SpriteKind.Player)
controller.moveSprite(ship)
bcount = 17
speed = 60
let sinistar_F0 = img`
    .................888888...888888.................
    .................888888...888888.................
    .................cccccc...cccccc.................
    ....d88........ccb6b6b68886b6b6bcc........88d....
    ....bdb88....8c8cbbbbbb8c8bbbbbbc8c8....88bdb....
    .....bbbb8.8888bcbbbbbbcccbbbbbbcb8888.8bbbb.....
    .....bbbbbb888bbcddddbbcccbbddddcbb888bbbbbb.....
    ......bbddddb8888bbbbbbc8cbbbbbb8888bddddbb......
    ......bbddddbbb88bbbb6688866bbbb88bbbddddbb......
    .......ddddbbbbbb6b66bbbbbbb66b6bbbbbbdddd.......
    .......bddbbbb6db68bbbbbbbbbbb86bd6bbbbddb.......
    ......22dbbbb6dbbb6bbbbbbbbbbb6bbbd6bbbbd22......
    .....222dbbb6dbbbbbbbbbbbbbbbbbbbbbd6bbbd222.....
    ....82222db6ddddbbbbbbbbbbbbbbbbbdddd6bd22228....
    ...8cbbbbdddddddddbbbbbbbbbbbbbdddddddddbbbbc8...
    ...cbbbdb6666bdddddbbbbb6bbbbbdddddb6666bdbbbc...
    ..8cbbdb6cbbb6bbdddddbbb6bbbdddddbb6bbbc6bdbbc8..
    ..cbbdb6cbbbbbbbbd1dddbbbbbddd1dbbbbbbbbc6bdbbc..
    ..8868cccddbbbbbbbbddddbbbddddbbbbbbbbddccc8688..
    dbbbbbbbbbdddbbdbbbbbdddddddbbbbbdbbdddbbbbbbbbbd
    8ddddddbbbbdddbdcccbbbdddddbbbcccdbdddbbbbdddddd8
    8c6ddddbbb6bddbc8f8cbb6bdb6bbc8f8cbddb6bbbdddd6c8
    8cb6bdddbbb6bdbcffcfcbbb6bbbcfcffcbdb6bbbdddb6bc8
    8cbbbbbddbbb8db68f2ffcbbbbbcff2f86bd8bbbddbbbbbc8
    86bddddbbddbdbbbbbb688bbbbb886bbbbbbdbddbbddddb68
    ..888ccccbbdddbbbbbbb6bbbbb6bbbbbbbdddbbcccc888..
    ..88ccccccc8ddd6bbbbbbbbcbbbbbbbb6ddd8ccccccc88..
    ..888cccccc8bddddd1dbbbbfbbbbd1dddddb8cccccc888..
    8cbbddddbb6bb6bddddb6bbf8fbb6bddddb6bb6bbddddbbc8
    8c6bdddbb6dbb6dddddbbbb8b8bbbbddddd6bbd6bbdddb6c8
    8c6bbddbdddbb61dddbbdbbbbbbbdbbddd16bbdddbddbb6c8
    8c6bddddbdddbb6dbbbbdbbdddbbdbbbbd6bbdddbddddb6c8
    86bddd111dbdbbbdbbbdddddddddddbbbdbbbdbd111dddb68
    ..cbdddbbb66dbbdbbb81db888bd18bbbdbbd66bbbdddbc..
    ..cbdbbbbbbb6dbdddbb1ddbbbdd1bbdddbd6bbbbbbbdbc..
    ..8bdbbbbbbbbdbddddbdddbbbdddbddddbdbbbbbbbbdb8..
    ...cbbbbbbbbdddbddddbdddddddbddddbdddbbbbbbbbc...
    ....2222222dddddbdddd1ddddd1ddddbddddd2222222....
    .....222222dddddbbddd1ddddd1dddbbddddd222222.....
    .....222222dddd1db6bddd111dddb6bd1dddd222222.....
    ......22222ddd11dbb66dbb6bbd66bbd11ddd22222......
    .......2222bddd1dddbb6688866bbddd1dddb2222.......
    ........222bbdddddddbbb8c8bbbdddddddbb222........
    .........c2bbbddbddddbb8c8bbddddbddbbb2c.........
    ..........cdbbbdbddddbbcccbbddddbdbbbdc..........
    ...........c6dbbbddddddcccddddddbbbd6c...........
    ...........88cbd611ddddcccdddd116dbc88...........
    .............88ccbb11ddcccdd11bbcc88.............
    ...............88bbbb1188811bbbb88...............
    .................6b6b6b...b6b6b6.................
    .................888888...888888.................
    `
let sinistar_F1 = img`
    .................888888...888888.................
    .................888888...888888.................
    .................cccccc...cccccc.................
    ....d88........ccb6b6b68886b6b6bcc........88d....
    ....bdb88....8c8cbbbbbb8c8bbbbbbc8c8....88bdb....
    .....bbbb8.8888bcbbbbbbcccbbbbbbcb8888.8bbbb.....
    .....bbbbbb888bbcddddbbcccbbddddcbb888bbbbbb.....
    ......bbddddb8888bbbbbbc8cbbbbbb8888bddddbb......
    ......bbddddbbb88bbbb6688866bbbb88bbbddddbb......
    .......ddddbbbbbb6b66bbbbbbb66b6bbbbbbdddd.......
    .......bddbbbb6db68bbbbbbbbbbb86bd6bbbbddb.......
    ......22dbbbb6dbbb6bbbbbbbbbbb6bbbd6bbbbd22......
    .....222dbbb6dbbbbbbbbbbbbbbbbbbbbbd6bbbd222.....
    ....82222db6ddddbbbbbbbbbbbbbbbbbdddd6bd22228....
    ...8cbbbbdddddddddbbbbbbbbbbbbbdddddddddbbbbc8...
    ...cbbbdb6666bdddddbbbbb6bbbbbdddddb6666bdbbbc...
    ..8cbbdb6cbbb6bbdddddbbb6bbbdddddbb6bbbc6bdbbc8..
    ..cbbdb6cbbbbbbbbd1dddbbbbbddd1dbbbbbbbbc6bdbbc..
    ..8868cccddbbbbbbbbddddbbbddddbbbbbbbbddccc8688..
    dbbbbbbbbbdddbbdbbbbbdddddddbbbbbdbbdddbbbbbbbbbd
    8ddddddbbbbdddbdcccbbbdddddbbbcccdbdddbbbbdddddd8
    8c6ddddbbb6bddbc828cbb6bdb6bbc828cbddb6bbbdddd6c8
    8cb6bdddbbb6bdbc22c2cbbb6bbbc2c22cbdb6bbbdddb6bc8
    8cbbbbbddbbb8db682222cbbbbbc222286bd8bbbddbbbbbc8
    86bddddbbddbdbbbbbb688bbbbb886bbbbbbdbddbbddddb68
    ..888ccccbbdddbbbbbbb6bbbbb6bbbbbbbdddbbcccc888..
    ..88ccccccc8ddd6bbbbbbbbcbbbbbbbb6ddd8ccccccc88..
    ..888cccccc8bddddd1dbbbbfbbbbd1dddddb8cccccc888..
    8cbbddddbb6bb6bddddb6bbf8fbb6bddddb6bb6bbddddbbc8
    8c6bdddbb6dbb6dddddbbbb8b8bbbbddddd6bbd6bbdddb6c8
    8c6bbddbdddbb61dddbbdbbbbbbbdbbddd16bbdddbddbb6c8
    8c6bddddbdddbb6dbbbbdbbdddbbdbbbbd6bbdddbddddb6c8
    86bddd111dbdbbbdbbbdddddddddddbbbdbbbdbd111dddb68
    ..cbdddbbb66dbbdbbb81db888bd18bbbdbbd66bbbdddbc..
    ..cbdbbbbbbb6dbdddbb1ddbbbdd1bbdddbd6bbbbbbbdbc..
    ..8bdbbbbbbbbdbddddbdddbbbdddbddddbdbbbbbbbbdb8..
    ...cbbbbbbbbdddbddddbdddddddbddddbdddbbbbbbbbc...
    ....2222222dddddbdddd1ddddd1ddddbddddd2222222....
    .....222222dddddbbddd1ddddd1dddbbddddd222222.....
    .....222222dddd1db6bddd111dddb6bd1dddd222222.....
    ......22222ddd11dbb66dbb6bbd66bbd11ddd22222......
    .......2222bddd1dddbb6688866bbddd1dddb2222.......
    ........222bbdddddddbbb8c8bbbdddddddbb222........
    .........c2bbbddbddddbb8c8bbddddbddbbb2c.........
    ..........cdbbbdbddddbbcccbbddddbdbbbdc..........
    ...........c6dbbbddddddcccddddddbbbd6c...........
    ...........88cbd611ddddcccdddd116dbc88...........
    .............88ccbb11ddcccdd11bbcc88.............
    ...............88bbbb1188811bbbb88...............
    .................6b6b6b...b6b6b6.................
    .................888888...888888.................
    `
bomb = img`
    . . . . 8 8 . . . 8 8 . . . . 
    . . . . 8 8 8 2 8 8 8 . . . . 
    . . . 2 c 8 c c c 8 c 2 . . . 
    . . 8 2 8 8 8 c 8 8 8 2 8 . . 
    . 8 8 8 c 8 c c c 8 c 8 8 8 . 
    8 8 8 8 8 8 b b b 8 8 8 8 8 8 
    . 8 c 8 c b d b b b c 8 c 8 . 
    . c d d d d b 2 6 b c c 2 c . 
    . 8 c 8 c b b 6 b b c 8 c 8 . 
    8 8 8 8 8 8 b b b 8 8 8 8 8 8 
    . 8 8 8 c 8 c c c 8 c 8 8 8 . 
    . . 8 2 8 8 8 c 8 8 8 2 8 . . 
    . . . 2 c 8 c c c 8 c 2 . . . 
    . . . . 8 8 8 2 8 8 8 . . . . 
    . . . . 8 8 . . . 8 8 . . . . 
    `
bullet = img`
    . 7 . 
    7 2 7 
    . 7 . 
    `
sinistar = sprites.create(sinistar_F0, SpriteKind.Enemy)
sinistar.setPosition(350, 110)
animation.runImageAnimation(
sinistar,
[sinistar_F0, sinistar_F1],
500,
true
)
animation.runImageAnimation(
ship,
[ship_f1, ship_f2],
100,
true
)
tiles.setTilemap(tilemap`level1`)
scene.cameraFollowSprite(ship)
missile = sprites.create(bomb, SpriteKind.Projectile)
missile.destroy()
game.onUpdate(function () {
    oldvelx = sinistar.vx
    oldvely = sinistar.vy
    sinistar.setVelocity((ship.x - sinistar.x) / 4 + oldvelx / 1.5, (ship.y - sinistar.y) / 4 + oldvely / 1.5)
})
game.onUpdateInterval(5000, function () {
    fireBullets(sinistar.vx, sinistar.vy)
})
game.onUpdateInterval(8000, function () {
    fireMissile()
})
