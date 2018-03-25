//templated off of bokeh

import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces'

import {
  KernelMessage,
  Kernel
} from '@jupyterlab/services'

import {
  IDisposable
} from '@phosphor/disposable';

import {
  Widget
} from '@phosphor/widgets'


export declare interface KernelProxy {
  // copied from https://github.com/jupyterlab/jupyterlab/blob/master/packages/services/src/kernel/default.ts#L605
  registerCommTarget(targetName: string, callback: (comm: Kernel.IComm, msg: KernelMessage.ICommOpenMsg) => void): IDisposable,
}


/**
 * The MIME types for 3Dmol.js.
 */
export const LOAD_MIME_TYPE_3Dmol = 'application/3dmoljs_load.v0'

/**
 * Load 3Dmol.js and CSS into the DOM
 */
export
class JSLoad_3Dmol extends Widget implements IRenderMime.IRenderer {
  private _load_mimetype: string = LOAD_MIME_TYPE_3Dmol
  private _div_element: HTMLDivElement

  constructor(options: IRenderMime.IRendererOptions) {
    super()
    console.log("In constructor")
    this._div_element = document.createElement("div")
  }

  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    let data = model.data[this._load_mimetype] as string
    console.log("In renderModel")
    console.log(model.data[this._load_mimetype])

    this._div_element.innerHTML = data
    this.node.appendChild(this._div_element);
    //execute javascript
    var head = document.getElementsByTagName('head')[0];                
    var codes = this._div_element.getElementsByTagName("script");   
    for(var i=0;i<codes.length;i++)  
    {  
        var scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'text/javascript');
        scriptElement.innerText = codes[i].text;
        head.appendChild(scriptElement);
        head.removeChild(scriptElement);       
    }  

    return Promise.resolve()
  }
}


