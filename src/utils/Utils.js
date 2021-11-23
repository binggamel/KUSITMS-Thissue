import categories from "../pages/Common/categories";

export const getCategoryEmoji = (categoryId) => {
    for (let category of categories) {
        if (category.id === categoryId) return category.emoji;
    }
    return "";
}