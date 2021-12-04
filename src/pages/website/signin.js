import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { authenticate, isAuthenticated } from "../../auth";
import { Link, Navigate } from "react-router-dom";

import { signin } from "../../api/authApi";


const Signin = () => {
  const {user} = isAuthenticated();
  const { register, handleSubmit, formState:{errors} } = useForm();
  const [success, setSuccess] = useState(false);
  const onSubmit = async (user) => {
    try {
      const {data} = await signin(user)
      authenticate(data)
      setSuccess(true);
    } catch (error) {
      alert('sai tài khoản hoặc mật khẩu')
    }
  };
  const redirectUser = () => {
    if (success) {
      if (user && user.role === 1) {
        return <Navigate to="/admin" />;
      } else {
        return <Navigate to="/" />;
      }
    }
  };
  return (
    <div className="col-6 mx-auto mt-2">
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
