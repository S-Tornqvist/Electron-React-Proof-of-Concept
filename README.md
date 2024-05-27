# Electron React + TypeScript + Vite

This template provides a minimal setup to get React working in Electron + Vite with HMR and some ESLint + Prettier rules.

The frontend is setup using the [Vite react-ts template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) with some customization in the configuration. The backend is a standard minimal Electron project using electron-builder for packaging.

## Development

Start the project in development mode using:

```shell
npm run dev
```

Vite is used for serving and building the frontend, configured in [vite.config.ts](vite.config.ts) ([help](https://vitejs.dev/config/)). In development mode, Vite serves the frontend on `localhost:3000`, which is consumed by Electron. When building for production, Vite outputs the frontend into `dist/`.

Electron is used for rendering the frontend and serving the api from the main process. Electron has access to the user operating system, enabling more complex (and potentially unsafe) interactions than an ordinary browser. In development mode, the Electron main process renders the HTML served by Vite on `localhost:3000`.

---

To preview the production app, run:

```shell
npm run build
npm run preview
```

## Frontend-Backend communication

A common api is declared in [types/apiDefinition.d.ts](types/apiDefinitions.d.ts). This api is implemented as [one-way Electron IPC](https://www.electronjs.org/docs/latest/tutorial/ipc) by the main process in [electron/src/ipcSetup.ts](electron/src/ipcSetup.ts) and attached to the frontend in [electron/src/preload.ts](electron/src/preload.ts). The frontend [main.tsx](src/main.tsx) redeclares the global `window` object with the api type attached. The somewhat complex typing in [electron/src/ipcSetup.ts](electron/src/ipcSetup.ts) ensures that the Electron main process always must comply with the api definition. As a result, functionality declared in [types/apiDefinition.d.ts](types/apiDefinitions.d.ts) is enforced on the Electron backend and automatically made available with typing on the frontend.

## Configuration

|                                     |                                                                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Frontend config + main scripts      | [package.json](package.json)                                                                                                   |
| Electron config + scripts           | [electron/package.json](electron/package.json)                                                                                 |
| TypeScript<br>(typecheck + compile) | [tsconfig.json](tsconfig.json)<br>[tsconfig.node.json](tsconfig.node.json)<br>[electron/tsconfig.json](electron/tsconfig.json) |
| Vite<br>(build + serve frontend)    | [vite.config.ts](vite.config.ts)                                                                                               |
| linting (ESLint)                    | [.eslintrc.cjs](.eslintrc.cjs)                                                                                                 |
| formatting (Prettier)               | [.prettierrc](.prettierrc)                                                                                                     |

## Production build

To build the production app, run:

```shell
npm run build
npm run package
```

`npm run build` builds the frontend using Vite (output into `dist/`), and the Electron application using `tsc` (TypeScript compile) (output into `electron/dist`).

`npm run package` packages the built app into installables or executables using Electron Builder, configured in [electron/package.json](electron/package.json).

## Linting and formatting

ESLint is used for linting both the React app and the Electron main process. ESLint is configured in file [.eslintrc.cjs](.eslintrc.cjs) ([help](https://eslint.org/docs/latest/use/configure/)).

Prettier is used for formatting the code, and is configured in [.prettierrc](.pretierrc) ([help](https://prettier.io/docs/en/configuration.html)).

## Extending ESLint

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json' /* other configs */],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
