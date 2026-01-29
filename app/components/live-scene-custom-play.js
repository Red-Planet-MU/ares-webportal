import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  tagName: '',
  gameApi: service(),
  flashMessages: service(),
  selectWebUseSerum: false,
  serumTargetName: null,
  rollDicePopup: false,
  dice: '',
  faces: '',
  private_dice: false,
  serums: [ { name: 'Revitalizer' } ],
 
  @action
    setSelectWebUseSerum(value) {
      this.set('selectWebUseSerum', value);
    },

  @action
    setRollDicePopup(value) {
      this.set('rollDicePopup', value);
    },
  
  @action 
    serumToUseChanged(newSerumToUse) {
      this.set('serumToUse', newSerumToUse)
    },  

  @action
  serumTargetChanged(newSerumTarget) {
    this.set('serumTargetName', newSerumTarget);
  },

  @action 
    webPalsInvite() {
    let api = this.get('gameApi');
    api.requestOne('webPalsInvite', {
      id: this.get('scene.id'),
      char_id: this.get('char.id')
    }, null)
    .then( (response) => {
        if (response.error) {
            return;
        }
      this.flashMessages.success('Pals invited!');
    });
  },

  @action 
    webUseSerum() {
    let api = this.get('gameApi');
    let webSerumToUse = this.serumToUse.name;
    let webSerumTarget = this.serumTargetName;

    if (!webSerumToUse) {
            this.flashMessages.danger("You haven't selected a serum to use.");
            return;
        }
    this.set('selectWebUseSerum', false);

    api.requestOne('webUseSerum', {
      id: this.get('scene.id'),
      char_id: this.get('char.id'),
      target_name: webSerumTarget,
      serum_name: webSerumToUse
    }, null)
    .then( (response) => {
        if (response.error) {
            return;
        }
      
    });
  },

  @action
  rollDice() {
    let api = this.gameApi;
    let dice = this.dice;
    let faces = this.faces;
    let private_dice = this.private_dice;
    this.set('rollDicePopup', false);
    this.set('dice', '');
    this.set('faces', '');
    this.set('private_dice', false)
    if (!dice) {
      this.flashMessages.danger("You haven't specified how many dice to roll.");
      return;
    }
    if (!faces) {
      this.flashMessages.danger("You haven't specified how many faces the dice should use.");
      return;
    }

    api.requestOne('rollDice', { id: this.get('scene.id'), dice: dice, faces: faces, private_dice: private_dice }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
      if (response.private_dice_result) {
        this.flashMessages.success(private_dice_result);
        return;
      }
    });
  },

});
