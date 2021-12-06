import React from "react";
import { useForm } from "react-hook-form";
import { isAuthenticated } from "../../auth";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { signins } from "../../slice/auth";
import { useDispatch } from "react-redux";


const Signin = () => {
  const {user} = isAuthenticated();
  const { register, handleSubmit, formState:{errors} } = useForm();
  const dispatch = useDispatch()
  const onSubmit = async (user) => {
    const response =  await dispatch(signins(user));
      if(response.payload.msg ){
        toast(response.payload.msg)
      }
  };
  const redirectUser = () => {
    if (user && user.role === 1) {
      return <Navigate to="/admin" />;
    }
    if (user !== undefined) {
      return <Navigate to="/" />;
    } 
};
  return (
    <div className="col-6 mx-auto mt-2">
      <ToastContainer />
      {redirectUser()}
      <h2> Đăng nhập</h2>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-floating">
            <input type="email" className="form-control" {...register("email", {required : true})} />
            <label >Email</label>
          </div>
          <br/>
          {errors.email && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
          <div className="form-floating">
            <input type="password" className="form-control" {...register("password", {required : true})} />
            <label >Password</label>
          </div>
            <br/>
          {errors.password && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox"  /> Remember 
            </label>
          </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Đăng Nhập</button>
        <Link className="w-100 btn btn-lg btn-primary mt-3" to="/signup" >Về Đăng Ký</Link>
        <Link className="w-100 btn btn-lg btn-primary mt-3" to="/" >Về Trang Chủ</Link>
      </form>
    </div>
  );
};

export default Signin;
