import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
    gameApi: service(),

    @action
    webGetFortune() {
    let api = this.get('gameApi');
    api.requestOne('getFortune', {
      id: this.get('model.scene.id'),
      char_id: this.get('char.id'),
      char: this.get('char.name'),
    }, null)
    .then( (response) => {
       if (response.error) {
             return;
        }

    });
  },
});
