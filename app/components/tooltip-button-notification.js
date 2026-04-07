import { computed } from '@ember/object';
import Component from '@ember/component';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  tagName: '',
  onClick: null, // This is a callback we provide for handling the button click
  
  @action
  handleClick() {
    console.log("inside the handle")
    if (this.onClick) {
      console.log("inside the if")
      this.onClick();
    }
  }
  
  @action
  markRead(notification, unread) {
    console.log("Made it in here");
    let api = this.gameApi;
    set(notification, 'is_unread', unread);

    api.requestOne('markNotificationRead', { id: notification.id, unread: unread })
    .then( (response) => {
      if (response.error) {
        return;
      }
      if (unread) {
        this.flashMessages.success('Notification marked unread.');
      } else {
        this.flashMessages.success('Notification marked read.');
      }
    });
  }

});
