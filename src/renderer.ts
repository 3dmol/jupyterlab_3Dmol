//templated off of bokeh


  
import { IRenderMime } from '@jupyterlab/rendermime-interfaces'
import { KernelMessage, Kernel } from '@jupyterlab/services'
import { Widget } from '@lumino/widgets'

export declare interface KernelProxy {
  // copied from https://github.com/jupyterlab/jupyterlab/blob/master/packages/services/src/kernel/default.ts#L605
  registerCommTarget(
    targetName: string,
    callback: (comm: Kernel.IComm, msg: KernelMessage.ICommOpenMsg) => void
  ): void
}


/**
 * The MIME types for 3Dmol.js.
 */
export const LOAD_MIME_TYPE_3Dmol = 'application/3dmoljs_load.v0'

/**
 * Load 3Dmol.js and CSS into the DOM
 */
export class JSLoad_3Dmol extends Widget implements IRenderMime.IRenderer {
  private _load_mimetype: string = LOAD_MIME_TYPE_3Dmol

  constructor(_options: IRenderMime.IRendererOptions) {
    super()
  }

  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    const data = model.data[this._load_mimetype] as string
    //execute javascript
    let head = document.getElementsByTagName('head')[0];   
    let range = document.createRange();
    range.selectNode(head);
    let frag = range.createContextualFragment(data);
    
    this.node.appendChild(frag)

    return Promise.resolve()
  }
}
 
 

