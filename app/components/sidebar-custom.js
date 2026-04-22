import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  gameApi: service(),
  flashMessages: service(),
  selectLFRP: false,
  hourOptions: [1, 2, 3],
  hours: 1,

  @action
    setSelectLFRP(value) {
      this.set('selectLFRP', value);
    },
  
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
    hoursToLookChanged(newHoursToLook) {
      this.set('hours', newHoursToLook)
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
      this.refresh()
    });
  },
});
