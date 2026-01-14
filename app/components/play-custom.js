import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  gameApi: service(),
  flashMessages: service(),
  showLFRP: false,

  @action
  setShowLFRP(value) {
    this.set('showLFRP', value);
  },

  @action
  reloadChar() {
    this.reloadChar();
  },

  @action
  setLFRP() {
    let api = this.get('gameApi');
    api.requestOne('setLFRP', {
      char_id: this.get('char.id'),
    }, null)
    .then( (response) => {
        if (response.error) {
            return;
        }
      this.flashMessages.success('Set to Looking for RP for 1 hour!');
    });
  },

  @action
  unsetLFRP() {
    let api = this.get('gameApi');
    api.requestOne('unsetLFRP', {
      char_id: this.get('char.id'),
    }, null)
    .then( (response) => {
        if (response.error) {
            return;
        }
      this.flashMessages.success('No longer Looking for RP!');
    });
  },
});
