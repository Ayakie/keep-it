<template>
  <header class="header" v-if="user">
      <div class="header__container">
          <!-- left -->
        <div class="header__left"></div>
        <div class="header__right">
            <p class="header__user">Hello, {{user.displayName}} !</p>
            <button class="header__btn" @click="handleLogout">
                <span class="btn__description">Log out</span>
            </button>
        </div>
      </div>
  </header>
</template>

<script>
import getUser from '../composables/getUser'
import useLogout from '../composables/useLogout'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()

        const { error, logout } = useLogout()

        const handleLogout = async () => {
            await logout()
            if (!error.value) {
                router.push({ name: 'Welcome'})
            } else {
                console.log(error.value)
            }

        }

        const user = getUser()

        return { error, handleLogout, user}
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/css/main';

</style>