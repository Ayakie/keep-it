<template>
<p class="card-item__date">
    {{ createdTime }}
</p>
<div class="card-item__img" :class="{hasImg: doc.downloadUrl}" :style="{backgroundColor: bgColor}">
    <img :src="doc.downloadUrl" v-if="doc.downloadUrl">
    <div class="caption">
        <blockquote class="caption__blockquote"
        :class="{ quote: category==='quote' }"
        >
            <p> {{ snippet }} </p>

            <!-- <img src="../../assets/image/quotation.svg" alt="" srcset=""> -->
        </blockquote>
        <p class="caption__author">
            {{doc.author }}
            <span v-if="doc.year"> ({{doc.year}}) </span>
        </p>
        
    </div>
</div>
<p class="card-item__title">
    {{ doc.title }}
</p>
<!-- <span class="card-item__year">
    ({{ doc.year }})
</span> -->
</template>

<script>
import { format } from 'date-fns'
import { computed } from '@vue/reactivity'
import { ja } from 'date-fns/locale'
import { getColor } from '@/composables/functions'

export default {
    props: ["doc", "category", "idx"],
    setup(props) {
        // console.log(props.doc)
        let bgColor

        const createdTime = format(props.doc.createdAt.toDate(), 'yyyy.MM.dd', {locale: ja})

        const snippet = computed(() => {
            if (props.doc.body.length >= 200) {
                return props.doc.body.substring(0, 200) + "..."
            } else {
                return props.doc.body
            }
        })

        if (props.category !== 'quote') {
            bgColor = getColor(props.idx)
        } else {
            bgColor = '#F9F7F0'
        }

        return { createdTime, snippet, bgColor }
    }
}
</script>

<style lang="scss">
@use '/src/assets/css/main';

/* single card */
$card-width: 220px;

.card-item {
    color: main.$bg-white;
    display: inline-block;
    width: $card-width;
    height: $card-width * 1.136363;
    // background: rgba($color: #000000, $alpha: .3);
    margin: 16px;
    border-radius: 5px;
    position: relative;

    &.single {
        transition: all .2s;
    }

    &.single:hover {
        transform: scale(1.03);
    }
    
    // 画像サイズ
    $img-width: 200px;
    &__img {
        background: rgba($color: main.$bg-white, $alpha: 1.0);
        color: main.$primary;
        position: relative;
        left: $card-width - $img-width;
        height: $img-width * 1.1;
        width: $img-width;
        border-radius: 5px;
        box-shadow: 2px 5px 3px rgba($color: #000000, $alpha: 0.7);
        overflow: hidden;
    }
    
    &__title {
        display: inline;
        position: absolute;
        bottom: 0;
        right: $img-width / 2;
        transform: translate(50%);
        text-align: center;
    }
    &__date {
        position: absolute;
        transform: rotate(-90deg);
        transform-origin: bottom;
        top: 20px;
        left: -0.6rem;
        font-size: 12px;
        font-weight: 100;
    }
}

/* 画像の中のキャプション */
.caption {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // opacity: 1;
    // background: rgba($color: #000000, $alpha: 0);
    white-space: normal;

    &__blockquote {
        position: relative;
        padding: 0.5rem;
        font-size: 15px;
    }
    &__blockquote.quote p{
        text-indent: 1.2rem;

        // quotation svg
        &::before {
            content: "";
            background-color: main.$secondary;
            mask: url("../../assets/image/quotation.svg");
            // 画像の大きさ
            display: inline-block;
            height: 1rem;
            width: 1rem;
            vertical-align: middle;
            // 位置
            position: absolute;
            top: 0;
            left: 0.5rem;
            z-index: 1;
        }

        &::after {
            content: "";
            background-color: main.$secondary;
            mask: url("../../assets/image/quotation.svg");
            // 画像の大きさ
            display: inline-block;
            height: 1rem;
            width: 1rem;
            vertical-align: middle;
            // 位置
            position: absolute;
            bottom: 0;
            right: 0.5rem;
            z-index: 1;
            transform: scale(-1,-1);
        }
    }
}

/* 画像がある場合にオーバーレイ */
.card-item__img.hasImg {
    color: main.$bg-white;

    & .caption {
        transition: all 0.5s;
        opacity: 0;
        background: rgba($color: #000000, $alpha: 0);
    }
    &:hover .caption {
        opacity: 1;
        background: rgba($color: #000000, $alpha: 0.5);
    }
}

@media (min-width: 744px) {
    $card-width: 330px;
    $img-width: 300px;
    .card-item {
        width: $card-width;
        height: $card-width * 1.15;

        &__img {
            left: $card-width - $img-width;
            height: $img-width * 1.1;
            width: $img-width;
        }

        &__title {
            right: $img-width / 2;
        }
    }
}

</style>