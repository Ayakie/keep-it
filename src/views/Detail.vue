<template>
  <div class="form-container">
    <form action="" class="form">
      <!-- ======= common ======== -->
      <div class="form-item">
        <p class="form-item__label">カテゴリ</p>
        <div class="form-item__select-box">
          <select name="" id="" v-model="category">
            <option value="quick-note" selected>Quick Note</option>
            <option value="art">アート</option>
            <option value="quote">ことば</option>
            <option value="gourmet">グルメ・ファッション</option>
          </select>
        </div>
      </div>

      <!-- title -->
      <div class="form-item" v-if="category === 'art'">
        <p class="form-item__label">タイトル</p>
        <input
          class="form-item__input"
          type="text"
          placeholder="夜のプロヴァンスの田舎道"
          v-model="title"
        required/>
      </div>
      <div class="form-item" v-if="category === 'gourmet'">
        <p class="form-item__label">アイテム名</p>
        <input
          class="form-item__input"
          type="text"
          placeholder="舞鶴"
          v-model="title"
        required/>
      </div>

      <!-- year -->
      <div class="form-item" v-if="category === 'art'">
        <p class="form-item__label">製作年</p>
        <input type="text" class="form-item__input"
        placeholder="1890"
        v-model="year"
        />
      </div>

      <!-- author -->
      <div class="form-item" v-if="category === 'gourmet'">
        <p class="form-item__label">ブランド名や生産地</p>
        <input
          class="form-item__input"
          type="text"
          placeholder="長岡"
          v-model="author"
        />
      </div>
      <div class="form-item" v-else>
        <p class="form-item__label">出典や作者</p>
        <input
          class="form-item__input"
          type="text"
          placeholder="Van Gogh"
          v-model="author"
        />
      </div>

      <!-- body -->
      <div class="form-item">
        <p class="form-item__label" v-if="category === 'quote'">本文</p>
        <p class="form-item__label" v-else>メモ</p>
        <textarea
          class="form-item__input"
          cols="30"
          rows="1"
          v-model="body"
          ref="area"
        ></textarea>
      </div>

      <!-- url（参考URLなど） -->
      <div class="form-item">
        <p class="form-item__label">URL</p>
        <input
          class="form-item__input"
          type="url"
          placeholder="https://site.com"
          v-model="url"
        />
      </div>

      <!-- toggle switch -->
      <div class="form-item">
        <div class="form-item__has-img">
          <label for="hasImg">画像を置き換える</label>
          <Toggle
            v-model="hasImg"
            id="hasImg"
            on-label="はい"
            off-label="いいえ"
            class="form-item__toggle-switch"
          />
        </div>
      </div>

      <!-- upload file -->
      <div class="form-item">
        <input
          type="file"
          class="form-item__file"
          v-if="hasImg"
          @change="fileChange"
         required/>
        <div class="error" v-if="hasImg">{{ fileError }}</div>
      </div>
      <!-- 星評価 -->
      <!-- <div class="form-item">
        <p class="form-item__label">評価</p>
      </div> -->

      <!-- end of the form -->

      <button class="btn form__btn form__btn--update" @click.prevent="handleUpdate">
          <span class="material-icons update">check_circle</span>
          <p class="btn__description">更新する</p>
      </button>
      <button class="btn form__btn form__btn--delete" @click.prevent="handleDelete">
          <span class="material-icons delete">delete</span>
          <p class="btn__description">削除する</p>
      </button>
    </form>
  <BackPage />
  </div>

</template>

<script>
import { ref } from "@vue/reactivity";
import Toggle from "@vueform/toggle";
import { nextTick, watch } from "@vue/runtime-core";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import { timestamp } from "@/firebase/config";
import DataClass from "@/composables/makeData";
import { useRouter } from 'vue-router';
import BackPage from '@/components/BackPage.vue'
import getDocument from '../composables/getDocument';
import useDocument from '../composables/useDocument';

export default {
  components: { Toggle, BackPage },
  props: ["id", "uid", "category"],

  setup(props) {
    console.log(props.category);

    const title = ref("");
    const author = ref("");
    const year = ref("");
    const body = ref("");
    const url = ref("");
    const area = ref(null);
    const category = ref(props.category);
    const file = ref(null); //アップロードファイル
    const fileError = ref(null);
    const { url: downloadUrl, filePath, error: uploadError, uploadImg } = useStorage();
    const router = useRouter();
    const hasImg = ref(false)

    const path = `users/${props.uid}/${props.category}/${props.id}`
    const { error: fetchError, document, _getDoc } = getDocument(path)
    const { error: updateError, _updateDoc, _deleteDoc } = useDocument(path)

    // retrieve data from firestore
    const setupValue = (async () => {

        await _getDoc()
        // console.log('document.value: ', document.value)
        title.value = document.value.title
        author.value = document.value.author
        year.value = document.value.year
        body.value = document.value.body
        url.value = document.value.url

    })()

    // resize textarea
    const resize = () => {
      area.value.style.height = "auto";
      nextTick(() => {
        area.value.style.height = area.value.scrollHeight + "px";
      });
    };
    watch(body, () => resize());

    const handleUpdate = async () => {
      
      const data = new DataClass(timestamp(), author.value, body.value, url.value)

      // storageに画像を格納
      if (file.value) {
        await uploadImg(props.uid, category.value, file.value)
        data.dataMap['hasImg'] = true
        data.addData({downloadUrl: downloadUrl.value, filePath: filePath.value})
      }
      console.log(data.dataMap);

      // データ作成
      if (category.value === "art") {
        data.addData({title: title.value, year: year.value})
      } else if (category.value === "gourmet") {
        data.addData({title: title.value})
      }
      
      // データ更新
      await _updateDoc(data.dataMap)

      if (!updateError.value) {
        console.log('data updated')
        router.push({ name: 'Home' })
      }
    };

    const handleDelete = async () => {
        await _deleteDoc()

        if (!updateError.value) {
            console.log('data deleted')
            router.push({ name: 'Home' })
        }
    }

    // allowed file types
    const types = ["image/png", "image/jpeg", "image/svg+xml"];

    const fileChange = (e) => {
      const selected = e.target.files[0];

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Sorry...\n 有効なファイル形式はpngまたはjpegです";
      }
    };

    return {
      category,
      title,
      author,
      year,
      body,
      url,
      area,
      handleUpdate, handleDelete,
      fileChange,
      fileError, hasImg
    };
  },
};
</script>

<style lang="scss" scoped>
.form-item__toggle-switch {
    --toggle-width: 4rem;
}
</style>