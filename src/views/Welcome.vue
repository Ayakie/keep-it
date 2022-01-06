<template>
  <div class="form-container">
      <h2 class="title">Wecome...</h2>
      <LoginForm @login="enterHome"/>
  </div>
</template>

<script>
import LoginForm from '../components/auth/LoginForm.vue'
import SignupForm from '../components/auth/SignupForm.vue'
import { useRouter } from 'vue-router';

export default {
    components: { LoginForm, SignupForm},
    setup() {
        const router = useRouter()
        const enterHome = () => {
            router.push({ name: 'Home'})
        }

        return { enterHome }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/main';
#app {
    background-color: main.$bg-white;
    color: main.$primary;
}
.title {
    margin-bottom: 24px;
}
</style>
