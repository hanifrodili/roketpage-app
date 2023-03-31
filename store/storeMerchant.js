import { defineStore } from 'pinia'

export const useStoreUser = defineStore('storeUser', () => {
  const user = ref({})

  function getUser() {
    const userString = window.localStorage.getItem('roketpage_merchant')
    if (userString) {
      user.value = JSON.parse(userString)
    }else {
      user.value = {}
    }
  }

  function setUser(val) {
    if (val) {
      window.localStorage.setItem('roketpage_merchant', JSON.stringify(val))
      user.value = val
    } else {
      window.localStorage.removeItem('roketpage_merchant')
      user.val = {}
    }
  }
  return { getUser, setUser, user }
})