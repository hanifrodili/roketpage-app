<template lang="pug">
.store
  h1 Test Pinia Store
  v-text-field(clearable label="Input" variant="outlined" v-model="strInput" type="text")
  v-btn.bg-primary( @click="add" variant="tonal") Add
  div.mt-5 {{ strList }}
    
</template>

<script setup>
import { useStrStore } from '~/store/testStore'
import { storeToRefs } from 'pinia'

const strInput = ref('')

const strStore = useStrStore()
const { addStrToList } = strStore
const { strList } = storeToRefs(strStore)

function add() {
  addStrToList(strInput.value), strInput.value = ''
}
</script>

<style lang="scss" scoped></style>
