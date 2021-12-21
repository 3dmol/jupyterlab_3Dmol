import { DocumentRegistry } from '@jupyterlab/docregistry'
import { INotebookModel, NotebookPanel } from '@jupyterlab/notebook'
import { JupyterFrontEndPlugin, JupyterFrontEnd } from '@jupyterlab/application'
import { IDisposable, DisposableDelegate } from '@lumino/disposable'

import { ContextManager } from './manager'
import {  
  JSLoad_3Dmol,
  LOAD_MIME_TYPE_3Dmol
} from './renderer'


export type INBWidgetExtension = DocumentRegistry.IWidgetExtension<
  NotebookPanel,
  INotebookModel
>

export class NBWidgetExtension implements INBWidgetExtension {
  createNew(
    nb: NotebookPanel,
    context: DocumentRegistry.IContext<INotebookModel>
  ): IDisposable {
    const manager = new ContextManager(context)

    nb.content.rendermime.addFactory({
        safe: false,
        mimeTypes: [LOAD_MIME_TYPE_3Dmol],
        createRenderer: (options) => new JSLoad_3Dmol(options)
    }, 0);

    return new DisposableDelegate(() => {
        if (nb.content.rendermime) {
            nb.content.rendermime.removeMimeType(LOAD_MIME_TYPE_3Dmol);
        }
        manager.dispose();
    });

    nb.content.rendermime.addFactory(
      {
        safe: false,
        mimeTypes: [LOAD_MIME_TYPE_3Dmol],
        createRenderer: options => new JSLoad_3Dmol(options)
      },
      0
    )
  }
}


export
  const extension: JupyterFrontEndPlugin<void> = {
    id: 'jupyterlab_3Dmol',
    autoStart: true,
    activate: (app: JupyterFrontEnd) => {
        app.docRegistry.addWidgetExtension('Notebook', new NBWidgetExtension());
    }
}

