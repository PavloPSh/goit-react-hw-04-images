import axios from "axios";

const instance = axios.create({
    baseURL: 'https://pixabay.com/api',
    params: {
        key: '29321301-761f61f0cfd0cb17161116047',
        per_page: 3,
        image_type: 'photo',
        orientation: 'horizontal',
    },

})

export const getImages = async ( page = 1, q) => {
    const { data } = await instance.get('/', {
        params: {
            page,
            q,
        }
    });
    return data;
}