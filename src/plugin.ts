import {
  DocumentRegistry
} from '@jupyterlab/docregistry'

import {
  INotebookModel,
  NotebookPanel
} from '@jupyterlab/notebook'

import {
  JupyterLabPlugin,
  JupyterLab
} from '@jupyterlab/application'

import {
  IDisposable,
  DisposableDelegate
} from '@phosphor/disposable'

import {
  ContextManager
} from './manager'

import {  
  JSLoad_3Dmol,
  LOAD_MIME_TYPE_3Dmol
} from './renderer'


export
type INBWidgetExtension = DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>;


export
class NBWidgetExtension implements INBWidgetExtension {
  createNew(nb: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    let manager = new ContextManager(context);

    nb.rendermime.addFactory({
        safe: false,
        mimeTypes: [LOAD_MIME_TYPE_3Dmol],
        createRenderer: (options) => new JSLoad_3Dmol(options)
    }, 0);

    return new DisposableDelegate(() => {
        if (nb.rendermime) {
            nb.rendermime.removeMimeType(LOAD_MIME_TYPE_3Dmol);
        }
        manager.dispose();
    });
  }
}

export
  const extension: JupyterLabPlugin<void> = {
    id: 'jupyterlab_3Dmol',
    autoStart: true,
    activate: (app: JupyterLab) => {
        // this adds the Bokeh widget extension onto Notebooks specifically
        app.docRegistry.addWidgetExtension('Notebook', new NBWidgetExtension());
    }
}
