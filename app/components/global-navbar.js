import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  session: service(),
  showAltSelection: false,
  //element = '.dropdown-item',

  //closeNavbar: function() {
  //  let element = '.dropdown-item';
  //  element.onclick = function() {
  //    ('.navbar-toggler').click();
  //  }
  //},
 

  @action
  closeNavbar() {
    let element = document.getElementsByClassName("navbar-toggler")[0];
    element.click();
  },
  
  @action
  setAltSelectionVisible(visible) {
    this.set('showAltSelection', visible);
  },
  
  @action
  switchAlt(alt) {
    this.session.authenticate('authenticator:ares', { name: alt, password: 'ALT' })
     .then(() => {
       window.location.replace('/');
     });
  }
});
