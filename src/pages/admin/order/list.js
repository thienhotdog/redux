import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../../slice/order";
import { Link } from "react-router-dom";

const ListOrder = () => {
    const order = useSelector((state) => state.order.order);
    console.log(order)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrder())
    }, [])
    return (
        <div className="table-responsive">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col"> #</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Tổng Giá</th>
                        <th scope="col">Ngày Đặt</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((item, index) => (
                        <tr scope="row" key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                            <td>{item.updatedAt}</td>
                            <td style={{ "textAlign": "center" }}>
                                {item.status}
                            </td>
                            <td>
                                <Link to={`/admin/order/${item._id}`}><i className="fas fa-info-circle"></i></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListOrder;