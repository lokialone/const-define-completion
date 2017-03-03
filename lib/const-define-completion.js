'use babel';

import ConstDefineCompletionView from './const-define-completion-view';
import { CompositeDisposable } from 'atom';

export default {

  constDefineCompletionView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.constDefineCompletionView = new ConstDefineCompletionView(state.constDefineCompletionViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.constDefineCompletionView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'const-define-completion:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.constDefineCompletionView.destroy();
  },

  serialize() {
    return {
      constDefineCompletionViewState: this.constDefineCompletionView.serialize()
    };
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
    let selection = editor.getSelectedText()
    let arr = selection.split('\n')
    for(let i = 0, len = arr.length; i < len; i++) {
      if(!arr[i]){
        break;
      }
      editor.insertText(`export const ${arr[i]} = '${arr[i]}';`)
      editor.insertText('\n')
    }
    }
  }

};
