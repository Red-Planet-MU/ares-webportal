import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  flashMessages: service(),
  gameApi: service(),

  selectSerum: false,
  
  @action
  reloadChar() {
    this.onReloadChar();
  },

  @action
  setSelectSerum(value) {
    this.set('selectSerum', value);
  },

  @action
  getSerum() {
    let api = this.gameApi;
         
    api.requestOne('getSerum', 
    { 
      char_id: this.get('char.id'),
      serum_type: this.get('char.serumType') 
    }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
      this.flashMessages.success('Serum got!');
      this.onReloadChar();
    });
  }


});
