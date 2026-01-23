import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  gameApi: service(),
  flashMessages: service(),
  showFinishSpecAbility: false,

  @action
  setShowFinishSpecAbility(value) {
    this.set('showFinishSpecAbility', value);
  },

  @action 
  specToAddChanged(newSpecToAdd) {
    this.set('specToAdd', newSpecToAdd);
    this.set('webAbility', ability.name)
  },  
   
  @action
  learnAbility(ability) {
    this.onLearnAbility(ability);
  },

  @action
  learnSpecAbility(ability) {
    this.onLearnSpecAbility(ability);
  },

  @action
  finishSpecAbility(ability) {
    this.onFinishSpecAbility(ability);
  },

  @action
    webFinishSpecAbility2() {
    let api = this.gameApi;
    let webSpecToAdd = this.specToAdd;
    this.set('showFinishSpecAbility', false);
    api.requestOne('webFinishSpecAbility', {
      ability: webAbility,
      char_id: this.get('char.id'),
      char: this.get('char.name'),
      spec: webSpecToAdd
    }, null)
    .then( (response) => {
       if (response.error) {
             return;
        }
    this.flashMessages.success('Finished!');
    this.abilityLearned();
    });
  },
});
