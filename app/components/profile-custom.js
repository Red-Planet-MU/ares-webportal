import Component from '@ember/component';
import { action } from '@ember/object';

export default Component.extend({
  tagName: '',
 selectSerum: false,
 
 @action
  setSelectSerum(value) {
    this.set('selectSerum', value);
  },
  @action
  reloadChar() {
    this.onReloadChar();
  },

  @action
  getSerum() {
    let api = this.get('gameApi');
    api.requestOne('getSerum', {
      char_id: this.get('char.id'),
      serum_type: this.get('char.serum_type')
    }, null)
    .then( (response) => {
        if (response.error) {
            return;
        }
      this.flashMessages.success('Serum obtained!');
      this.reloadChar();
    });
  }
});