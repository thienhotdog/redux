import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOrder } from "../../../slice/order";
import { Link } from "react-router-dom";

const OrderDetail = () => {
    const { id } = useParams();
    console.log(id);
    const order = useSelector((state) => state.order.order[0]);
    // const [product] = order.products;
    console.log(order)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrder(id))
    }, [])
    return (
        <div className="table-responsive">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col"> #</th>
                        <th scope="col">Tên</th>
                        <th scope="col">ảnh</th>
                        <th scope="col">Giá</th>
                    </tr>
                </thead>
                {/* <tbody>
                        // { */}
                {(order) ? (
                    <tbody>
                        {order.products.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td><img src={item.img} className="shop-img" /></td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody></tbody>
                )}
                {/* // </tbody> */}
            </table>
        </div>
    )
}
export default OrderDetail;