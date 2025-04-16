<template>
  <div class="w-screen h-screen flex justify-center items-center bg-white rounded-md">
    <div class="w-full p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-2">
          UZ
          <span class="text-xl text-gray-2">MANAGER</span>
        </h1>
      </div>

      <div class="space-y-4 text-center">
        <h2 class="text-2xl font-bold text-coral-6">エラーが発生しました</h2>
        <p class="text-gray-2">申し訳ありませんが、エラーが発生しました。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageTitle } from '@/composables/usePageTitle'

usePageTitle('エラー')
</script>
