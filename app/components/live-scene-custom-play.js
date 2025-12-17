import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  tagName: '',
  gameApi: service(),

  @action 
    webPalsInvite() {
    let api = this.get('gameApi');
    api.requestOne('webPalsInvite', {
      char_id: this.get('char.id')
    }, null)
    .then( (response) => {
        if (response.error) {
            return;
        }
        this.flashMessages.success('Set to Looking for RP for 1 hour!');
    });
  }

});
