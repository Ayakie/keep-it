import { ref } from "vue"
import { projectAuth } from '../firebase/config'
import { signInWithEmailAndPassword } from "firebase/auth"

const error = ref(null)

const login = async (email, password) => {
    error.value = null
    try {
        const res = await signInWithEmailAndPassword(projectAuth, email, password)
        error.value = null

        return res

    } catch (err) {
        error.value = "メールアドレスまたはパスワードが間違っています"
         console.log(err.message)
    }
}

const useLogin = () => {
    return { error, login }
}

export default useLogin

// Initialize the FirebaseUI Widget using Firebase.
// const ui = new firebaseui.auth.AuthUI(firebase.auth());
// const uiConfig = {
//     callbacks: {
//         signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//             return true;
//         }
//     },
//     signInFlow: 'popup',
//     signInSuccessUrl: '/home',
//     signInOptions: [
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID
//     ]
// }

// export { ui, uiConfig }
