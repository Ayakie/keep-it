import { projectFirestore } from "../firebase/config";
import { ref } from "@vue/reactivity"
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

// 	ドキュメントを更新または削除する
const useDocument = (path) => {

    const error = ref(null)
    const docRef = doc(projectFirestore, path)

    const _updateDoc = async (data) => {
        
        try {
            await updateDoc(docRef, data)
            error.value = null

        } catch (err) {
            console.log('error occurred in updateDoc:', err.message)
            error.value = err.message
        }
    }

    const _deleteDoc = async () => {
        
        try {
            await deleteDoc(docRef)
            error.value = null

        } catch (err) {
            console.log('error occurred in deleteDoc:', err.message)
        }
    }

    return { error, _updateDoc, _deleteDoc}
}

export default useDocument