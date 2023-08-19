import axios from "axios";


export async function putTableInfo(ednPoint: String, objects: any) {
    const id = objects.id;
    const user = objects.username;

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
        price: parseInt(objects.price),
        stock: parseInt(objects.stock),
    }

    let result: string

    if (ednPoint === "products") {
        result = JSON.stringify(products)
    } else if (ednPoint === "categories") {
        result = JSON.stringify(categories)
        console.log(result)
    } else if (ednPoint === "suppliers") {
        result = JSON.stringify(supplier)
    } else {
        result = JSON.stringify(objects)
    }




    const apiUrl = `https://store-api-l9ki.onrender.com/api/${ednPoint}/${ednPoint !== 'profile' ? id : user}`




    axios.put(apiUrl, result, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(err => console.log(err));

}

