<template>
<Navbar />
<router-link class="router-link" :to="{name: 'Home'}">
    <p class="list-view h1-title" :class="category">ホームへ</p>
</router-link>

<div v-for="(doc, idx) in docs" :key="doc.id">
    
    <div class="list-item-container">

        <div class="list-item">
            <!-- 左 -->
            <div class="list-item__left left">
                <!-- createdAt -->
                <p class="left__date">
                    {{ createdTime(doc.createdAt) }}
                </p>
                <!-- 画像 -->
                <div class="left__thumbnail" :style="{backgroundColor: bgColor(idx)}">
                    <div v-if="!doc.downloadUrl">
                        No Image
                    </div>
                    <img :src="doc.downloadUrl" v-if="doc.downloadUrl">
                </div>
                <router-link class="router-link" :to="{name: 'Detail', params: {id: doc.id, uid: uid, category: category, goBack:'ListView'}}">
                    <span class="left__edit">編集する</span>
                </router-link>
            </div>

            <!-- 右 -->
            <div class="list-item__right right">
                <div class="right__head head">
                    <!-- タイトル、著者、年 -->
                    <div class="head__title">
                        <h3 v-if="doc.title" class="head__title--title">「{{doc.title}}」</h3>
                        <p class="head__title--author">{{doc.author}}
                            <span v-if="doc.year">({{doc.year}})</span>
                        </p>
                    </div>
                    <a :href="doc.url" target="__blank" class="head__link" v-if="doc.url">
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
import Navbar from '@/components/Navbar.vue'
import { getCategoryName, getColor } from '@/composables/functions'

export default {
    props: ["uid", "category"],
    components: { Navbar },
    setup(props) {
        
        // let bgColor
        const { documents:docs } = getCollection(`users/${props.uid}/${props.category}`)

        const createdTime = (time) => {
            return format(time.toDate(), 'yyyy.MM.dd', {locale: ja})
        }

        const bgColor = (idx) => {
            if (props.category !== 'quote') {
                return getColor(idx)
            } else {
                return '#F9F7F0'
            }
        }

        return { docs, createdTime, getCategoryName, bgColor }
    }
}
</script>

<style lang="scss">
@use '/src/assets/sass/main';

.list-view.h1-title {
    display: inline-block;
    position: relative;
    padding-left: 8px;
    margin-left: 48px;
    margin-top: 24px;

    &::before {
        content: '';
        // 位置
        position: absolute;
        top: 50% + 8;
        right: 100%;

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
        left: 0 - main.$arrow-length;

        width: 10px;
        height: 1px;
        background: main.$bg-white;
        transform: rotate(-35deg);
        transform-origin: top left;

        transition: all 0.2s linear;

    }

    // hover時の形状
    &:hover::before {
        width: main.$arrow-length + 15px;
    }
    &:hover::after {
        left: 0 - main.$arrow-length - 15px;
    }
}

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
        background: main.$bg-white;
        width: $img-width;
        height: $img-width;
        border-radius: 5px;
        overflow: hidden;
        margin: 4px 0;
        position: relative;
        color: main.$primary;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__edit {
        width: $img-width;
        text-align: center;
        position: relative;
        display: inline-block;
        padding-bottom: 4px;

        // 下線
        &::after {
            content: '';
            position: absolute;
            width: 0;
            bottom: 0;
            left: 24px;
            transition: all 0.2s linear;
            background-color: main.$accent;
            height: 1px;
        }

        &:hover::after {
            width: 50%;

        }
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
    margin-bottom: 8px;

    &__title {
        font-weight: 300;
        margin-right: 8px;

        &--title {
            margin-bottom: 4px;
        }

        &--author {
            font-weight: 100;
        }
    }
}

.head__link {
    color: main.$bg-white;
    transition: all 0.2s;

    &:hover {
        color: main.$accent;
    }
}

/* PC layout */
@media (min-width: 744px) {

    $img-width: 130px;

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
            font-size: 14px;
        }
    }

    .left {
        &__thumbnail {

            width: $img-width;
            height: $img-width;
        }

        &__edit {
            width: $img-width;

            &::after {
                left: 30px;
            }
        }
    }

    .head {
        &__author {
            font-size: 18px;
        }
    }
}
</style>