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
  didInsertElement: function() {
    this.$().delegate('.link-class', 'click', this.linkClickHandler);
  },
  linkClickHandler: function(event) {
    //Do as you wish
    ('.navbar-toggler').click();
  }

  @action 
  closeNavbar() {
    ('.navbar-toggler').click();
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
