const getColor = (num) => {
    const colorList = [
        '#f9f7f0', '#faeba4', '#f6d4b2', '#dee6f5', '#cdd9db'
    ]
    const idx = num % colorList.length

    return colorList[idx]
}

const getCategoryName = (category) => {

    let titleValue
    if (category === "quick-note") {
        titleValue = "Quick Note"
    } else if (category === "art") {
        titleValue = "アート"
    } else if (category === "quote") {
        titleValue = "ことば"
    } else if (category === "gourmet") {
        titleValue = "グルメ・ファッション"
    } else {
        titleValue = category
    }
    return titleValue
}

export { getColor, getCategoryName }