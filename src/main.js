
/*
Organization (15 points)

    Submit a link to your GitHub repository that shows a history of multiple meaningful commits with descriptive messages (5)
    Submit a playable link on GitHub pages (5)
    In main.js (or equivalent), include a comment header with your name, game title, approximate hours spent on project, and your creative tilt justification (see below) (5)

Structure and Design (75 points)

Your game should:

    Use multiple Scene classes (dictated by your game's style) (5)
    Properly transition between Scenes and allow the player to restart w/out having to reload the page (5)
    Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (5)
    Have some form of player input/control appropriate to your game design (5)
    Include one or more animated characters that use a texture atlas (5)
    Simulate scrolling with a tileSprite (or equivalent means) (5)
    Implement proper collision detection (via Arcade Physics or a custom routine) (5)
    Have looping background music (5)
    Use a minimum of three sound effects for key mechanics, UI, and/or significant events appropriate to your game design (5)
    Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (5)
    Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (5)
    Be theoretically endless (5)
    Be playable for at least 15 seconds for a new player of low to moderate skill (5)
    Run without significant crashes or errors (5)
    Include in-game credits for all roles, assets, music, etc. (5)

You must make all of your own visual assets (without AI assistance). It's OK to use royalty-free music/SFX.
Creative Tilt (10 points)

Does your game...

    ...do something technically interesting? Are you particularly proud of a programming technique you implemented? Did you look beyond the class examples and learn how to do something new? (5)
    ...have a great visual style? Does it use music or art that you're particularly proud of? Are you trying something new or clever with the endless runner form? (5)

*/

let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 480,
    scene: [Play],
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