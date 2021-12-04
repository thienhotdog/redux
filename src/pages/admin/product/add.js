import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable  } from '@firebase/storage';
import "../../../firebase/firebase";
import { addFetchProduct, fetchProducts } from "../../../slice/product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAll } from "../../../slice/category";



const Addproduct = () =>{
    const product = useSelector((state) => state.product.products);
    const category = useSelector((state) => state.category.category);
    useEffect(() =>{
        dispatch(getAll())
    },[])
    const dispatch = useDispatch();
    console.log(product)
    useEffect(() =>{
        dispatch(fetchProducts());
    },[dispatch])
    console.log(product);
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) =>{
        // console.log(data);
        const storage = getStorage();
        const img = data.img;
        const file = img[0];
        console.log(file);
        const storageRef = ref(storage, `images/${file.name}`);
        const UploadTask = uploadBytesResumable(storageRef, file);
        uploadBytes(storageRef, file).then(() => {
            getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) =>{
                console.log(downloadURL);
               const newProducts = {
                  name: data.name,
                  price: data.price,
                  img: downloadURL,
                  cateId : data.cateId
               }
               var check = 0;
               product.forEach(element => {
                 if(newProducts.name == element.name ){
                   check += 1
                 }
               });
                 if(check == 0){
                   dispatch(addFetchProduct(newProducts));
                   alert("thêm sản phẩm thành công");
                   navigate("/admin")
                 }else{
                   alert("tên sản phẩm đã tồn tại")
                 }
            //    console.log(newProducts);
                // dispatch(addFetchProduct(newProducts));
                // navigate("/admin");
            })
        })

    }
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Tên Sản Phẩm</label>
                    <input type="text" className="form-control" {...register("name", { required: true })} placeholder="Nhập tên sản phẩm" />
                </div>
                {errors.name && <span>bắt buộc phải nhập trường hợp này</span>}
               <div className="mb-3">
                    <label className="form-label">Giá</label>
                    <input type="number" className="form-control" {...register("price", {required: true})} placeholder="Nhập giá tiền" />
                </div>
                {errors.price && <span>bắt buộc phải nhập trường hợp này</span>}
                <div className="mb-3">
                    <label className="form-label">Ảnh</label>
                    <br/>
                    <input type="file" {...register("img", { required: true })} placeholder="ảnh" />
                </div>
                {errors.img && <span>bắt buộc phải nhập trường hợp này</span>}
                <div className="mb-3">
                    <label className="form-label">CateId</label>
                        <select className="form-control" {...register("cateId")}>
                            {category.map((item,index) =>(
                                <option value={item._id} key={index}>{item.name}</option>
                            ))}
                        </select>
                {errors.name && <span className="d-block mt-2 text-danger">
                    Bắt buộc phải ấy link nhập trường này</span>}
          
                </div>
                <button className="btn btn-primary">Thêm</button>
            </form>
        </div>
    )
}
export default Addproduct;