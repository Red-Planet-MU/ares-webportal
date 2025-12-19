import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  tagName: '',
  gameApi: service(),
  flashMessages: service(),
  

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
    api.requestOne('webUseSerum', {
      id: this.get('scene.id'),
      char_id: this.get('char.id')
    }, null)
    .then( (response) => {
        if (response.error) {
            return;
        }
      this.flashMessages.success('Pals invited!');
    });
  }

});
