import axios from "axios";


export async function putTableInfo(ednPoint: String, objects: any) {

    const categories = {
        name: objects.name,
        description: objects.description
    }

    const supplier = {
        company_name: objects.company_name,
        phoneNumber: objects.phoneNumber,
        address: objects.address,
        contact_name: objects.contact_name
    }

    const products = {
        name: objects.name,
        price: objects.price,
        stock: objects.stock,
    }

    let result: string

    if (ednPoint === "categories") {
        result = JSON.stringify(categories)
    } else if (ednPoint === "products") {
        result = JSON.stringify(products)
        console.log(result)
    } else if (ednPoint === "suppliers") {
        result = JSON.stringify(supplier)
    } else {
        result = JSON.stringify(objects)
    }



    const id = objects.id;
    const apiUrl = `https://store-api-l9ki.onrender.com/api/${ednPoint}/${id}`




    axios.put(apiUrl, result, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(err => console.log(err));

}

