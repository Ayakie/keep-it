<template>
<div class="back" @click="handleClick">
  <span class="back__description">
      <slot>
          戻る
      </slot>
    </span>
</div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    props:["goBack", "uid", "category"],

    setup(props) {
        const router = useRouter()
        const handleClick = () => {
            
            if (props.goBack === 'Home') {
                console.log(props.goBack)

                router.go(-1)

            } else if (props.goBack === 'ListView') {
                console.log(props.uid)
                router.push({name: 'ListView', params: {uid: props.uid, category: props.category}})

            }
        }

        return { handleClick }
    }

}
</script>

<style lang="scss">
@use '../assets/css/main';

.material-icons.back {
    position: absolute;
    right: 51%;
    top: 0;
    transform: translateX(-50%);
    transition: all 0.2s linear;
}

.back__description {
    position: relative;
    line-height: 24px;

    &::before {
        font-family: 'Material Icons';
        content: '\e2ea';
        vertical-align: middle;
        font-size: 22px;
        position: absolute;
        left: -25px;
        top: 0px;
        transition: all 0.2s linear;
    }

}

.back {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: main.$main;

    &:hover .back__description::before {
        left: -30px;
    }
}
</style>