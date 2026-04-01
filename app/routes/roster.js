import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRoute from 'ares-webportal/mixins/authenticated-route';
//import DefaultRoute from 'ares-webportal/mixins/default-route';

export default Route.extend(AuthenticatedRoute,  {
    gameApi: service(),
    
    model: function() {
        let api = this.gameApi;
        return api.requestOne('roster');
    }
});
