import categories from "../pages/Common/categories";

export const getCategoryEmoji = (categoryEnglishName) => {
    for (let category of categories) {
        if (category.englishName === categoryEnglishName) return category.emoji;
    }
    return "";
}