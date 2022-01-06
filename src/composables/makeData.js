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
    }
}

export default DataClass