import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  flashMessages: service(),
  gameApi: service(),
  
  @action
  reloadChar() {
    this.onReloadChar();
  },

  @action
  setSelectSerum(value) {
    this.set('setSelectSerum', value);
  }
});
