import instance from "./instance";

export const add = (item)  =>{
    const url = "/order";
    return instance.post(url,item)
}

export const getAll = () =>{
    const url = "/orders";
    return instance.get(url)
}

export const get = (_id) =>{
    const url = `/order/${_id}`;
    return instance.get(url)
}