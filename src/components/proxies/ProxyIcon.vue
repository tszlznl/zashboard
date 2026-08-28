<template>
  <span
    :class="`inline-block shrink-0 ${fill}`"
    :style="`width: ${size}px; height: ${size}px; margin-right: ${margin}px; mask-image: url('${icon}'); -webkit-mask-image: url('${icon}'); mask-size: contain; -webkit-mask-size: contain; mask-repeat: no-repeat; -webkit-mask-repeat: no-repeat; mask-position: center; -webkit-mask-position: center;`"
  >
    <span class="block h-full w-full bg-current"></span>
  </span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string
    fill?: string
    size?: number
    margin?: number
  }>(),
  {
    fill: 'currentColor',
    size: 18,
    margin: 0,
  },
)
</script>
