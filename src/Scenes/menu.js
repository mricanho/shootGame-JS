import 'phaser';
import scoreAndAPI from '../api';
import config from '../index';

class menuScene extends Phaser.Scene {
  constructor () {
    super('Menu');
  }
  preload () {
    this.load.image('gameTitle', './assets/images/game-title.png');
    this.load.image('sprBtnPlay', './assets/images/sprBtnPlay.png');
    this.load.image('sprBtnPlayDown', './assets/images/sprBtnPlayDown.png');
    this.load.image('sprBtnCommands', './assets/images/sprBtnCommands.png');
    this.load.image('sprBtnCommandsDown', './assets/images/sprBtnCommandsDown.png');
    this.load.image('sprBtnScores', './assets/images/sprBtnScores.png');
    this.load.image('sprBtnScoresDown', './assets/images/sprBtnScoresDown.png');
    this.load.audio("sndBtnOver", "./assets/sound/sndBtnOver.wav");
    this.load.audio("sndBtnDown", "./assets/sound/sndBtnDown.wav");
  }
  create () {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };
    this.add.image(640, 100, 'gameTitle');

    const text = this.add.text(555, 180, 'New Pilot', { color: '#fff', fontSize: '25px' });
    const form = `
      <form style="display: flex; border-radius: 15px; border: 2px solid #fff;">
        <input type="text" name="nameField" placeholder="Enter your name" style="font-size: 20px; font-family: Courier; width: 250px; border: none; background: transparent; color: #fff; padding-top: 5px; padding-left: 10px;">
		    <input type="button" name="saveBtn" value="Go!" style="font-size: 18px; font-family: Courier; border-radius: 15px; background: #3f93df; border: none; padding: 10px 5px 5px 10px; margin-right: 0;">
      </form>
    `;
    const element = this.add.dom(630, 250).createFromHTML(form);
    element.addListener('click');
    element.on('click', function (event) {
      if (event.target.name === 'saveBtn') {
        var inputUsername = this.getChildByName('nameField');
        if (inputUsername.value !== '') {
          this.removeListener('click');
          this.setVisible(false);
          const inputName = inputUsername.value;
          text.setText(`Welcome ${inputName}!`);
          scoreAndAPI.userName(inputName);
        } else {
          this.setVisible(true);
        }
      }
    });

    this.btnPlay = this.add.sprite(620, 350, "sprBtnPlay");
    this.btnPlay.setInteractive();
    this.btnPlay.on("pointerover", function() {
      this.btnPlay.setTexture("sprBtnPlayDown");
      this.sfx.btnOver.play();
    }, this);
    this.btnPlay.on("pointerout", function() {
      this.setTexture("sprBtnPlay");
    });
    this.btnPlay.on("pointerdown", function() {
      this.btnPlay.setTexture("sprBtnPlayDown");
      this.sfx.btnDown.play();
    }, this);
    this.btnPlay.on("pointerup", function() {
      this.btnPlay.setTexture("sprBtnPlay");
      this.scene.start("Game");
    }, this);

    this.btnCommands = this.add.sprite(620, 450, "sprBtnCommands");
    this.btnCommands.setInteractive();
    this.btnCommands.on("pointerover", function() {
      this.btnCommands.setTexture("sprBtnCommandsDown");
      this.sfx.btnOver.play();
    }, this);
    this.btnCommands.on("pointerout", function() {
      this.setTexture("sprBtnCommands");
    });
    this.btnCommands.on("pointerdown", function() {
      this.btnCommands.setTexture("sprBtnCommandsDown");
      this.sfx.btnDown.play();
    }, this);
    this.btnCommands.on("pointerup", function() {
      this.btnCommands.setTexture("sprBtnCommands");
      this.scene.start("Commands");
    }, this);

    this.btnScores = this.add.sprite(620, 550, "sprBtnScores");
    this.btnScores.setInteractive();
    this.btnScores.on("pointerover", function() {
      this.btnScores.setTexture("sprBtnScoresDown");
      this.sfx.btnOver.play();
    }, this);
    this.btnScores.on("pointerout", function() {
      this.setTexture("sprBtnScores");
    });
    this.btnScores.on("pointerdown", function() {
      this.btnScores.setTexture("sprBtnScoresDown");
      this.sfx.btnDown.play();
    }, this);
    this.btnScores.on("pointerup", function() {
      this.btnScores.setTexture("sprBtnScores");
      this.scene.start("Scores");
    }, this);
  }

  centerButton (gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width/2, config.height/2 - offset * 100, config.width, config.height)
    );
  }
};

export default menuScene;