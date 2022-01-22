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
        />
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
        <!-- validation -->
        <div class="error" v-if="!body">
          <ul>
            <li v-for="error in bodyErrors" :key="error">
              {{ error }}
            </li>
          </ul>
        </div>
      </div>

      <!-- url（参考URLなど） -->
      <div class="form-item">
        <p class="form-item__label">
          <a :href="url" v-if="url" target="_blank" class="form-item__label--link">
            <span class="material-icons link">link</span>
            リンク</a>
          <span v-else>リンク</span>
        </p>
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
          <label for="toggle">{{ toggleLabel }}</label>
          <Toggle
            v-model="toggle"
            id="toggle"
            on-label="はい"
            off-label="いいえ"
            class="form-item__toggle-switch"
            @change="toggleChange"
          />
        </div>
      </div>

      <!-- upload file -->
      <div class="form-item" v-if="toggle && document.downloadUrl">
          <input type="checkbox" name="" id="checkbox" v-model="checked" @change="changeCheckbox">
          <label for="checkbox"> 現在の画像を削除する</label>
      </div>
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
      <!-- 星評価 -->
      <!-- <div class="form-item">
        <p class="form-item__label">評価</p>
      </div> -->

      <!-- end of the form -->

      <div class="btn-container">
        <button class="btn--detail update" @click.prevent="handleUpdate">
            <span class="material-icons update">check_circle</span>
            <span class="btn__description">更新する</span>
        </button>
        <button class="btn--detail delete" @click.prevent="handleDelete">
            <span class="material-icons delete">delete</span>
            <span class="btn__description">削除する</span>
        </button>
      </div>

    </form>
    <BackPage :goBack="goBack" :uid="uid" :category="category"/>
  </div>

</template>

<script>
import { ref } from "@vue/reactivity";
import Toggle from "@vueform/toggle";
import { nextTick, watch } from "@vue/runtime-core";
import useStorage from "@/composables/useStorage";
import DataClass from "@/composables/makeData";
import { useRouter } from 'vue-router';
import BackPage from '@/components/BackPage.vue'
import getDocument from '../composables/getDocument';
import useDocument from '../composables/useDocument';

export default {
  components: { Toggle, BackPage },
  props: ["id", "uid", "category", "goBack"],

  setup(props) {

    const title = ref("");
    const author = ref("");
    const year = ref("");
    const body = ref("");
    const bodyErrors = ref([]);
    const url = ref("");
    const area = ref(null);
    const category = ref(props.category);
    const file = ref(null); //アップロードファイル
    const fileErrors = ref([]);
    const { url: downloadUrl, filePath, error: uploadError, uploadImg } = useStorage();
    const router = useRouter();
    const toggle = ref(false);
    const toggleLabel = ref("")
    const checked = ref(false);
    const hasImg = ref(null)

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
        hasImg.value = document.value.hasImg
        toggleLabel.value = hasImg.value ? "画像を登録し直す" : "画像を登録する"
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

      fileErrors.value =[]
      bodyErrors.value = []

      // file validation
      if (toggle.value && !file.value && !checked.value) {

          fileErrors.value.push('画像が選択されていません')

      } else if (toggle.value && file.value && checked.value) {

          fileErrors.value.push('画像を削除するか、新しい画像を選択してください')

      }

      // body validation
      if (category.value === "quick-note" && !body.value) {

        bodyErrors.value.push('メモは必須です')

      } else if (category.value === "quote" && !body.value) {

        bodyErrors.value.push('本文は必須です')
      }

      // データインスタンスの作成
      const data = new DataClass(document.value.createdAt, author.value, body.value, url.value)

      if (hasImg.value && !toggle.value) {

        // 元の画像データを登録
        data.addData({downloadUrl: document.value.downloadUrl, filePath: document.value.filePath})
        data.dataMap['hasImg'] = true

        } else if (file.value) {
        
        // storageに画像を格納
        await uploadImg(props.uid, category.value, file.value)

        // データインスタンスの更新
        data.dataMap['hasImg'] = true
        data.addData({downloadUrl: downloadUrl.value, filePath: filePath.value})

      } else if (checked) {

        // 現在の画像を削除する場合、urlを削除
        // todo: storageデータの削除
        data.addData({downloadUrl: "", filePath: ""})
        data.dataMap['hasImg'] = false
      }

      // category fieldを追加
      if (category.value === "art") {

        data.addData({title: title.value, year: year.value})

      } else if (category.value === "gourmet") {

          data.addData({title: title.value})

      }

      // データ更新
      if (!fileErrors.value.length && !bodyErrors.value.length) {

          await _updateDoc(data.dataMap)
      }

      if (!updateError.value && !fileErrors.value.length && !bodyErrors.value.length) {

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
      fileErrors.value = [];
      file.value = null

      if (selected && types.includes(selected.type)) {

        file.value = selected;
        fileErrors.value = [];

      } else if (!selected) {

          return

      } else {

        fileErrors.value.push("Sorry...\n 有効なファイル形式はpngまたはjpegです");
        file.value = null;

      }
    };

    const toggleChange = () => {

        fileErrors.value = []
        checked.value = false

    }

    const changeCheckbox = () => {

        fileErrors.value = []

        if (checked) {
            file.value = null
        }

    }

    return {
      category,
      title,
      author,
      year,
      body, bodyErrors,
      url,
      area, checked,
      toggleLabel,
      toggleChange, changeCheckbox,
      handleUpdate, handleDelete,
      fileChange,
      fileErrors, toggle,
      document
    };
  },
};
</script>

<style lang="scss" scoped>
@use '/src/assets/css/main';

html, div {
  overflow-y: auto;
}

.material-icons.link {
  margin-right: 4px;
  margin-bottom: 4px;
  transition: all 0.2s;
}

.form-item__label--link {

  &:hover .material-icons.link{
    color: main.$accent;
  }
}
</style>