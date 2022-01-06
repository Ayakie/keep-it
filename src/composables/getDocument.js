import { projectFirestore } from "../firebase/config";
import { ref } from "@vue/reactivity"
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

// 単一のドキュメントを取得する
const getDocument =  (path) => {

    const error = ref(null)
    const document = ref(null)

    // `users/${user.uid}/${category}/${id}`
    const docRef = doc(projectFirestore, path)

    const _getDoc = async () => {

        try {
            const docSnap = await getDoc(docRef)
            document.value = {...docSnap.data(), id: docSnap.id}
            // console.log('data fetched: ', document.value)
            if(!docSnap.exists()) {
                throw new Error('データを取得できませんでした')
            }
            error.value = null
        } catch (err) {
    
            console.log(err)
            error.value = err.message
        }

        return docRef
    }
    
    return { error, document, _getDoc }
}

export default getDocument