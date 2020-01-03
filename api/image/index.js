import { fetch_ } from "./fetch";
import { API_URL } from "../../config";

export const getImage = (path) => `${API_URL}/images${path}`;

export const newsImage = (image) => fetch_('/news/image', image);
