
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'TjLazy'
})
export default class App extends Vue {
  visible$1 = false;
  @Prop({ type: Boolean }) visible;

  render(h) {
    if (this.visible) {
      this.visible$1 = true;
    }
    return this.visible$1 ? this.$slots.default : null;
  }
}
</script>