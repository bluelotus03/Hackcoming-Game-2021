// initialize context
kaboom(
  {
    width: 800,
    height: 500,
    // background: [179, 209, 249,], // take these values and put them over /255 get's values below
    clearColor: [0.7019607843137255, 0.8196078431372549, 0.9764705882352941, 1],
    global: true,
  }
);

let args = {}
// constants
const MOVE_SPEED = 200
const JUMP_FORCE = 580
const BIG_JUMP_FORCE = 850
const MAGIC_SPEED = 400
const SNOWBALL_SPEED = 200
const ENEMY_SPEED = 40
const FALL_DEATH = 600
const scoreScale = 2
// i.e. when you win or lose
const conditionSceneTextScale = 5


// load sprites
loadSprite("santa", "sprites/santa.png");
loadSprite("mystery-box", "sprites/mystery-box.png");
loadSprite("mystery-box2", "sprites/mystery-box2.png");
loadSprite("background-tile", "sprites/background-tile.png");
loadSprite("block-4", "sprites/block-4.png");
loadSprite("block-2", "sprites/block-2.png");
loadSprite("block-5", "sprites/block-5.png");
loadSprite("block-3", "sprites/block-3.png");
loadSprite("present2", "sprites/present2.png");
loadSprite("present", "sprites/present.png");
loadSprite("lighting_yellow", "sprites/lighting_yellow.png");
loadSprite("explosion", "sprites/explosion.png");
loadSprite("candy-cane2", "sprites/candy-cane2.png");
loadSprite("candy-cane", "sprites/candy-cane.png");
loadSprite("bunny-enemy", "sprites/bunny-enemy.png");
loadSprite("brown-block", "sprites/brown-block.png");
loadSprite("wingMan1", "sprites/wingMan1.png");
loadSprite("unboxed", "sprites/unboxed.png");
loadSprite("tree", "sprites/tree.png");
loadSprite("sharp-spike1", "sprites/sharp-spike1.png");
loadSprite("lamp-post", "sprites/lamp-post.png");
loadSprite("arrowRight", "sprites/arrowRight.png");
loadSprite("arrowLeft", "sprites/arrowLeft.png");
loadSprite("buttonStart", "sprites/buttonStart.png");
loadSprite("arrowUp", "sprites/arrowUp.png");
// loadPedit("magic", "sprites/magic.pedit");
loadSprite("lightning-blue", "sprites/lightning-blue.png");
loadSprite("environment", "sprites/environment.png");
loadSprite("play-button", "sprites/play-button.png");
loadSprite("instructions", "sprites/instructions.png");
loadSprite("win-scene", "sprites/win-scene.png");
loadSprite("lose-scene", "sprites/lose-scene.png");
// loadPedit("enemy", "sprites/enemy.pedit");

// load sounds
loadSound("collectGift", "sounds/collectGift.mp3");
loadSound("gameplay", "sounds/gameplay.mp3");
loadSound("gameplay2", "sounds/gameplay2.mp3");
loadSound("fallOff", "sounds/fallOff.mp3");
loadSound("levelUp", "sounds/levelUp.mp3");
loadSound("jumpOnEnemy", "sounds/jumpOnEnemy.ogg");
loadSound("introMusic", "sounds/introMusic.mp3");
loadSound("hitWithSnowBall", "sounds/hitWithSnowBall.mp3");
loadSound("grow", "sounds/grow.mp3");
loadSound("giftReveal", "sounds/giftReveal.mp3");
loadSound("grow", "sounds/grow.mp3");
loadSound("shoot", "sounds/shoot.ogg");
loadSound("score", "sounds/score.mp3");
loadSound("runIntoEnemy", "sounds/runIntoEnemy.mp3");
loadSound("mouseClick", "sounds/mouseClick.mp3");
loadSound("loseScene", "sounds/loseScene.mp3");
loadSound("levelUp", "sounds/levelUp.mp3");
loadSound("jumpOnEnemy", "sounds/jumpOnEnemy.ogg");
loadSound("introMusic", "sounds/introMusic.mp3");
loadSound("hitWithSnowBall", "sounds/hitWithSnowBall.mp3");
loadSound("winScene", "sounds/winScene.mp3");
loadSound("shrink", "sounds/shrink.mp3");



/* --------------- SCENES -----------------*/
// TO-DO: win scene

// add layers
layers(['bg', 'obj', 'ui'], 'obj')

// map creation
const maps = [
  [
    '                         =%            ',
    '                                       ',
    '                                       ',
    '                                       ',
    '                                       ',
    '                                       ',
    '    =z               ^                 ',
    '          b                            ',
    '                 =*=%=                 ',
    '                                       ',
    '          ====                         ',
    't                           tt         ',
    '                                     | ',
    '                   ^                   ',
    '                                       ',
    '===============================  ======',
  ], [
    '                         =%            ',
    '                                       ',
    '                                       ',
    '                         ^             ',
    '                                   =*  ',
    '                                       ',
    '                ^                      ',
    '                                       ',
    '            _*_z_                      ',
    '         b                             ',
    '       __                              ',
    'f                           tt         ',
    '                                     | ',
    '                         ^             ',
    '                                       ',
    '_______________________________  ______',
  ],
  [
    '                                       ',
    '    w                                  ',
    '                                       ',
    '                                       ',
    '              w          -*-           ',
    '                                       ',
    '                                 w     ',
    '                  w                    ',
    '                     -%-%-             ',
    '                                       ',
    '       --                              ',
    'f                           tt         ',
    '                                     | ',
    '                                       ',
    '                                       ',
    '-------------------------------  ------',
  ],
]

const levelCfg = {
  width: 20,
  height: 20,
  '=': () => [sprite('block-4'), 'ground', 'block', solid(), scale(0.35)],
  '$': () => [sprite('present'), 'green-present', 'gift', solid(), scale(0.9)],
  'j': () => [sprite('candy-cane2'), 'candy-cane', 'gift', solid(), scale(0.35)],
  'l': () => [sprite('lightning-blue'), 'lightning-blue', 'gift', solid(), scale(0.2)],
  '%': () => [sprite('mystery-box2'), 'present-surprise', 'surprise-box', solid(), scale(0.35)],
  '*': () => [sprite('mystery-box2'), 'candy-cane-surprise', 'surprise-box', solid(), scale(0.35)],
  'z': () => [sprite('mystery-box2'), 'lightning-surprise', 'surprise-box', solid(), scale(0.35)],
  '\}': () => [sprite('unboxed'), solid(), scale(0.35)],
  '|': () => [sprite('lamp-post'), 'post', solid()],
  '^': () => [sprite('bunny-enemy'), 'enemy', 'b-enemy', 'bleft', solid(), scale(0.2), body(), { dir: 1 }],
  'b': () => [sprite('bunny-enemy'), 'enemy', 'b-enemy', 'bright', solid(), scale(0.2), body(), { dir: 1 }],
  '-': () => [sprite('block-2'), 'ground', 'melting', solid(), scale(0.35)],
  '_': () => [sprite('block-3'), 'ground', 'melting', solid(), scale(0.35)],
  'x': () => [sprite('block-5'), 'ground', solid(), scale(0.35)],
  't': () => [sprite('tree'), 'right-tree', 'tree', solid(), scale(0.45)],
  'f': () => [sprite('tree'), 'left-tree', 'tree', solid(), scale(0.45)],
  'w': () => [sprite('wingMan1'), 'enemy', 's-enemy', solid(), scale(0.3), { dir: 1 }],
}

let introMusic;
// menu scene
scene('menu', () => {

  // intro music
  introMusic = play("introMusic", {
    volume: 0.3,
    loop: true
  })

  // add background image
  add([
    sprite('instructions'),
    layer('bg'),
    origin('center'),
    pos(width() / 2, height() / 2),
    scale(1)
  ])

  // add play button 
  const playButton = add([
    sprite('play-button'),
    layer('bg'),
    origin('center'),
    pos(658, 410),
    scale(.15),
    area(),
    'play'
  ])

  // TODO: figure out how to detect which object is clicked
  mouseClick(() => {
    play('mouseClick', {
      volume: 0.8,
    })
    go('game', { level: 0, score: 0, prev_music: introMusic })
  })

})

// game scene
scene('game', ({ level, score, prev_music }) => {

  prev_music.pause()

  // gameplay music
  gameplayMusic = play("gameplay", {
    volume: 0.3,
    loop: true
  })

  // add layers
  layer(['bg', 'obj', 'ui'], 'obj')

  // variables
  let CURRENT_JUMP_FORCE = JUMP_FORCE
  let CURRENT_E_SPEED = -ENEMY_SPEED
  let CURRENT_S_SPEED = ENEMY_SPEED
  let isJumping = true

  // add background
  add([
    sprite('environment'),
    layer('bg'),
    origin('topleft'),
    scale(width() / 240, height() / 240),
    scale(1)
  ])

  const gameLevel = addLevel(maps[level], levelCfg)

  // add a score
  const scoreLabel = add([
    text(score),
    pos(20, 6),
    layer('ui'),
    {
      value: score,
    },
    scale(scoreScale),
    // fixed()
  ])

  // add level numbers
  add([
    text('level ' + parseInt(level + 1)),
    pos(90, 6),
    {
      value: level,
    },
    scale(scoreScale),
    // fixed()
  ])

  // add player
  const player = add([sprite('santa'), pos(50, 0), body(), big(), scale(.65), origin('bot')])

  // add camera movement
  player.action(() => {
    camPos(player.pos)
    if (player.pos.y >= FALL_DEATH) {
      play('fallOff', {
        volume: 0.8,
      })
      died( level, scoreLabel.value, gameplayMusic)
    }
  })

  // keystroke events
  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
  })

  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })

  player.action(() => {
    if (player.grounded()) {
      isJumping = false
    }
  })

  keyPress('space', () => {
    if (player.grounded()) {
      isJumping = true
      player.jump(CURRENT_JUMP_FORCE)
    }
  })

  keyDown('up', () => {
    spawnMagic(player.pos.add(0, -35))
  })

  keyDown('s', () => {
    play('shoot', {
      volume: 0.8,
    })
    spawnSnowBall(player.pos.add(0, -35))
  })

  // add magic motion
  action('magic', (m) => {
    m.move(0, -MAGIC_SPEED)
    if (m.pos.y < 0) {
      destroy(m)
    }
  })


  // add snowball motion
  action('snowball', (s) => {
    s.move(0, -SNOWBALL_SPEED)
    if (s.pos.y < 0) {
      destroy(s)
    }
  })

  // add bunny enemy motion
  action('bleft', (b) => {
    b.move(CURRENT_E_SPEED * b.dir, 0)
  })

  // add bunny enemy motion
  action('bright', (b) => {
    b.move(-CURRENT_E_SPEED * b.dir, 0)
  })

  // add sunbeam enemy motion
  action('s-enemy', (s) => {
    s.move(0, CURRENT_S_SPEED * s.dir)
    if (s.pos.y < 0) {
      s.dir *= s.dir
    }
  })

  /* -------------------------- COLLISIONS ------------------------ */

  /* *********** santa projectile -> items block ************** */

  // -- magic collides with boxes -- 
  // surprise box - green present 
  collides('magic', 'present-surprise', (m, p) => {
    play('giftReveal', {
      volume: 0.5,
    })
    gameLevel.spawn('$', p.gridPos.sub(1, 2))
    gameLevel.spawn('=', p.gridPos.sub(0, 0))
    destroy(m)
  })

  // surprise box - candy cane
  collides('magic', 'candy-cane-surprise', (m, c) => {
    play('giftReveal', {
      volume: 0.5,
    })
    gameLevel.spawn('j', c.gridPos.sub(0, 1))
    gameLevel.spawn('=', c.gridPos.sub(0, 0))
    destroy(m)
  })

  // surprise box - blue lightning
  collides('magic', 'lightning-surprise', (m, l) => {
    play('giftReveal', {
      volume: 0.5,
    })
    gameLevel.spawn('l', l.gridPos.sub(0, 1.5))
    gameLevel.spawn('=', l.gridPos.sub(0, 0))
    destroy(m)
  })

  /* *********** santa projectile -> enemies ************** */

  // -- enemies collide with objects --
  // TO-DO: Change to box
  collides('s-enemy', 'snowball', (e, s) => {
    play('hitWithSnowBall')
    destroy(e)
    destroy(s)
  })


  /* *********** santa projectile -> blocks ************** */

  // regular block
  collides('projectile', 'block', (p, b) => {
    destroy(p)
  })

  // snowball restore melting snow box
  collides('snowball', 'melting', (s, m) => {
    play('hitWithSnowBall', {
      volume: 0.5,
    })
    gameLevel.spawn('=', m.gridPos.sub(0, 0))
    destroy(s)
    destroy(m)
    scoreLabel.value += 15
    scoreLabel.text = scoreLabel.value
  })


  /* *********** santa -> objects ************** */

  // blue lightning
  player.collides('lightning-blue', (b) => {
    player.biggify(7)
    destroy(b)
  })

  // green present
  player.collides('green-present', (g) => {
    play('collectGift', {
      volume: 0.5,
    })
    destroy(g)
    scoreLabel.value += 10
    scoreLabel.text = scoreLabel.value
  })

  // candy cane
  player.collides('candy-cane', (c) => {
    play('collectGift', {
      volume: 0.5,
    })
    destroy(c)
    scoreLabel.value += 10
    scoreLabel.text = scoreLabel.value
  })

  /* *********** enemy collides -> object/block ************** */

  collides('b-enemy', 'tree', (b, t) => {
    b.dir = -b.dir
  })
  collides('b-enemy', 'b-enemy', (b, t) => {
    b.dir = -b.dir
  })
  collides('s-enemy', 'ground', (s, g) => {
    // maybe needs a bit more help to get off the ground?
    // don't know what need to do *= ... 🙃
    s.dir *= -s.dir
  })


  // bunny enemies
  player.collides('b-enemy', (b) => {
    if (isJumping) {
      play('jumpOnEnemy', {
        volume: 0.9,
      })
      destroy(b)
      scoreLabel.value += 5
      scoreLabel.text = scoreLabel.value
    } else {
      play('runIntoEnemy', {
        volume: 0.5,
      })
      died( level, scoreLabel.value, gameplayMusic)
    }
  })

  // sunbeam enemies
  player.collides('s-enemy', (s) => {
    if (isJumping) {
      play('jumpOnEnemy', {
        volume: 0.9,
      })
      destroy(s)
      scoreLabel.value += 5
      scoreLabel.text = scoreLabel.value
    } else {
      play('runIntoEnemy', {
        volume: 0.5,
      })
      died( level, scoreLabel.value, gameplayMusic)
    }
  })

  // lamp post 
  player.collides('post', (p) => {
    scoreLabel.value += 100
    scoreLabel.text = scoreLabel.value
    level_up(level, scoreLabel.value, gameplayMusic)
  })
})

// lose scene  
scene('lose', ({ level, score, prev_music }) => {

  prev_music.pause()

  // lose scene music
  loseMusic = play("loseScene", {
    volume: 0.3,
    loop: true
  })

  add([
    sprite('lose-scene'),
    layer('bg'),
    origin('center'),
    pos(width() / 2, height() / 2),
    scale(1)
  ])

  add([
    text('Score: ' + score),
    origin('center'),
    pos(388, 292),
    scale(conditionSceneTextScale)
  ])

  add([
    sprite('play-button'),
    layer('bg'),
    origin('center'),
    pos(width() / 2, 395),
    scale(.07),
    area(),
    'play'
  ])
  // TODO: figure out how to detect which object is clicked
  mouseClick(() => {
    loseMusic.pause()
    play('mouseClick', {
      volume: 0.8,
    })
    go('game', { level: 0, score: 0, prev_music: loseMusic })
  })
})

// win scene
scene('win', ({ level, score, prev_music }) => {

  prev_music.pause()

  // win scene music
  winMusic = play("winScene", {
    volume: 0.3,
    loop: true
  })

  add([
    sprite('win-scene'),
    layer('bg'),
    origin('center'),
    pos(width() / 2, height() / 2),
    scale(1)
  ])

  add([
    text('Score: ' + score),
    origin('center'),
    pos(388, 292),
    scale(conditionSceneTextScale)
  ])

  add([
    sprite('play-button'),
    layer('bg'),
    origin('center'),
    pos(width() / 2, 395),
    scale(.07),
    area(),
    'play'
  ])
  // TODO: figure out how to detect which object is clicked
  mouseClick(() => {
    winMusic.pause()
    play('mouseClick', {
      volume: 0.8,
    })
    go('game', { level: 0, score: 0, prev_music: winMusic })
  })
})

/* ************************ all functions ************************** */

/* *********** santa ************** */
// make santa grow 
function big() {
  let timer = 0
  let isBig = false
  return {
    update() {
      if (isBig) {
        timer -= dt()
        if (timer <= 0) {
          this.smallify()
        }
      }
    },
    isBig() {
      return isBig
    },
    smallify() {
      play('shrink', {
        volume: 0.8,
      })
      this.scale = vec2(.65)
      timer = 0
      isBig = false
      CURRENT_JUMP_FORCE = JUMP_FORCE
    },
    biggify(time) {
      play('grow', {
        volume: 0.5,
      })
      this.scale = vec2(1)
      timer = time
      isBig = true
      CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
    }
  }
}

// add snowball shooting
function spawnSnowBall(p) {
  add([
    rect(6, 6),
    pos(p),
    origin('center'),
    color(255, 255, 255),
    'snowball',
    'projectile'
  ])
}

//TO-DO: use magic image if possible
// add magic casting
function spawnMagic(p) {
  add([
    rect(3, 3),
    pos(p),
    origin('center'),
    color(44, 171, 77),
    'magic',
    'projectile'
  ])
}


/* *********** utility ************** */

function level_up(level, score, music) {
  // we never want them to be equal to num of maps, because
  //  they'll hit an out of bounds if they do
  if (level === (maps.length - 1)) {
    go('win', {
      level: level,
      score: score,
      prev_music: music
    })
  } else {
    play('levelUp', {
      volume: 0.5,
    })
    go('game', {
      level: (level + 1),
      score: score,
      prev_music: music
    })
  }
}

function died(level, score, music) {

  go('lose', {
    level: level,
    score: score,
    prev_music: music
  })

}

start('menu')