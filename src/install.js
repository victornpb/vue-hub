import Renderer from './Renderer.vue'
import Proxy from './Proxy.vue'

import {
  INSTANCE_PROP_OPTION,
  PRIV_PROP,
  ROOT_PROP,
  EXPOSED_PROP,

  RENDERER_COMP_NAME,
  PROXY_COMP_NAME
} from './constants.js'

function install(Vue, options) {
  
  // Register components
  Vue.component(RENDERER_COMP_NAME, Renderer)
  Vue.component(PROXY_COMP_NAME, Proxy)

  Vue.mixin({
    beforeCreate () {
      const pluginInstance = this.$options[INSTANCE_PROP_OPTION]
      if (pluginInstance) {
        this.$root[PRIV_PROP] = pluginInstance
        window.v = pluginInstance

        // Vue.util.defineReactive(this, '_route', this[PRIV_PROP].history.current)
      } else {
        this[ROOT_PROP] = (this.$parent && this.$parent[ROOT_PROP]) || this
      }
      //   registerInstance(this, this)
    },
    destroyed () {
      //   registerInstance(this)
    }
  })

  Object.defineProperty(Vue.prototype, EXPOSED_PROP, {
    get () { return this.$root[PRIV_PROP] }
  })
}

export default install
