/*!
  * vue-hub v0.0.0 - A Vue plugin for managing and spawning views detached from the vue-router
  * (c) 2021 Victornpb
  * @license MIT
  */
const LOG_PREFIX = '[ComponentManager]';

let id = 0;
class ComponentManager {
  constructor (vtoptions) {
    this.options = vtoptions;
    this._registeredComponents = Object.fromEntries(vtoptions.components.map(comp => ([comp.name, comp])));

    this._instances = [];

    // for (const component of vtoptions.components) {
    //     this._instances[component.name] = [];
    // }
  }

  async open (componentName, options) {
    const instance = await this.create(componentName, options);
    this.push(instance);
    return instance
  }

  async create (componentName, options) {
    console.log(LOG_PREFIX, 'create', 'args', componentName, options);
    const componentEntry = this._registeredComponents[componentName];
    if (componentEntry) {
      const viewModel = {
        id: ++id,
        name: componentEntry.name,
        Component: componentEntry.component,
        node: null,
        alive: false,
        arguments: { ...options }
      };
      console.log(LOG_PREFIX, 'create', viewModel);
      return viewModel
    } else {
      console.error('Unknown Component!', componentName);
    }
  }

  push (viewModel) {
    this._instances.push(viewModel);
  }

  remove (viewModel) {
    const i = this._instances.indexOf(viewModel);
    if (i > -1) this._instances.splice(i, 1);
  }

  getInstanceById (id) {
    return this._instances.find(ins => ins.id === id)
  }
}

const INSTANCE_PROP_OPTION = 'windowManager';
const EXPOSED_PROP = '$vtwm';

const RENDERER_COMP_NAME = 'Renderer';
const PROXY_COMP_NAME = 'Proxy';

const PRIV_PROP = '_vtwm';
const ROOT_PROP = '_rootWindowManager';

var script$1 = {
    inheritAttrs: false,
    props:{

    },
    data() {
        return {
            items: [],
        };
    },
    created() {
        this.items = this[EXPOSED_PROP]._instances; // adding to model so vue makes it observable
    },
    render(h) {
        return h('div', this.items.map(def => {
            
            // if(def.node) return def.node;
            const node = h(def.Component, {
                props: {
                    id: def.id,
                    ...def.arguments.props,
                },
                attrs:{
                    'data-id': def.id,
                },
                on: def.arguments.on,
            });
            def.node = node;
            return node;
        }));
    }
};

script$1.__file = "src/Renderer.vue";

var script = {
  inheritAttrs: false,
  props: {
    name: String,
    id: Number,
    keep: Boolean,
  },
  data() {
    return {
      instance: null,
    };
  },
  async created() {
    if (this.id) {
      this.instance = this[EXPOSED_PROP].getInstanceById(this.id);
    }

    if (!this.instance) {
      this.instance = await this[EXPOSED_PROP].create(this.name, {
        props: this.$attrs,
        on: this.$listeners,
      });
      this[EXPOSED_PROP].push(this.instance);

      this.$emit("update:id", this.instance.id);
    }
    this.$attrs.foo = 123;
  },
  destroyed() {
    if (!this.keep) {
      this[EXPOSED_PROP].remove(this.instance);
    }
  },
  render(h) {
    return null;
  },
};

script.__file = "src/Proxy.vue";

function install(Vue, options) {
  
  // Register components
  Vue.component(RENDERER_COMP_NAME, script$1);
  Vue.component(PROXY_COMP_NAME, script);

  Vue.mixin({
    beforeCreate () {
      const pluginInstance = this.$options[INSTANCE_PROP_OPTION];
      if (pluginInstance) {
        this.$root[PRIV_PROP] = pluginInstance;
        window.v = pluginInstance;

        // Vue.util.defineReactive(this, '_route', this[PRIV_PROP].history.current)
      } else {
        this[ROOT_PROP] = (this.$parent && this.$parent[ROOT_PROP]) || this;
      }
      //   registerInstance(this, this)
    },
    destroyed () {
      //   registerInstance(this)
    }
  });

  Object.defineProperty(Vue.prototype, EXPOSED_PROP, {
    get () { return this.$root[PRIV_PROP] }
  });
}

ComponentManager.install = install;

export default ComponentManager;
