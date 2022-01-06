import { projectAuth } from "../firebase/config";
import { ref } from "@vue/reactivity";
import { onAuthStateChanged } from 'firebase/auth';

const user = ref(projectAuth.currentUser)

onAuthStateChanged(projectAuth, (_user) => {
    user.value = _user
    console.log('user state change. current user:', user.value)
})


const getUser = () => {
    return user
}

export default getUser