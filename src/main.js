/*
Luca Stubbe
Minimalist Runner
~20 hours
Justifications for all graded components are below:


Organization (15 points)

Submit a link to your GitHub repository that shows a history of multiple meaningful commits with descriptive messages (5)
    N/A
Submit a playable link on GitHub pages (5)
    N/A
In main.js (or equivalent), include a comment header with your name, game title, approximate hours spent on project, and your creative tilt justification (see below) (5)
    N/A

Structure and Design (75 points)

Your game should:

Use multiple Scene classes (dictated by your game's style) (5)
    Menu.js and Play.js for the menu and game respectively
Properly transition between Scenes and allow the player to restart w/out having to reload the page (5)
    transition from menu->play when pressing space, restarts from play when pressing space
Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (5)
    on menu scene, gameplay instructions are explained
Have some form of player input/control appropriate to your game design (5)
    the game is supposed to be minimalist, so everything is just one button
Include one or more animated characters that use a texture atlas (5)
    player character uses texture atlas
Simulate scrolling with a tileSprite (or equivalent means) (5)
    background is a tileSprite that scrolls, and obstacles are moving sprites
Implement proper collision detection (via Arcade Physics or a custom routine) (5)
    Arcade Physics collide() is used for collision detection
Have looping background music (5)
    footsteps constitute the background 'music'
Use a minimum of three sound effects for key mechanics, UI, and/or significant events appropriate to your game design (5)
    button press, death, and jump sound effects
Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (5)
    obstacles move increasingly fast and spawn increasingly frequently
Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (5)
    player is given a score based on play time
Be theoretically endless (5)
    obstacles are generated randomly and screen never stops scrolling
Be playable for at least 15 seconds for a new player of low to moderate skill (5)
    first obstacle is reached at ~5-10 seconds and is very easy to jump over.
Run without significant crashes or errors (5)
    no significant crashes or errors
Include in-game credits for all roles, assets, music, etc. (5)
    credits are visible on the death screen

You must make all of your own visual assets (without AI assistance). It's OK to use royalty-free music/SFX.
    all visual assets were handmade, and music/sfx is royalty-free

Creative Tilt (10 points)

Does your game...

...do something technically interesting? Are you particularly proud of a programming technique you implemented? Did you look beyond the class examples and learn how to do something new? (5)
    I learned how to speed up all of my active game elements over time!
...have a great visual style? Does it use music or art that you're particularly proud of? Are you trying something new or clever with the endless runner form? (5)
    I'm very inexperienced with art/animation and spent a lot of time practicing in these two weeks to make the player character's animations feel smooth. I think that it's also a little
    interesting to see any game presented in a really minimalist way.

*/

let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 480,
    scene: [Menu, Play],
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
}

let game = new Phaser.Game(config);