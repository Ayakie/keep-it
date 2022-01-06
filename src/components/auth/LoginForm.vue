<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="form-item">
      <input class="form-item__input" type="email" placeholder="email" v-model="email">
    </div>
    <div class="form-item">
      <input class="form-item__input" type="password" placeholder="password" v-model="password">
    </div>
      <!-- social auth -->
      <div id="firebaseui-auth-container"></div>
      <div class="error"> {{ error }} </div>
      <button class="btn">Log in</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '../../composables/useLogin'
export default  {
  setup (props, context) {
    const email = ref('')
    const password = ref('')

    const { error, login } = useLogin()

    const handleSubmit = async() => {
      // awaitすることでエラー発生した時に自動でHomeへ遷移するのを防ぐ
      // はやりvalueいれるの忘れがち
      const res = await login(email.value, password.value)
      console.log(res)

      if (!error.value) {
        context.emit('login')
      }
    }
    return { email, password, handleSubmit, error }
  }
}
</script>

<style lang="scss" scoped>

</style>