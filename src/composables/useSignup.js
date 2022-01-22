import { ref } from 'vue'
import { projectAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const error = ref(null)

const signup = async (email, password, name) => {
    error.value = null

    try {
        
        const res = await createUserWithEmailAndPassword(projectAuth, email, password)
        if (!res) {
            throw new Error('サインアップが完了しませんでした')
        }

        await updateProfile(projectAuth.currentUser, { displayName: name})

    } catch (err) {
        error.value = err.message
        console.log(err.value)
    }
}

const useSignup = () => {
    return { error, signup }
}

export default useSignup