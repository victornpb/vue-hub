
<script>
import {EXPOSED_PROP} from './constants';
export default {
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
}
</script>