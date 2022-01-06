import { projectFirestore } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { ref } from "@vue/reactivity"

const useCollection = () => {
    const error = ref(null)
    const _addDoc = async (path, data) => {
        error.value = null
        try {
            // const usersCollectionRef = collection(projectFirestore, `users/${uid}/${category}`)
            const res = await addDoc(collection(projectFirestore, path), data)
            
            return res

        } catch (err) {
            error.value  = err.message
            console.log(error.value)
        }
    }
    
    return { error, _addDoc}
}

export default useCollection