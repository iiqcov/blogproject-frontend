import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const createArticle = async (title, content) => {
    const response = await api.post('/article', { title, content });
    return response.data;
};
