import { contextBridge, ipcRenderer } from 'electron';
import Api from '../../types/apiDefinitions';

/**
 * Strictly typed api routing.
 */
const api: Api = {
  ping: () => ipcRenderer.invoke('ping'),
  plusOne: (i: number) => ipcRenderer.invoke('plusOne', i),
};

contextBridge.exposeInMainWorld('api', api);
