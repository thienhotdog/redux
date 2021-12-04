import instance from "./instance";

export const getAllCategory = () =>{
    const url = "/categories";
    return instance.get(url);
}

export const getProductCate = (id) =>{
    const url = `/category/${id}/products`;
    return instance.get(url);
}

export const add = (item)  =>{
    const url = "/category";
    return instance.post(url,item)
}

export const edit = (item) =>{
    const url = `/category/${item.slug}`;
    return instance.patch(url,item)
}

export const remove = (slug) =>{
    const url = `/category/${slug}`;
    return instance.delete(url)
}


export const get = (slug) =>{
    const url = `/category/${slug}`;
    return instance.get(url)
}