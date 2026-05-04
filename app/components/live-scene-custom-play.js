import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  tagName: '',
  gameApi: service(),
  flashMessages: service(),
  selectWebUseSerum: false,
  selectInvitePals: false,
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
    setSelectInvitePals(value) {
      this.set('selectInvitePals', value);
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
  palsInviteListChanged(newPalsInviteList) {
    this.set('char.custom.pals', newPalsInviteList);
  },

  @action 
    webInvitePals() {
    let api = this.get('gameApi');
    let webPalsCap = this.palscap;
    this.set('selectInvitePals', false);
    api.requestOne('webPalsInvite', {
      id: this.get('scene.id'),
      char_id: this.get('char.id'),
      pals_cap: webPalsCap,
      pals_list: this.palsInviteListForWeb
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
    if (!this.serumTargetName) 
      var webSerumTarget = this.get('char.name')
    else 
      var webSerumTarget = this.serumTargetName.name;

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
        this.flashMessages.success(response.private_dice_result);
        return;
      }
    });
  },

});
