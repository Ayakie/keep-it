<template>
<div class="block">

    <router-link class="router-link" :to="{name: 'ListView', params: {uid: uid, category: category}}">
        <h1 class="block__title" :class="category">{{ categoryName(category) }}</h1>
    </router-link>

    <ul class="card-list">
        <li v-for="doc in docs" :key="doc.id" class="card-item single">
            <router-link class="router-link" :to="{name: 'Detail', params: {id: doc.id, uid: uid, category: category, goBack:true}}">
                <SingleCard :doc="doc" :category="category"/>
            </router-link>

        </li>
    </ul>
</div>
</template>

<script>
import SingleCard from './SingleCard.vue'
import getCollection from '@/composables/getCollection'

export default {
    components:{ SingleCard },
    props: ["uid", "docs", "category"],
    setup(props) {

        const { documents: docs } = getCollection(`users/${props.uid}/${props.category}`)
        
        const categoryName = (category) => {
            let titleValue
            if (category === "quick-note") {
                titleValue = "Quick Note"
            } else if (category === "art") {
                titleValue = "アート"
            } else if (category === "quote") {
                titleValue = "ことば"
            } else if (category === "gourmet") {
                titleValue = "グルメ・ファッション"
            }
            return titleValue
       }

       return { categoryName, docs }
    }
}

</script>

<style lang="scss">

.router-link {
    color: inherit;
    text-decoration: none;
}

.block__title {
    margin-left: 20px;
    display: inline-block;
}
.block__title.quick-note {
    font-family: quicksand, sans-serif;
}
.block__title.art {
    font-family: 'Kaisei Tokumin', serif;
}
.block__title.quote {
    font-family: 'Kiwi Maru','Noto Sans JP', serif;
}
.block__title.gourmet {
    font-family: otomanopee-one, sans-serif;
}

/* card container */
.card-list {
    overflow-x: auto;
    white-space: nowrap; // 余白が改行されない = そのまま一行に表示
    overflow-y: hidden;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    cursor: pointer;
    margin-bottom: 12px;
}
</style>