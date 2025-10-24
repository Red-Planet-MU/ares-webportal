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
  }
});