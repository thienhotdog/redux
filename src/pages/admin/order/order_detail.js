import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOrder } from "../../../slice/order";
import { Link } from "react-router-dom";

const OrderDetail = () => {
    const { id } = useParams();
    console.log(id);
    const order = useSelector((state) => state.order.order[0]);
    console.log(order)
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getOrder(id))
    },[])
    return (
        <div className="table-responsive">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col"> #</th>
                        <th scope="col">Tên</th>
                        <th scope="col">ảnh</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {order.products.map((item, index) => (
                        <tr scope="row" key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td><img src={item.img} className="shop-img" /></td>
                            <td>{item.amount} VNĐ</td>
                            <td style={{ "textAlign": "center" }}>
                                {item.status}
                            </td>
                            <td>
                                <Link to={`/admin/order/${item._id}`}><i className="fas fa-info-circle"></i></Link>
                            </td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    )
}
export default OrderDetail;