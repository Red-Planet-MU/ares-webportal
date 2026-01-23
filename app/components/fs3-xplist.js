import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  showFinishSpecAbility: false,
  gameApi: service(),

  @action
  setShowFinishSpecAbility(value) {
    this.set('showFinishSpecAbility', value);
  },

  @action 
  specToAddChanged(newSpecToAdd) {
    this.set('specToAdd', newSpecToAdd)
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
    let api = this.get('gameApi');
    let webSpecToAdd = this.specToAdd;
    this.set('showFinishSpecAbility', false);
    api.requestOne('webFinishSpecAbility', {
      ability: ability.name,
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
