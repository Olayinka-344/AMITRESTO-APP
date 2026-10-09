export const carouselQuery = `*[_type == "carousel"]`;

export const FoodQuery = `*[_type == "food" && lower(category) == lower($categoryId) && status == "available"][0..6]{
    _id,
    name,
    image,
    price,
    status
}`;

export const CategoryFlyerQuery = `*[_type == "categoryFlyer" && category == $categoryId][0]{
flyerImage}`;

export const allFoods = `*[_type == "food" && category == $categoryId && status == "available"]{
_id,
name,
image,
price,
status
}`;

export const NewsLetterQuery = `*[_type == "newsletter"][0]{
title,
content,
image
}`;

export const GlobalFoods = `*[_type == "food" && status == "available" && name match $keyword]{
_id,
name,
image,
price,
status
}`;


export const PercentageQuery = `*[_type == "percentageOff"]{
_id,
percentageName,
originalPrice,
percentagePrice,
percentage,
quantityLeft,
image,
}`;

export const PrivacyPolicyQuery = `*[_type == "privacyPolicy"]`;