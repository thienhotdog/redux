import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signup } from "../../api/authApi";
import { ToastContainer, toast } from 'react-toastify'



const Signup = () => {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const [success, setSuccess] = useState(false);
  const onSubmit = async (user, e) => {
    try {                               
     const response = await signup(user);
     console.log(response);
      setSuccess(true);
      e.target.reset();
    } catch (error) {
     toast("đã tồn tại tài khoản")
    }
  };
  return (
    <div className="col-6 mx-auto container">
      <ToastContainer />
      <h2 className="mt-2">Đăng ký tài khoản</h2>
      <hr />
      {success && (
        <div className="alert alert-success">
          Bạn đã đăng ký thành công. Click <Link to="/signin">vào đây</Link> để
          login
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-floating">
        <input type="text" className="form-control" {...register("name", {required : true})} />
        <label>Name</label>
      </div>
        <br/>
      {errors.name && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
        <br/>
      <div className="form-floating">
        <input type="email" className="form-control" {...register("email", {required : true})} />
        <label>Email</label>
      </div>
      <br />
      {errors.email && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
      <br/>
      <div className="form-floating">
        <input type="password" className="form-control" {...register("password", {required : true})} />
        <label >Password</label>
      </div>
        <br/>
      {errors.password && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
      <div>
        <label>
          <input type="checkbox"  /> Remember 
        </label>
      </div>
    <button className="w-100 btn btn-lg btn-primary" type="submit">Đăng ký</button>
    <Link className="w-100 btn btn-lg btn-primary mt-3" to="/signin">Về Đăng Nhập</Link>
    <Link className="w-100 btn btn-lg btn-primary mt-3" to="/" >Về Trang chủ</Link>
  </form>
    </div>
  );
};

export default Signup;
