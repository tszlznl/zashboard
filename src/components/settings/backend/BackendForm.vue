<template>
  <div class="flex flex-col gap-3">
    <div class="flex gap-2">
      <div class="w-24">
        <label class="text-base-content/80 mb-1 block text-xs font-medium">{{
          $t('protocol')
        }}</label>
        <USelect
          v-model="model.protocol"
          :items="[
            { label: 'HTTP', value: 'http' },
            { label: 'HTTPS', value: 'https' },
          ]"
          size="sm"
          class="w-full"
        />
      </div>
      <div class="min-w-0 flex-1">
        <label class="text-base-content/80 mb-1 block text-xs font-medium">{{ $t('host') }}</label>
        <UInput
          v-model="model.host"
          placeholder="127.0.0.1"
          size="sm"
          class="w-full"
        />
      </div>
      <div class="w-20">
        <label class="text-base-content/80 mb-1 block text-xs font-medium">{{ $t('port') }}</label>
        <UInput
          v-model="model.port"
          placeholder="9090"
          size="sm"
          class="w-full"
        />
      </div>
    </div>

    <div>
      <div class="text-base-content/80 mb-1 flex items-center gap-1 text-xs font-medium">
        <span>{{ $t('secondaryPath') }}</span>
        <span class="text-base-content/50">({{ $t('optional') }})</span>
      </div>
      <UInput
        v-model="model.secondaryPath"
        size="sm"
        class="w-full"
      />
    </div>

    <div>
      <label class="text-base-content/80 mb-1 block text-xs font-medium">{{ $t('label') }}</label>
      <UInput
        v-model="model.label"
        size="sm"
        class="w-full"
      />
    </div>

    <div>
      <label class="text-base-content/80 mb-1 block text-xs font-medium">{{
        $t('password')
      }}</label>
      <UInput
        v-model="model.password"
        type="password"
        size="sm"
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Backend } from '@/types'

const model = defineModel<Omit<Backend, 'uuid'>>({ required: true })
</script>
