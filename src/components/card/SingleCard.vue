<template>
<p class="card-item__date">
    {{ createdTime }}
</p>
<div class="card-item__img">
    <img :src="doc.downloadUrl" v-if="doc.downloadUrl">
    <div class="caption">
        <h3> {{doc.author }} </h3>
        <blockquote :class="{ caption__quote: category==='quote' }">
            <p> {{ snippet }} </p>

            <!-- <img src="../../assets/quotation.svg" alt="" srcset=""> -->
        </blockquote>
        
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

export default {
    props: ["doc", "category"],
    setup(props) {
        // console.log(props.doc)
        const createdTime = format(props.doc.createdAt.toDate(), 'yyyy.MM.dd', {locale: ja})

        const snippet = computed(() => {
            if (props.doc.body.length >= 200) {
                return props.doc.body.substring(0, 200) + "..."
            } else {
                return props.doc.body
            }
        })

        return { createdTime, snippet }
    }
}
</script>

<style lang="scss">
@use '/src/assets/sass/main';

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
        position: relative;
        left: $card-width - $img-width;
        height: $img-width * 1.1;
        width: $img-width;
        border-radius: 5px;
        box-shadow: 3px 3px 3px rgba($color: #000000, $alpha: 0.7);
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
    }
}

.card-item__img img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    transition: 0.5s;
    // background-color: rgba(0,0,0,0);
    opacity: 1;
    background: rgba($color: #000000, $alpha: 0);
    white-space: normal;

    &__quote {
        position: relative;
        // padding: 0 1rem ;
    }
    &__quote p{
        text-indent: 1.5rem;

        // quotation svg
        &::before {
            content: "";
            background-color: main.$gray-light;
            mask: url("../../assets/quotation.svg");
            // 画像の大きさ
            display: inline-block;
            height: 1rem;
            width: 1rem;
            vertical-align: middle;
            // 位置
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        }

        &::after {
            content: "";
            background-color: main.$gray-light;
            mask: url("../../assets/quotation.svg");
            // 画像の大きさ
            display: inline-block;
            height: 1rem;
            width: 1rem;
            vertical-align: middle;
            // 位置
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: -1;
            transform: scale(-1,-1);
        }
    }
}
</style>