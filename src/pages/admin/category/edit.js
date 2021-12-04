import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import {useDispatch,useSelector} from "react-redux";
import {useState,useEffect} from "react";
import { editCategory,getAll } from "../../../slice/category";
import { get } from "../../../api/category";

const EditCategory = () =>{
    const {slug} = useParams();
    const categories = useSelector((state) => state.category.category);
    console.log(categories);
    useEffect(() =>{
        dispatch(getAll())
    },[])
    console.log(slug);
    const dispatch = useDispatch();
    const [category,setCategory] = useState([]);
    const {
        register,
        handleSubmit,
        reset,
        formState : {errors}
    } = useForm();
    useEffect(() =>{
        const getCategory = async () =>{
            try{
                const {data} = await get(slug);
                setCategory(data[0]);
                reset(data[0]);
            }catch(error){
                console.log(error)
            }
        };
        getCategory()
    },[])

    const navigate = useNavigate();
    const onSubmit = (data) => {
        const newProducts = {
            ...data
         }
         var check = 0;
        categories.forEach(element => {
            if(data.name == element.name ){
                check += 1
            }
        });
        if(check == 0){
            dispatch(editCategory(newProducts));
            navigate("/admin/Categories")
        }else{
            alert("tên danh mục đã tồn tại")
        }

    }
    return(
        <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2 className="h2">cập nhật sản phẩm</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Tên danh mục</label>
          <input type="text" className="form-control" {...register("name", { required: true })} placeholder={category.name} />
        </div>
        {errors.name && <span>bắt buộc phải nhập trường hợp này</span>}
        <button type="submit" className="btn btn-primary">
          Cập nhật
        </button>
      </form>
    </div>
    )
}

export default EditCategory;