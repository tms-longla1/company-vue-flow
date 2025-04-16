<template>
  <div>
    <h1>{{ profile }}</h1>
    <button @click="handleClickLoginBtn">Login</button>
  </div>
</template>

<script setup lang="ts">
import { getMe, login } from '@/apis/auth.api'
import type { TLoginPayload } from '@/types/auth.type'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

const loginMutation = useMutation({
  mutationFn: (payload: TLoginPayload) => {
    return login(payload)
  }
})

const { data: getMeResponse } = useQuery({
  queryKey: ['getMe'],
  queryFn: () => {
    return getMe()
  }
})

const profile = computed(() => {
  return getMeResponse.value?.data
})

const handleClickLoginBtn = () => {
  loginMutation.mutate({
    username: 'test',
    password: 'test'
  })
}
</script>
