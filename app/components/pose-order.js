import { observer, set } from '@ember/object';
import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { timeDiff } from 'ares-webportal/helpers/time-diff';
import { set, computed } from '@ember/object';

export default Component.extend({
  time: null,
  tagName: 'span',
  timerId: null,
  gameApi: service(),
  managePoseOrder: false,
  
  watchOrder: observer('poseOrder.@each.time', function(){
    this.updateTime();
  }),
  
  updateTime: function() {
    var order = this.poseOrder;
    if (!order) {
      return;
    }
    order.forEach(po => {
      set(po, 'timeString', timeDiff({}, { time: po.time }));
    });
  },
  
  didInsertElement: function() {
    this._super(...arguments);
    this.updateTime();
    let timer = window.setInterval(this.updateTime.bind(this), 1000*60*5); // Update each five mins
    this.set('timerId', timer);
  },
  
  willDestroyElement: function() {
    this._super(...arguments);
    window.clearInterval(this.timerId);
    this.set('timerId', null);
  },

  @action
  switchPoseOrderType(newType) {
    let api = this.gameApi;
    api.requestOne('switchPoseOrder', { id: this.get('scene.id'), type: newType }, null)
    .then( (response) => {
      this.set('managePoseOrder', false);
      if (response.error) {
        return;
      }
      this.set('scene.pose_order_type', newType);
    });
  },
});
