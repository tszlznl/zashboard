<template>
  <div class="hover:bg-base-200/40 flex flex-col gap-1 px-3 py-2.5 text-sm transition-colors">
    <div class="flex items-center gap-2">
      <span
        class="text-base-content/40 text-xs tabular-nums"
        :style="{ minWidth: `${(seqWithPadding.length + 1) * 0.62}em` }"
      >
        {{ seqWithPadding }}
      </span>
      <UBadge
        :color="badgeColorForType[log.type as keyof typeof badgeColorForType] || 'neutral'"
        variant="subtle"
        size="xs"
        class="font-mono text-[10px] uppercase"
      >
        <HighlightText
          :text="log.type"
          :filter="logFilter"
        />
      </UBadge>
      <div class="flex-1"></div>
      <span class="text-base-content/40 text-xs tabular-nums">
        <HighlightText
          :text="log.time"
          :filter="logFilter"
        />
      </span>
    </div>
    <div class="w-full leading-snug break-words">
      <HighlightText
        :text="log.payload"
        :filter="logFilter"
        ansi
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import HighlightText from '@/components/common/HighlightText.vue'
import { useBounceOnVisible } from '@/composables/bouncein'
import { LOG_LEVEL } from '@/constant'
import { logFilter } from '@/store/logs'
import type { LogWithSeq } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  log: LogWithSeq
}>()

const seqWithPadding = computed(() => {
  return props.log.seq.toString().padStart(2, '0')
})

type BadgeColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
const badgeColorForType: Record<string, BadgeColor> = {
  [LOG_LEVEL.Trace]: 'success',
  [LOG_LEVEL.Debug]: 'secondary',
  [LOG_LEVEL.Info]: 'info',
  [LOG_LEVEL.Warning]: 'warning',
  [LOG_LEVEL.Error]: 'error',
  [LOG_LEVEL.Fatal]: 'error',
  [LOG_LEVEL.Panic]: 'error',
}

useBounceOnVisible()
</script>
