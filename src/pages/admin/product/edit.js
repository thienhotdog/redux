import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { editProduct } from "../../../slice/product";
import { get } from "../../../api/product";
import { getAll } from "../../../slice/category";
import { fetchProducts } from "../../../slice/product";
import { ToastContainer, toast } from 'react-toastify';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import "../../../firebase/firebase";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);
  useEffect(() => {
    dispatch(getAll())
  }, [])
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  const [product, setProduct] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await get(id);
        console.log("day la data", data);
        setProduct(data[0]);
        reset(data[0]);
      } catch (error) {
        console.log(error)
      }
    };
    getProduct();
  }, [])
  const navigate = useNavigate();
  const onSubmit = (data) => {
    if (typeof data.img === "object") {
      const storage = getStorage();
      const img = data.img;
      const file = img[0];
      console.log(file);
      const storageRef = ref(storage, `images/${file.name}`);
      const UploadTask = uploadBytesResumable(storageRef, file);
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(UploadTask.snapshot.ref).then((url) => {
          data.img = url;
          dispatch(editProduct(data));
          toast("edit thêm thành công",{
            onClose: () =>navigate("/admin")
        });
        })
      })
    } else {
      dispatch(editProduct(data));
      toast("edit thêm thành công",{
        onClose: () =>navigate("/admin")
    });
    }
  }
  return (
    <div>
      <ToastContainer />
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2 className="h2">cập nhật sản phẩm</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input type="text" className="form-control" {...register("name", { required: true })} placeholder={product.name} />
          {errors.name && <span>bắt buộc phải nhập trường hợp này</span>}
          <br />
        </div>

        <div className="mb-3">
          <label className="form-label">Giá sản phẩm</label>
          <input type="number" className="form-control" {...register("price", { required: true })} placeholder={product.price} />
          {errors.price && <span>bắt buộc phải nhập trường hợp này</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Ảnh</label>

          <input type="file" className="form-control" {...register("img")} />
          <br />
          <img src={product.img} style={{ width: 120 }} />
          {errors.img && <span>bắt buộc phải nhập trường hợp này</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">CateId</label>
          <select className="form-control" {...register("cateId")}>
            {category.map((item, index) => (
              <option value={item._id} key={index}>{item.name}</option>
            ))}
          </select>
          {errors.name && <span className="d-block mt-2 text-danger">
            Bắt buộc phải ấy link nhập trường này</span>}
        </div>
        <button type="submit" className="btn btn-primary">
          Cập nhật
        </button>
      </form>
    </div>
  )
}


export default EditProduct;