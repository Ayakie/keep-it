import { ref } from "@vue/reactivity";
import { projectStorage } from "../firebase/config";
import 'firebase/compat/storage'

const useStorage = () => {
    const error = ref(null)
    // public url which is accessed from frontend
    const url = ref(null)
    const filePath = ref(null)
    const isPending = ref(false)

    const uploadImg = async(uid, category, file) => {
        filePath.value = `${uid}/${category}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)
        // const storageRef = ref(projectStorage, filePath.value)
        
        try {
            isPending.value = true
            const res = await await storageRef.put(file)
            url.value = await res.ref.getDownloadURL(storageRef)

            // isPending.value = false

        } catch (err) {
            error.value = err.message
            console.log(error.value)
            isPending.value = false
        }
    }

    return { url, filePath, error, uploadImg, isPending }
}

export default useStorage