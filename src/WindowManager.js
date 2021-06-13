const LOG_PREFIX = '[ComponentManager]'

let id = 0
class ComponentManager {
  constructor (vtoptions) {
    this.options = vtoptions
    this._registeredComponents = Object.fromEntries(vtoptions.components.map(comp => ([comp.name, comp])))

    this._instances = []

    // for (const component of vtoptions.components) {
    //     this._instances[component.name] = [];
    // }
  }

  async open (componentName, options) {
    const instance = await this.create(componentName, options)
    this.push(instance)
    return instance
  }

  async create (componentName, options) {
    console.log(LOG_PREFIX, 'create', 'args', componentName, options)
    const componentEntry = this._registeredComponents[componentName]
    if (componentEntry) {
      const viewModel = {
        id: ++id,
        name: componentEntry.name,
        Component: componentEntry.component,
        node: null,
        alive: false,
        arguments: { ...options }
      }
      console.log(LOG_PREFIX, 'create', viewModel)
      return viewModel
    } else {
      console.error('Unknown Component!', componentName)
    }
  }

  push (viewModel) {
    this._instances.push(viewModel)
  }

  remove (viewModel) {
    const i = this._instances.indexOf(viewModel)
    if (i > -1) this._instances.splice(i, 1)
  }

  getInstanceById (id) {
    return this._instances.find(ins => ins.id === id)
  }
}

export default ComponentManager
