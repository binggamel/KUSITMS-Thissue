import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:5000/",
    timeout: 5000,
    withCredentials: true,
})

export const getApi = async (url) => {
    try {
        // token 받아서 수정
        // const token = localStorage.getItem("");
        // const headers = token ? {Authorization: `Bearer ${token}`}: null;

        // token 받고 아래 headers 코드는 삭제
        const headers = null;
        const response = await api.get(url, {headers});
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const postApi = async (url, data) => {
    try {
        // token 받아서 수정
        // const token = localStorage.getItem("");
        // const headers = token ? {Authorization: `Bearer ${token}`}: null;

        // token 받고 아래 headers 코드는 삭제
        const headers = null;
        await api.post(url, data, {headers});
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const putApi = async (url, data) => {
    try {
        // token 받아서 수정
        // const token = localStorage.getItem("");
        // const headers = token ? {Authorization: `Bearer ${token}`}: null;

        // token 받고 아래 headers 코드는 삭제
        const headers = null;
        await api.put(url, data, {headers});
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const deleteApi = async (url, data) => {
    try {
        // token 받아서 수정
        // const token = localStorage.getItem("");
        // const headers = token ? {Authorization: `Bearer ${token}`}: null;

        // token 받고 아래 headers 코드는 삭제
        const headers = null;
        await api.delete(url, {headers});
    } catch (err) {
        console.log(err);
        throw err;
    }
}