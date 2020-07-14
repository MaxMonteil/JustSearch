<template>
  <div>
    <input type="text" v-model="query">
    <SearchInput :query="query"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SearchInput from './components/SearchInput.vue'

@Component({
  components: {
    SearchInput
  }
})
export default class App extends Vue {
  public query = ''
}
</script>
