import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import '../../assets/website.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts, getCateProduct, fillterProduct, sortProducts } from '../../slice/product';
import { getAll } from "../../slice/category";
import { ToastContainer, toast } from 'react-toastify';
import { addToCart } from '../../slice/cartSlide';
import { isAuthenticated } from '../../auth';



const { Sider, Content } = Layout;

const Shop = () => {
   
    const product = useSelector((state) => state.product.products);
    const dispatch = useDispatch();
    const { user } = isAuthenticated();
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    const category = useSelector((state) => state.category.category)
    useEffect(() => {
        dispatch(getAll())
    }, [])

    const onHandleSort = async (e) => {
        let { min, max } = e.target.dataset;
        const sortData = { min, max };
        dispatch(sortProducts(sortData))
    }

    const onHandleFildProduct = async (e) => {
        const id = e.target.dataset.id;
        dispatch(getCateProduct(id));
        console.log(dispatch(getCateProduct(id)))
    }


    const onHandleSearch = async (e) => {
        const value = e.target.value;
        if (product) {
            dispatch(fillterProduct(value))
        }
    }
    const navigate = useNavigate();
    const handleAddToCart = async (product) => {
        console.log(product);
        dispatch(addToCart(product));
        toast("thêm thành công",{
            onClose: () => navigate("/cart")
        });
    }
    const handleAddToCarts = () => {
        const notify = () => toast("bạn phải đăng nhập mới thêm được sản phẩm");
        notify();
    }

    return (
        <Layout style={{ "marginTop": "15px" }} >
            <ToastContainer />
            <Sider className="container" style={{ backgroundColor: 'white' }}>
                <div className="direction">
                    <Link to="/index">Trang chủ</Link>
                    <span> --- </span>
                    <a to="#">Shop</a>
                    <div className="shop">
                        <input placeholder="nhập tên sản phẩm" onBlur={e => onHandleSearch(e)} />
                        <p className="shop_title">loại sản phẩm</p>
                        <div>
                            <ul className="shop_option">
                                {category.map((item, index) => {
                                    return <div key={index}>
                                        <li className="option-item" onClick={e => onHandleFildProduct(e)} data-id={item._id}>{item.name}</li>
                                    </div>
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="border-b py-3">
                        <p className="shop_title">khoảng giá</p>
                        <ul className="shop_option">
                            <li className="flex justify-between mb-2">
                                <span className="option-item" onClick={e => onHandleSort(e)} data-min="0" data-max="3000000">0 - 3,000,000Đ</span>
                            </li>
                            <li className="flex justify-between mb-2">
                                <span className="option-item" onClick={e => onHandleSort(e)} data-min="3000000" data-max="4000000">3,000,000-4,000,000Đ</span>
                            </li>
                            <li className="flex justify-between mb-2">
                                <span className="option-item" onClick={e => onHandleSort(e)} data-min="4000000" data-max="5000000">4,000,000-5,000,000Đ</span>
                            </li>
                            <li className="flex justify-between mb-2">
                                <span className="option-item" onClick={e => onHandleSort(e)} data-min="5000000" data-max="8000000">5,000,000-8,000,000Đ</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Sider>
            <Content style={{ backgroundColor: 'white' }}>
                <Row className="shop container" gutter={[16, 24]}>
                    {product.map((item, index) => {
                        return <Col className="gutter-row shop-" key={index} span={6}>
                            <Card
                                hoverable
                                style={{ "width": "100%" }}

                            >
                                <Link to={`/product/${item._id}`}>
                                    <img src={item.img} />
                                </Link>
                                <p className="py-2">{item.name}</p>
                                <p><span>Giá : </span>{item.price} VNĐ</p>
                                {
                                    (user) ? (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleAddToCart(item)} >
                                            Add To Cart
                                        </button>
                                    ) :
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleAddToCarts()} >
                                            Add To Cart
                                        </button>
                                }
                            </Card>

                        </Col>

                    })}
                    {product.length === 0 && <p>không tìm thấy sản phẩm</p>}
                </Row>
            </Content>
        </Layout>
    )
}

export default Shop;