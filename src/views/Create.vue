<template>
  <div class="form-container">
    <form action="" class="form" @submit.prevent="addData">
      <!-- category -->
      <div class="form-item">
        <p class="form-item__label">カテゴリ</p>
        <!-- <v-select :options="categories" taggable push-tag v-model="category"/>

        {{ category }} -->
        

        <div class="form-item__select-box">
          <select v-model="category" @change="bodyErrors = []">
            <option v-for="cat in categories" :key="cat" :value="cat.code">
              {{ cat.label }}
            </option>
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

      <!-- 星評価 -->
      <!-- <div class="form-item">
        <p class="form-item__label">評価</p>
      </div> -->

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

        <!-- validation -->
        <div class="error" v-if="!body">
          <ul>
            <li v-for="error in bodyErrors" :key="error">
              {{ error }}
            </li>
          </ul>
        </div>
      </div>

      <!-- url（参考リンクなど） -->
      <div class="form-item">
        <p class="form-item__label">リンク</p>
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
          <label for="toggle">画像を登録する</label>
          <Toggle
            v-model="toggle"
            id="toggle"
            on-label="はい"
            off-label="いいえ"
            class="form-item__toggle-switch"
            @change="fileErrors = []"
          />
        </div>
      </div>

      <!-- upload file -->
      <div class="form-item">
        <input
          type="file"
          class="form-item__file"
          v-if="toggle"
          @change="fileChange"
         />
        <div class="error" v-if="fileErrors.length">
            <ul>
                <li v-for="error in fileErrors" :key="error">
                    {{ error }}
                </li>
            </ul>
        </div>
      </div>
      <!-- end of the form -->
      
      <div class="btn-container">
        <button class="btn btn--register">
          <span class="btn__description">登録する</span>
        </button>
      </div>
    </form>
  <BackPage :goBack="'Home'"/>
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
import BackPage from"@/components/BackPage.vue";
import vSelect from "vue-select";

export default {
  components: { Toggle, BackPage, vSelect },
  props: ["uid"],

  setup(props) {

    const title = ref("");
    const author = ref("");
    const year = ref("");
    const body = ref("");
    const bodyErrors = ref([]);
    const url = ref("");
    const area = ref(null);
    const file = ref(null); //アップロードファイル
    const fileErrors = ref([]);
    const { url: downloadUrl, filePath, error: uploadError, uploadImg } = useStorage();
    const { error: addError, _addDoc } = useCollection();
    const router = useRouter();
    const toggle = ref(false);
    const category = ref('quick-note');
    const categories = ref([
      { label: 'Quick Note', code: 'quick-note' },
      { label: 'アート', code: 'art' },
      { label: 'ことば', code: 'quote' },
      { label: 'グルメ・ファッション', code: 'gourmet'}
      ])

    // resize textarea
    const resize = () => {
      area.value.style.height = "auto";
      nextTick(() => {
        area.value.style.height = area.value.scrollHeight + "px";
      });
    };
    watch(body, () => resize());

    // handle submit
    const addData = async () => {
            
      // validation
      fileErrors.value = []
      bodyErrors.value = []

      if (toggle.value && !file.value) {

        fileErrors.value.push('画像が選択されていません')

      }

      if (category.value === "quick-note" && !body.value) {

        bodyErrors.value.push('メモは必須です')

      } else if (category.value === "quote" && !body.value) {

        bodyErrors.value.push('本文は必須です')

      }

      // データインスタンスの作成
      const data = new DataClass(timestamp(), author.value, body.value, url.value)
      
      // storageに画像を格納
      if (file.value) {

        await uploadImg(props.uid, category.value, file.value)

        // データインスタンスの更新
        data.dataMap['hasImg'] = true
        data.addData({downloadUrl: downloadUrl.value, filePath: filePath.value})

      }

      // データ作成
      if (category.value === "art") {

        data.addData({title: title.value, year: year.value})

      } else if (category.value === "gourmet") {

        data.addData({title: title.value})

      }
      
      // データ追加
      if (!fileErrors.value.length && !bodyErrors.value.length) {

        await _addDoc(`users/${props.uid}/${category.value}`, data.dataMap)

      }

      // ホームへリダイレクト
      if (!addError.value && !fileErrors.value.length && !bodyErrors.value.length) {

        console.log('data added')
        router.push({ name: 'Home' })

      }
    };

    // allowed file types
    const types = ["image/png", "image/jpeg", "image/svg+xml"];

    const fileChange = (e) => {

      const selected = e.target.files[0];
      fileErrors.value = [];

      if (selected && types.includes(selected.type)) {

        fileErrors.value = [];
        file.value = selected;

      } else {

        file.value = null;
        fileErrors.value.push("Sorry...\n 有効なファイル形式はpngまたはjpegです");

      }
    };

    return {
      category, categories,
      title,
      author,
      year,
      body, bodyErrors,
      url,
      area,
      addData,
      fileChange,file,
      fileErrors, toggle,
    };
  },
};
</script>

<style src="@vueform/toggle/themes/default.css">
.vs__dropdown-menu {
  z-index: 100;
}
</style>