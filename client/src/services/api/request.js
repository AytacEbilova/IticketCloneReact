import axios from "axios";
import { BASE_URL } from "./constant.js";
async function getAll(endpoint) {
    try {
        const response = await axios.get(BASE_URL + endpoint );
        return response.data;
    } catch (error) {
        return error;
    }
}

async function getOne(endpoint, id) {
    try {
        const response = await axios.get(BASE_URL + endpoint + `/${id}` );
        return response.data;
    } catch (error) {
        return error;
    }
}

async function deleteOne(endpoint, id) {
    try {
        const response = await axios.delete(BASE_URL + endpoint + `/${id}`
           
        );
        return response;
    } catch (error) {
        return error;
    }
}

async function put(endpoint, id, payload) {
    try {
        const response = await axios.put(BASE_URL + endpoint + `/${id}`, payload);
        return response;
    } catch (error) {
        return error;
    }
}

async function patch(endpoint, id, payload) {
    try {
        const response = await axios.patch(BASE_URL + endpoint + `/${id}`, payload);
        return response;
    } catch (error) {
        return error;
    }
}

async function post(endpoint, payload) {
    try {
        const response = await axios.post(BASE_URL + endpoint, payload);
        console.log(BASE_URL+endpoint);
        console.log(payload);
        return response.data;
    } catch (error) {
        return error;
    }
}
//bu post nese elave elemek uchun deil?loginde elave elemirsen ki
//noldu register de postnan ishlir login de?
//qatishmdiriram ee sualim var
//senin backend dediyin bu sehifedi ancaq?yox bu frontdu back serverdi

const controller = {
    getAll: getAll,
    getOne: getOne,
    delete: deleteOne,
    post: post,
    put: put,
    patch: patch
}

export default controller;