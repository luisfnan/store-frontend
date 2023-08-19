import axios from "axios"


export const getTableInfo = (ednPoint: String) => {

    const apiUrl = `https://store-api-l9ki.onrender.com/api/${ednPoint}`
    return axios.get(apiUrl).then(res => res.data);
}


