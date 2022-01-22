<template>
  <div class="form-container">
      <h2 class="form-container__title">Wecome...</h2>

      <transition name="fade" mode="out-in">
        <LoginForm v-if="showLogin" @login="enterHome"/>
        <SignupForm v-else @signup="enterHome"/>
      </transition>

      <div class="form-container__account" v-if="showLogin">
        <p>No account yet ?</p>
        <span @click="showLogin = false">Sign up</span>
      </div>

      <div class="form-container__account" v-else>
        <p>Have your account ?</p>
        <span @click="showLogin = true">Log in</span>
      </div>
  </div>
</template>

<script>
import LoginForm from '../components/auth/LoginForm.vue'
import SignupForm from '../components/auth/SignupForm.vue'
import { useRouter } from 'vue-router';
import { ref } from 'vue'

export default {
    components: { LoginForm, SignupForm},
    setup() {
        const router = useRouter()

        const showLogin = ref(true)

        const enterHome = () => {
            router.push({ name: 'Home'})
        }

        return { enterHome, showLogin }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/css/main';
.form-container__title {
    margin-bottom: 24px;
}
.form-container__account {
    text-align: center;
    & span {
        display: block;
        padding-bottom: 0.5em;
        margin-top: 0.5em;
        color: main.$main;
        position: relative;
        cursor: pointer;
    }

    & span::after {
        content: '';
        position: absolute;
        left: 15%;
        bottom: 0;
        width: 70%;
        height: 2px;
        background: main.$main;
        transition: all 0.3s;
        transform: scaleX(0);
        transform-origin: left;
    }

    & span:hover::after {
        transform: scaleX(1);
    }
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-active, .fade-leave-active {
    transition: all 0.3s ease;
}
</style>
