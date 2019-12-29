import { fetch_ } from "./fetch";

export const newsImage = (image) => fetch_('/news/image', image, 'news');
