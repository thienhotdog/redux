import { Link } from "react-router-dom";
import "../../assets/website.css";
import {useNavigate} from "react-router-dom";
import {isAuthenticated} from "../../auth/index"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTotals } from "../../slice/cartSlide";


const Header = () =>{
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getTotals())
    },[cart])
    const navigate = useNavigate();
    const {user} = isAuthenticated();
    console.log(user);
    const signout = async () =>{
        localStorage.removeItem("token");
        navigate("/signin");
    }
    // console.log(user);
    return(
       <header className="header">
           <nav className="header_navbar">
                <ul className="navbar-list">
                    <Link to="">
                        <img src="https://snh.vn/wp-content/uploads/2016/01/logo-adidas.png" className="navbar-list-img" />
                    </Link>
                </ul>

                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link to="/shop" className="navbar-item-link">Shop</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="" className="_navbar-item-link">Tin Tức</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="" className="navbar-item-link">Bản Đồ</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="" className="navbar-item-link">Liên hệ</Link>
                    </li>
                </ul>

                {
                    (user) ? (
                        <div className="navbar-list">
                            <div className="navbar-item">
                                <Link to="cart">
                                    <i className="fas fa-shopping-cart"></i>
                                    <span className="badge bg-primary rounded-pill">{cart.cartQuantity}</span>    
                                </Link>
                            </div>
                           <div  className="navbar-item" style={{"position":"relative", "width":"190px"}}>
                                <ul className="user_action" >
                                    <a href="">{user.name}</a>
                                    <div className="user_form">
  
                                        <li style={{"marginRight": "7px"}}>
                                            <Link to="/admin">Trang cá nhân</Link>
                                        </li>

                                        <li style={{"marginRight": "7px"}}>
                                            <span onClick={signout} style={{color: "blue",cursor:"pointer"}}>Đăng xuất</span>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    ) :  
                        <ul className="navbar-list">
                            <li className="navbar-item">
                                <Link to="/signup" className="navbar-item-link">Đăng Ký</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/signin" className="navbar-item-link">Đăng nhập</Link>
                            </li>
                        </ul>
                }
              

           </nav>
       </header>
    )
}
export default Header;