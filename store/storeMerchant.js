import { defineStore } from 'pinia'

export const useStoreUser = defineStore('storeUser', () => {
  const user = ref({})

  async function getUser() {
    const supabase = useSupabaseAuthClient()
    const userString = window.localStorage.getItem('roketpage_merchant')
    if (userString) {
      user.value = JSON.parse(userString)
      if (user.value.current_company) {
        let resp = await supabase
          .from('company_team')
          .select(`
            profiles(*),
            company(*),
            company_team_role(*)
          `)
          .eq('user_id', user.value.id)
          .eq('company_id', user.value.current_company.id)
          .single()
        user.value.current_company.company = resp.data.company
        user.value.current_company.role = resp.data.company_team_role
        user.value.profile = resp.data.profiles
      }
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