import type { App, Plugin } from 'vue'
import type { IOptions } from '../types/lib'

const sfcInstaller = <T>(component: T) => {
  const _component = component as any
  _component.install = function (app: App, options: IOptions) {
    app.component(`${options.prefix}${_component.name}`, component)
  }
  return component as T & Plugin
}

export { sfcInstaller }
