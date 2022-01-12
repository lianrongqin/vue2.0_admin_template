<template>
  <div class="tj-breadcrumb">
    <el-breadcrumb>
      <el-breadcrumb-item
        :key="i"
        v-for="(item,i) in breadcrumb"
      >
        {{isObject(item)? item.label:item}}
        <el-badge
          :value="item.badge"
          v-if="isObject(item) && item.badge"
        ></el-badge>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

@Component({
  name: 'breadcrumb',
  components: {}
})
export default class extends Vue {
  @Prop({ default: () => [] }) breadcrumb: any[];
  isObject(item) {
    return item && item.toString() === '[object Object]';
  }
}
</script>
<style lang='scss'>
@include b(breadcrumb) {
  .el-breadcrumb {
    height: 50px;
    line-height: 50px;
    background-color: $--background-color-white;
    font-weight: bold;
    padding-left: 15px;
  }
}
</style>
