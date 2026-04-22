import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  gameApi: service(),
  flashMessages: service(),
  showLFRP: false,
  router: service(),
  selectLFRP: false,
  hourOptions: [1, 2, 3],
  hours: 1,

  @action
    setSelectLFRP(value) {
      this.set('selectLFRP', value);
    },
  
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
    let hours = this.hours;
    this.set('selectLFRP', false);
    api.requestOne('setLFRP', {
      char_id: this.get('char.id'),
      hours: hours
    }, null)
    .then( (response) => {
        if (response.error) {
            return;
        }
      this.flashMessages.success(`Set to Looking for RP for ${hours} hour(s)!`);
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
    });
  },
});
