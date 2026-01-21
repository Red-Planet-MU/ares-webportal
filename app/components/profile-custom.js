import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  tagName: '',
  gameApi: service(),
  flashMessages: service(),
  selectSerum: false,
  selectSerumGive: false,
  selectGetHorse: false,
  selectManagePals: false,
  serums: ['Revitalizer', 'Adreno', 'Glass Cannon', 'Hardy', 'Quickhand', 'Equine Elixir'],
 
  @action
    setSelectGetHorse(value) {
      this.set('selectGetHorse', value);
    },

  @action
    setSelectSerum(value) {
      this.set('selectSerum', value);
    },
  
  @action 
    serumToGetChanged(newSerumToGet) {
      this.set('serumToGet', newSerumToGet)
    },  

  @action
    setSelectSerumGive(value) {
      this.set('selectSerumGive', value);
    },

  @action
    setSelectManagePals(value) {
      this.set('selectManagePals', value);
    },
  
  @action 
    serumToGiveChanged(newSerumToGive) {
      this.set('serumToGive', newSerumToGive)
    },  
  
  @action 
    changeGiveTarget(newSerumGiveTarget) {
      this.set('selectedGiveTarget', newSelectedGiveTarget)
    },

  @action
  palsChanged(newPals) {
    this.set('char.custom.pals', newPals);
  },

  @action
    reloadChar() {
      this.onReloadChar();
    },

  @action
    webGetSerum() {
    let api = this.get('gameApi');
    let webSerumToGet = this.serumToGet;
    this.set('selectSerum', false);
    api.requestOne('getSerum', {
      char_id: this.get('char.id'),
      char: this.get('char.name'),
      serum_type: webSerumToGet
    }, null)
    .then( (response) => {
       if (response.error) {
             return;
        }
    this.flashMessages.success('Serum obtained!');
    this.reloadChar();
    });
  },

  @action
    webGiveSerum() {
    let api = this.get('gameApi');
    let webSerumToGive = this.serumToGive;
    let webSerumGiveTarget = this.targetName;
    this.set('selectSerumGive', false);
    api.requestOne('giveSerum', {
      char_id: this.get('char.id'),
      char: this.get('char.name'),
      serum_type: webSerumToGive,
      target: webSerumGiveTarget
    }, null)
    .then( (response) => {
       if (response.error) {
             return;
        }
    this.flashMessages.success('Serum given!');
    this.reloadChar();
    });
  },

  @action
    webGetHorse() {
    let api = this.get('gameApi');
    this.set('selectGetHorse', false);
    api.requestOne('getHorse', {
      char_id: this.get('char.id'),
      char: this.get('char.name')
    }, null)
    .then( (response) => {
       if (response.error) {
             return;
        }
    this.flashMessages.success('Horse obtained!');
    this.reloadChar();
    });
  },

  @action
    webAddPal() {
    let api = this.get('gameApi');
    let webPalToAdd = this.palsTargetName
    this.set('palsTargetName', '')
    this.set('selectManagePals', false);
    api.requestOne('addPal', {
      char_id: this.get('char.id'),
      char: this.get('char.name'),
      target: webPalToAdd
    }, null)
    .then( (response) => {
       if (response.error) {
             return;
        }
    this.flashMessages.success('Pal added!');
    this.reloadChar();
    });
  },

  @action
    webRemovePal() {
    let api = this.get('gameApi');
    let webPalToRemove = this.palsTargetName
    this.set('palsTargetName', '')
    this.set('selectManagePals', false);
    api.requestOne('removePal', {
      char_id: this.get('char.id'),
      char: this.get('char.name'),
      target: webPalToRemove
    }, null)
    .then( (response) => {
       if (response.error) {
             return;
        }
    this.flashMessages.success('Pal Removed!');
    this.reloadChar();
    });
  },

  @action 
    webManagePals() {
      let api = this.get('gameApi');
      this.set('selectManagePals', false);
      api.requestOne('webManagePals', {
        pals: (this.get('char.custom.pals') || []).map(p => p.name),
      }, null)
      .then( (response) => {
       if (response.error) {
             return;
        }
    this.flashMessages.success('Pals Updated!');
    this.reloadChar();
    });
  },

  @action
    saveHorseDetails() {
    let api = this.get('gameApi');
    api.requestOne('updateHorse', {
      char_id: this.get('char.id'),
      char: this.get('char.name'),
      horse_desc: this.get('char.custom.horse_desc'),
      horse_name: this.get('char.custom.horse_name')
    }, null)
    .then( (response) => {
       if (response.error) {
             return;
        }
    this.flashMessages.success('Horse Updated!');
    this.reloadChar();
    });
  },
});