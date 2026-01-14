import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  gameApi: service(),
  flashMessages: service(),

  @action
  reloadChar() {
    this.reloadChar();
  },

  @action
  refresh() {
    this.resetOnExit();
    this.send('reloadModel');
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
      this.refresh()
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
      this.refresh()
    });
  },
});
