import { projectAuth } from "../firebase/config";
import { signOut } from "@firebase/auth";
import { ref } from "@vue/reactivity";

const error = ref(null)

const logout = async() => {
    error.value = null
    try {
        await signOut(projectAuth)
    } catch (err) {
        error.value = err.message
    }
}

const useLogout = () => {
    return { error, logout }
}

export default useLogout