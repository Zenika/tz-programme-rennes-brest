<template>
  <div
    @click="onClick"
    class="talk"
    :data-trackname="track"
    :class="{
      'py-2': props.displaySize === 1,
      'py-4': props.displaySize === 2,
      'py-8': props.displaySize === 3,
      clickable: !!props.summary,
    }"
  >
    <h2 class="font-bold">{{ title }}</h2>
    <div class="text-sm">
      <p v-if="authorsList">{{ authorsList }}</p>
      <p v-if="category">{{ category }}</p>
    </div>

    <Teleport to="body" v-if="openDialog">
      <div
        @click.self="openDialog = false"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div class="bg-white p-6 max-w-xl rounded-lg">
          <div class="flex items-start">
            <h2 class="font-bold grow">
              {{ title }}
            </h2>
            <button
              class="-mt-2 -mr-2 shrink-0 p-3 rounded-full hover:bg-gray-200 size-10 flex items-center justify-center"
              @click="openDialog = false"
              aria-label="Fermer le détail"
            >
              &times;
            </button>
          </div>

          <span class="text-sm"
            >{{ track
            }}<template v-if="authorsList"> | {{ authorsList }}</template>
            <template v-if="category"> | {{ category }}</template></span
          >
          <p class="my-4" v-if="summary">{{ summary }}</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const openDialog = ref(false);

const onClick = () => {
  if (props.summary) {
    openDialog.value = true;
  }
};

const props = defineProps<{
  title: string;
  authors?: string[];
  category?: string;
  displaySize?: number;
  summary?: string;
  track?: string;
}>();

const authorsList = computed(() => {
  return props.authors?.length
    ? `${
        props.authors.length > 1
          ? `${props.authors.slice(0, -1).join(", ")} & ${props.authors.slice(
              -1
            )}`
          : props.authors[0]
      }`
    : "";
});
</script>

<style lang="scss" scoped>
.talk {
  @apply px-3;

  &.clickable {
    cursor: pointer;

    &:hover {
      @apply bg-gray-100;
    }
  }
}
</style>
