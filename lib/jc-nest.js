'use babel';

import JcNestView from './jc-nest-view';
import { CompositeDisposable } from 'atom';

export default {

  jcNestView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jcNestView = new JcNestView(state.jcNestViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jcNestView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jc-nest:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jcNestView.destroy();
  },

  serialize() {
    return {
      jcNestViewState: this.jcNestView.serialize()
    };
  },

  toggle() {
    console.log('JcNest was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
