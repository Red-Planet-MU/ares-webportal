import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Controller.extend({
  gameApi: service(),
  router: service(),
  flashMessages: service(),
  appNotes: '',

    
  @action
  approveChar() {
    let api = this.gameApi;
    api.requestOne('appApprove', { id: this.get('model.id'), notes: this.appNotes  }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
      this.set('appNotes', '');
      this.flashMessages.success('Character approved!');
      this.router.transitionTo('char', this.get('model.name'));
    });
  },
        
  @action
  rejectChar() {
    let api = this.gameApi;
    api.requestOne('appReject', { id: this.get('model.id'), notes: this.appNotes }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
      this.set('appNotes', '');
      this.flashMessages.success('Character rejected!');
      this.router.transitionTo('jobs');
    });
  },
        
  @action
  responseSelected(resp) {
    this.set('appNotes', resp.value);
  },

  @action
  reset() {
    let api = this.gameApi;
    api.requestOne('appReset', { id: this.get('model.char.id')})
    .then( (response) => {
      if (response.error) {
        return;
      }
      this.send('reloadModel');
      this.flashMessages.success('Abilities reset.');
    });    
  },
});