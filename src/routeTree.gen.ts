/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as TrustedDevicesIndexImport } from './routes/trusted-devices/index'
import { Route as AuthentificationVerifyImport } from './routes/authentification/verify'
import { Route as AuthentificationLoginImport } from './routes/authentification/login'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TrustedDevicesIndexRoute = TrustedDevicesIndexImport.update({
  id: '/trusted-devices/',
  path: '/trusted-devices/',
  getParentRoute: () => rootRoute,
} as any)

const AuthentificationVerifyRoute = AuthentificationVerifyImport.update({
  id: '/authentification/verify',
  path: '/authentification/verify',
  getParentRoute: () => rootRoute,
} as any)

const AuthentificationLoginRoute = AuthentificationLoginImport.update({
  id: '/authentification/login',
  path: '/authentification/login',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/authentification/login': {
      id: '/authentification/login'
      path: '/authentification/login'
      fullPath: '/authentification/login'
      preLoaderRoute: typeof AuthentificationLoginImport
      parentRoute: typeof rootRoute
    }
    '/authentification/verify': {
      id: '/authentification/verify'
      path: '/authentification/verify'
      fullPath: '/authentification/verify'
      preLoaderRoute: typeof AuthentificationVerifyImport
      parentRoute: typeof rootRoute
    }
    '/trusted-devices/': {
      id: '/trusted-devices/'
      path: '/trusted-devices'
      fullPath: '/trusted-devices'
      preLoaderRoute: typeof TrustedDevicesIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/authentification/login': typeof AuthentificationLoginRoute
  '/authentification/verify': typeof AuthentificationVerifyRoute
  '/trusted-devices': typeof TrustedDevicesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/authentification/login': typeof AuthentificationLoginRoute
  '/authentification/verify': typeof AuthentificationVerifyRoute
  '/trusted-devices': typeof TrustedDevicesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/authentification/login': typeof AuthentificationLoginRoute
  '/authentification/verify': typeof AuthentificationVerifyRoute
  '/trusted-devices/': typeof TrustedDevicesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/authentification/login'
    | '/authentification/verify'
    | '/trusted-devices'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/authentification/login'
    | '/authentification/verify'
    | '/trusted-devices'
  id:
    | '__root__'
    | '/'
    | '/authentification/login'
    | '/authentification/verify'
    | '/trusted-devices/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthentificationLoginRoute: typeof AuthentificationLoginRoute
  AuthentificationVerifyRoute: typeof AuthentificationVerifyRoute
  TrustedDevicesIndexRoute: typeof TrustedDevicesIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthentificationLoginRoute: AuthentificationLoginRoute,
  AuthentificationVerifyRoute: AuthentificationVerifyRoute,
  TrustedDevicesIndexRoute: TrustedDevicesIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/authentification/login",
        "/authentification/verify",
        "/trusted-devices/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/authentification/login": {
      "filePath": "authentification/login.tsx"
    },
    "/authentification/verify": {
      "filePath": "authentification/verify.tsx"
    },
    "/trusted-devices/": {
      "filePath": "trusted-devices/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
