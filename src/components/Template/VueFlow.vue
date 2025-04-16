<template>
  <div class="flex w-full h-full">
    <div class="w-[200px] p-5 bg-gray-100 border-r border-gray-300">
      <div
        v-for="node in nodeTypes"
        :key="node.type"
        class="mb-2.5 cursor-move"
        draggable="true"
        @dragstart="(e) => onDragStart(e, node)"
      >
        <div :class="['p-2.5 rounded text-center text-white', node.class]">
          {{ node.label }}
        </div>
      </div>
    </div>
    <div class="flex-1 bg-gray-50">
      <VueFlow
        v-model="elements"
        :default-viewport="{ zoom: 1.5 }"
        @connect="onConnect"
        @dragover="onDragOver"
        @drop="onDrop"
      >
        <Background pattern-color="#aaa" :gap="8" />
        <MiniMap />
        <Controls />
      </VueFlow>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import type { Connection, Edge, Node } from '@vue-flow/core'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import { MiniMap } from '@vue-flow/minimap'
import { ref } from 'vue'

const { project } = useVueFlow()

const elements = ref<(Node | Edge)[]>([])

const nodeTypes = [
  {
    type: 'input',
    label: 'Input Node',
    class: 'bg-red-500'
  },
  {
    type: 'default',
    label: 'Default Node',
    class: 'bg-blue-500'
  },
  {
    type: 'output',
    label: 'Output Node',
    class: 'bg-green-500'
  }
]

const onDragStart = (event: DragEvent, node: (typeof nodeTypes)[0]) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', JSON.stringify(node))
    event.dataTransfer.effectAllowed = 'move'
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onDrop = (event: DragEvent) => {
  if (event.dataTransfer) {
    const node = JSON.parse(event.dataTransfer.getData('application/vueflow'))

    // Get the position relative to the VueFlow container
    const vueFlowContainer = document.querySelector('.vue-flow__container')
    if (!vueFlowContainer) return

    const rect = vueFlowContainer.getBoundingClientRect()
    const position = project({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    })

    const newNode: Node = {
      id: `${node.type}-${Date.now()}`,
      type: node.type,
      position,
      label: node.label,
      draggable: true
    }

    elements.value.push(newNode)
  }
}

const onConnect = (params: Connection) => {
  const newEdge = {
    id: `e${params.source}-${params.target}`,
    source: params.source,
    target: params.target
  }
  elements.value.push(newEdge)
}
</script>

<style scoped>
.flow-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.drag-panel {
  width: 200px;
  padding: 20px;
  background: #f0f0f0;
  border-right: 1px solid #ddd;
}

.drag-item {
  margin-bottom: 10px;
  cursor: move;
}

.node {
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  color: white;
}

.node.input {
  background: #ff6b6b;
}

.node.default {
  background: #4dabf7;
}

.node.output {
  background: #51cf66;
}

.vue-flow-container {
  flex: 1;
  background: #f8f8f8;
}
</style>
