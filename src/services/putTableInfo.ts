import axios from "axios";


export async function putTableInfo(ednPoint: String, objects: any) {
    const jsonData = JSON.stringify(objects)
    const id = objects.id;
    const apiUrl = `https://store-api-l9ki.onrender.com/api/${ednPoint}/${id}`

    axios.put(apiUrl, jsonData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(err => console.log(err));

}

