<template>
  <div>
    <p>JustSearch - {{ query }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SearchInput extends Vue {
  @Prop() private query!: string;
}
</script>
