import { defineStore } from 'pinia'

export const useStrStore = defineStore('storeStr', () => {
  const strList = ref([])

  function addStrToList(value) {
    if (value) {
      strList.value.push(value)
    }
  }
  return { addStrToList, strList }
})