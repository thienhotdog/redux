import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAll } from "../../../slice/category";
import { useEffect } from "react";



const AddCategory = () =>{
   const categories = useSelector((state) => state.category.category);
   console.log(categories);
   useEffect(() =>{
       dispatch(getAll())
   },[])
    const dispatch = useDispatch();
   
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) =>{
       var check = 0;
        categories.forEach(element => {
            if(data.name == element.name ){
                check += 1
            }
        });
        if(check == 0){
            dispatch(addCategory(data));
            navigate("/admin/Categories")
        }else{
            alert("tên danh mục đã tồn tại")
        }

    }
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-3">
                    <label className="form-label">Tên Danh Mục</label>
                    <input type="text" className="form-control" {...register("name", { required: true })} />
                    {errors.name && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
                    <br />
                </div>
                <button className="btn btn-primary" >Thêm</button>
            </form>
        </div>
    )
}
export default AddCategory;