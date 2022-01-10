<template>
<div class="block">

    <!-- タイトル -->
    <router-link class="router-link" :to="{name: 'ListView', params: {uid: uid, category: category}}">
        <h1 class="block-title h1-title" :class="category">{{ getCategoryName(category) }}</h1>
    </router-link>

    <!-- カードリスト -->
    <ul class="card-list">
        <li v-for="(doc, idx) in docs" :key="doc.id" class="card-item single">
            <router-link class="router-link" :to="{name: 'Detail', params: {id: doc.id, uid: uid, category: category, goBack:true}}">
                <SingleCard :doc="doc" :category="category" :idx="idx"/>
            </router-link>

        </li>
    </ul>
</div>
</template>

<script>
import SingleCard from './SingleCard.vue'
import getCollection from '@/composables/getCollection'
import { getCategoryName } from '@/composables/functions'

export default {
    components:{ SingleCard },
    props: ["uid", "docs", "category"],
    setup(props) {

        const { documents: docs } = getCollection(`users/${props.uid}/${props.category}`)

       return { getCategoryName, docs }
    }
}

</script>

<style lang="scss">
@use '/src/assets/sass/main';

.block {
    margin-top: 14px;
}

.router-link {
    color: inherit;
    text-decoration: none;
}

.block-title.h1-title {
    margin-left: 24px;
    display: inline-block;
    position: relative;
    padding-right: 8px;

    &::before {
        content: '';
        // 位置
        position: absolute;
        top: 50% + 8;
        left: 100%;

        // 形状
        width: main.$arrow-length;
        height: 1px;
        background: main.$bg-white;

        transition: all 0.2s linear;
    }

    &::after {
        content: '';
        position: absolute;
        top: 50% + 8;
        right: 0 - main.$arrow-length;

        width: 10px;
        height: 1px;
        background: main.$bg-white;
        transform: rotate(35deg);
        transform-origin: top right;

        transition: all 0.2s linear;

    }

    // hover時の形状
    &:hover::before {
        width: main.$arrow-length + 15px;
    }
    &:hover::after {
        right: 0 - main.$arrow-length - 15px;
    }
}


/* card container */
.card-list {
    overflow-x: auto;
    white-space: nowrap; // 余白が改行されない = そのまま一行に表示
    overflow-y: hidden;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    cursor: pointer;
}
</style>