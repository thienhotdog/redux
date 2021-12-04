import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, removeFetchProduct } from "../../../slice/product";
import { Link } from "react-router-dom";

const ListProduct = () =>{
    const products = useSelector((state) =>  state.product.products);
    const dispatch = useDispatch();
    console.log(products)
    useEffect(() =>{
        dispatch(fetchProducts());
    },[dispatch]) 
    return(
        <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2 className="h2">Quản lý sản phẩm</h2>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to="/admin/addproduct" className="btn btn-sm btn-outline-primary">
            Thêm sản phẩm
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col"> #</th>
              <th scope="col">Tên</th>
              <th scope="col">ảnh</th>
              <th scope="col">Giá</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr scope="row" key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td><img src={item.img} className="shop-img" /></td>
                <td>{item.price}</td>
                <td style={{"textAlign":"center"}}>
                    <button onClick={() => dispatch(removeFetchProduct(item._id))} className="btn btn-danger">delete </button>
                    <Link to={`/admin/product/${item._id}`} className="btn btn-primary">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}

export default ListProduct;