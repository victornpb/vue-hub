
<script>
import {EXPOSED_PROP} from './constants';
export default {
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
    else {
        // when keeping the instance alive, it will keep dispatching events to dead listeners
        // idk exactly how to handle this
        // this.instance.arguments.on = {};
    }
  },
  render(h) {
    return null;
  },
};
</script>