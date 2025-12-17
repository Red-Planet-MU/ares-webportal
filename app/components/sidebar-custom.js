import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  gameApi: service(),

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
      this.reloadChar();
    });
  },
});
