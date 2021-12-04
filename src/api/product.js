import instance from "./instance"

export const getAll = () =>{
    const url = "/products";
    return instance.get(url)
}

export const add= (item) =>{
    const url = "/product";
    return  instance.post(url, item)
}

export const remove = (id) =>{
    const url = `/product/${id}`;
    return instance.delete(url)
};

export const edit = (item) => {
    const url = `/product/${item._id}`;
    return instance.patch(url, item);
  };
  
export const get = (_id) => {
    const url = `/product/${_id}`;
    return instance.get(url);
};
export const sortProduct = ({min,max}) =>{
    const url = `/product?min=${min}&max=${max}`;
    return instance.get(url)
}

export const filterProduct = (value) =>{
    const url = `/productss?name=${value}`;
    return instance.get(url);
}