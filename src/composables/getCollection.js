import { projectFirestore } from "../firebase/config";
import { collection, doc, getDocs, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { ref } from "@vue/reactivity"
import { watchEffect } from '@vue/runtime-core';

// コレクションに含まれる全てのドキュメントを取得する
const getCollection = (path, _query, order='createdAt') => {
    
    const error = ref(null)
    const documents = ref([])

    // `users/${user.uid}/${category}`
    let collectionRef = collection(projectFirestore, path)

    // query
    collectionRef= query(collectionRef, orderBy(order))

    if (_query) {
        collectionRef = query(collectionRef, where(..._query))
    }

    const unsub = onSnapshot(collectionRef, (snap) => {
        let results = []
        snap.forEach(doc => {
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
        })

        // update value
        documents.value = results
        // console.log(documents.value)

    }, (err) => {
        error.value = err.message
        console.log(error.value)
        documents.value = []
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { error, documents }
}

export default getCollection