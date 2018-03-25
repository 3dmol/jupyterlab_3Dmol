import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_3Dmol extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_3Dmol',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension jupyterlab_3Dmol is activated!');
  }
};

export default extension;
