import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  tagName: '',
  gameApi: service(),
  flashMessages: service(),
  selectSerum: false,
  serums: ['Revitalizer', 'Adreno', 'Glass Cannon', 'Hardy', 'Quickhand'],
 
  @action
    setSelectSerum(value) {
      this.set('selectSerum', value);
    },
  
  @action 
    serumToGetChanged(newSerumToGet) {
      this.set('serumToGet', newSerumToGet)
    },  
  
  @action
    reloadChar() {
      this.onReloadChar();
    },

  @action
    webGetSerum() {
    let api = this.get('gameApi');
    let webSerumToGet = this.serumToGet;
    this.set('selectSerum', false);
    api.requestOne('getSerum', {
      char_id: this.get('char.id'),
      serum_type: webSerumToGet
    }, null)
    console.log(char_id)
    .then( (response) => {
       if (response.error) {
             return;
        }
    console.log(char_id)
    this.flashMessages.success('Serum obtained!');
    this.reloadChar();
    });
  }
});