import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTest = defineStore(
  'test',
  () => {
    const testCount = ref(0);
    const addTestCount = () => testCount.value++;
    return { testCount, addTestCount };
  },
  { persist: { paths: ['testCount'] } },
);
