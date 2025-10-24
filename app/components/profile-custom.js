import Component from '@ember/component';
import { action } from '@ember/object';

export default Component.extend({
  tagName: '',
 selectSerum: false,
 serums: ['Revitalizer', 'Adreno', 'Glass Cannon', 'Hardy', 'Quickhand'],
 
 @action
  setSelectSerum(value) {
    this.set('selectSerum', value);
  },
  @action
  reloadChar() {
    this.onReloadChar();
  },

  @action
  webGetSerum() {
    let api = this.get('gameApi');
    api.requestOne('getSerum', {
      char_id: this.get('char.id'),
      serum_type: this.get('char.serum_type')
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