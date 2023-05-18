<template>
  <router-view />
  <span>{{ count }}</span>
</template>
<script lang="ts" setup>
import { useCounterStore } from '@/store/modules/counter';
import { computed } from 'vue';
const counterStore = useCounterStore();
const count = computed(() => counterStore.count);
</script>
