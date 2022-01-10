<template>
<Navbar />
<div v-for="doc in docs" :key="doc.id">
    
    <div class="list-item-container">

        <div class="list-item">
            <!-- 左 -->
            <div class="list-item__left left">
                <!-- createdAt -->
                <p class="left__date">
                    {{ createdTime(doc.createdAt) }}
                </p>
                <div class="left__thumbnail">
                    <img :src="doc.downloadUrl" v-if="doc.downloadUrl">
                </div>
                <router-link class="router-link" :to="{name: 'Detail', params: {id: doc.id, uid: uid, category: category, goBack:false}}">
                    <p class="left__edit">編集する</p>
                </router-link>
            </div>

            <!-- 右 -->
            <div class="list-item__right right">
                <div class="right__head head">
                    <!-- タイトル、著者、年 -->
                    <div class="head__title">
                        <h3 v-if="doc.title">「{{doc.title}}」</h3>
                        <p class="head__author">{{doc.author}}
                            <span v-if="doc.year">({{doc.year}})</span>
                        </p>
                    </div>
                    <a :href="doc.url" target="__blank" class="head__link">
                        <span class="material-icons">link</span>
                    </a>
                </div>
                <div class="right__body">
                    {{doc.body}}
                </div>
            </div>
        </div>
        <!-- list-item ここまで -->
    </div>

  </div>
</template>

<script>
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import getCollection from '@/composables/getCollection'
import Navbar from '@/components/Navbar.vue';

export default {
    props: ["uid", "category"],
    components: { Navbar },
    setup(props) {
        
        const { documents:docs } = getCollection(`users/${props.uid}/${props.category}`)

        const createdTime = (time) => {
            return format(time.toDate(), 'yyyy.MM.dd', {locale: ja})
        }

        return { docs, createdTime }
    }
}
</script>

<style lang="scss">
@use '/src/assets/sass/main';

$img-width: 100px;

.list-item-container {
    @extend %container;
    margin-top: 24px;
}

.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__right {
        text-align: center;
        flex: 2;
    }

    &__left {
        flex: 1;
        font-weight: 100;
        font-size: 10px;
    }
}

.left {
    &__thumbnail {
        width: $img-width;
        height: $img-width;
        border-radius: 5px;
        overflow: hidden;
    }

    &__edit {
        width: $img-width;
        text-align: center;
        margin-top: 4px;
    }
}

.right {
    &__body {
        font-weight: 300;
    }
}

.head {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;

    &__title {
        font-weight: 300;
    }

    &__author {
        font-weight: 100;
        font-size: 12px;
    }
}

.head__link {
    color: white;
}

/* PC layout */
@media (min-width: 744px) {
    .list-item-container {
        padding: 0 16px;
    }
    .list-item {
        justify-content: center;
        gap: clamp(40px, 7vw, 100px);

        &__right {
            flex: 5;
        }

        &__left {
            flex: 1;
        }
    }
}
</style>