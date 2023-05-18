<template>
  <router-view />
  <span>{{ count }} {{ testCount }}</span>
  <button @click="counterStore.add">+1</button>
  <button @click="testStore.addTestCount">+1</button>
</template>
<script lang="ts" setup>
import { useCounterStore } from '@/store/modules/counter';
import { useTest } from '@/store/modules/test';
import { computed } from 'vue';
const counterStore = useCounterStore();
const testStore = useTest();
const count = computed(() => counterStore.count);
const testCount = computed(() => testStore.testCount);
</script>
