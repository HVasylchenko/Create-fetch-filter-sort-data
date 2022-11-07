export const getPageCout = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}