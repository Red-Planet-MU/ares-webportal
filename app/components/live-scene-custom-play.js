import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  tagName: '',
  gameApi: service(),
  flashMessages: service(),
  selectWebUseSerum: false,
  serumTargetName: null,
  serums: [ { name: 'Revitalizer' } ],
 
  @action
    setSelectWebUseSerum(value) {
      this.set('selectWebUseSerum', value);
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
  }

});
