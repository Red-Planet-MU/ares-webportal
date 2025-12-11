import Component from '@ember/component';

export default Component.extend({
    demoIsSongLink: function() {
        return this.get('demographic') === 'Theme Song Link';
    }.property('demographic'),

    demoIsSongTitle: function() {
        return this.get('demographic') === 'Theme Song Title';
    }.property('demographic')
});
