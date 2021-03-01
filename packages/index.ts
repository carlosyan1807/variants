import { App } from 'vue'
import { IOptions } from './types/lib'

import Card from './card'

const components = [Card]

const defaultOptions: IOptions = {
  prefix: 'Vc',
}
const install = (app: App, options: IOptions): void => {
  const _options = Object.assign(defaultOptions, options)
  components.forEach((c) => app.use(c, _options))
  // components.forEach((component) => app.component(component.name, component))
  // app.provide('variantsOptions', ref(variantsDefaultOptions))
}

export { Card, install }

export default { install }
