<template>
  <form class="form" @submit.prevent="handleSubmit">
      <div class="form-item">
          <input type="text" class="form-item__input" placeholder="your name" v-model="displayName" required>
      </div>
      <div class="form-item">
          <input type="email" class="form-item__input" placeholder="email" v-model="email" required>
      </div>
      <div class="form-item">
          <input type="password" class="form-item__input" placeholder="password（more than 6 letters）" v-model="password" required>
      </div>

      <div class="error"> {{error}} </div>
      <div class="btn-container">
        <button class="btn btn--login">
            <span class="btn__description">Sign up</span>
        </button>
      </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useSignup from "../../composables/useSignup"

export default {
    setup(props, context) {

        const displayName = ref("")
        const email = ref("")
        const password = ref("")

        const { error, signup } = useSignup()
        
        const handleSubmit = async () => {
            
            await signup(email.value, password.value, displayName.value)

            if (!error.value) {
                context.emit('signup')
            }

        }
 
        return { displayName, email, password, handleSubmit, error }
    }

}
</script>

<style>

</style>