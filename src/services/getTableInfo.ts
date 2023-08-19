import axios from "axios"


export const getTableInfo = (ednPoint: String, id?: String) => {

    const apiUrl = id ? `https://store-api-l9ki.onrender.com/api/${ednPoint}/${ednPoint}` : `https://store-api-l9ki.onrender.com/api/${ednPoint}`

    return axios.get(apiUrl).then(res => res.data);
}


