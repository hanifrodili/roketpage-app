<template lang="pug">
nuxt-layout
  nuxt-page.main-content
nuxt-snackbar
</template>

<script setup>
const supabase = useSupabaseAuthClient()
const config = useRuntimeConfig()

onMounted( async () => {
  // console.log(config);
  supabase.auth.onAuthStateChange((event, session) => {
    // console.log(event);
    
    if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
      // console.log(config.public.domain);
      // delete cookies on sign out
      const expires = new Date(0).toUTCString()
      // console.log(expires);
      document.cookie = `app-access-token=; path=/; expires=${expires};`
      document.cookie = `app-refresh-token=; path=/; expires=${expires};`
    } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      // console.log(session);
      // console.log(config.public);
      const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
      document.cookie = `app-access-token=${session.access_token}; Domain=${config.public.domain}; path=/; max-age=${maxAge}; SameSite=Lax; secure;`
      document.cookie = `app-refresh-token=${session.refresh_token}; Domain=${config.public.domain}; path=/; max-age=${maxAge}; SameSite=Lax; secure;`
    }
    // console.log(document.cookie);
  })

  const cookies = document.cookie.split(/\s*;\s*/).map(cookie => cookie.split('='));
  const accessTokenCookie = cookies.find(x => x[0] == 'app-access-token');
  const refreshTokenCookie = cookies.find(x => x[0] == 'app-refresh-token');

  if (accessTokenCookie && refreshTokenCookie) {
    await supabase.auth.setSession({
      access_token: accessTokenCookie[1],
      refresh_token: refreshTokenCookie[1],
    })
  }
})
</script>

<style lang="scss">
@use "./public/variables";
</style>