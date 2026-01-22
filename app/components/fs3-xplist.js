import Component from '@ember/component';
import { action } from '@ember/object';

export default Component.extend({
  showFinishSpecAbility: false,

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
});
