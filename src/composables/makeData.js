class DataClass {
    constructor(createdAt, author, body, url) {
        this.dataMap = {
            createdAt: createdAt,
            author: author,
            body: body,
            url: url,
            hasImg: false
        }
    }

    addData(data) {
        this.dataMap =  {...this.dataMap, ...data}
        // データがない（undefined）場合、"" で置き換える
        for (const key in this.dataMap) {
            if (Object.hasOwnProperty.call(this.dataMap, key)) {
                if (!this.dataMap[key]) {
                    this.dataMap[key] = ""
                }
            }
        }
    }
}

export default DataClass