import Component from '@ember/component';
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
  
});
