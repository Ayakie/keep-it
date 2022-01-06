<template>
<p class="card-item__date">
    {{ createdTime }}
</p>
<div class="card-item__img">
    <img :src="doc.downloadUrl" v-if="doc.downloadUrl">
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
    props: ['doc'],
    setup(props) {
        // console.log(props.doc)
        const createdTime = format(props.doc.createdAt.toDate(), 'yyyy.MM.dd', {locale: ja})

        return { createdTime }
    }
}
</script>

<style lang="scss">

</style>