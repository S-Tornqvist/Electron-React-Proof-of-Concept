import { ipcMain } from 'electron';
import Api from '../../types/apiDefinitions';

/**
 * Strictly type enforced container for api call handlers.
 */
const ipcHandlers: { [key in keyof Api]: ElectronIpcHandler<key> } = {
  ping() {
    console.log('received ping!');
    return 'pong';
  },

  plusOne: (_event, i) => i + 1,
};

/**
 * Automatically attach api call handlers based on manually edited
 * {@link ipcHandlers} (do not touch).
 */
for (const [key, handler] of Object.entries(ipcHandlers)) {
  ipcMain.handle(key, handler);
}

/**
 * Infer api call parameters from `TKey`.
 */
type ApiParameters<TKey extends keyof Api> = Parameters<Api[TKey]>;

/**
 * Infer api call response from `TKey`.
 */
type ApiResponse<TKey extends keyof Api> = ReturnType<Api[TKey]>;

/**
 * Infer Electron Ipc invocation handler signature from `Tkey`.
 */
type ElectronIpcHandler<TKey extends keyof Api> = (
  event: Electron.IpcMainInvokeEvent,
  ...args: ApiParameters<TKey>
) => ApiResponse<TKey> | Awaited<ApiResponse<TKey>>;
