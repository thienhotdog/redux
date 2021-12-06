import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import AdminRoute from "./auth/adminRoute";
import AdminLayout from "./layouts/AdminLayout";
import WebsiteLayout from "./layouts/WebsiteLayout";
import Shop from "./pages/website/shop";
import ProductDetailPage from "./pages/website/product_detail";
import Signup from "./pages/website/signup";
import Signin from "./pages/website/signin"
import ListProduct from "./pages/admin/product/list";
import Addproduct from "./pages/admin/product/add";
import EditProduct from "./pages/admin/product/edit";
import ListCategory from "./pages/admin/category/list";
import EditCategory from "./pages/admin/category/edit";
import AddCategory from "./pages/admin/category/add";
import ShopCart from "./pages/website/cart";
import CheckOut from "./pages/website/checkout";
import ListOrder from "./pages/admin/order/list";
import OrderDetail from "./pages/admin/order/order_detail";

const Router = () =>{
    return(
        <BrowserRouter>
            <Routes>

                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                 {/* Layout Website*/}
                <Route path="/" element={<WebsiteLayout />}>
                    <Route index element={<Navigate to="shop" />} />
                    <Route path="shop" element={<Shop  />} />
                    <Route path="product/:id" element={<ProductDetailPage />} />
                    <Route path="cart" element={<ShopCart />}/>
                    <Route  path="checkout" element={<CheckOut />} />
                </Route>

                 {/* Layout Admin*/}
                <Route path="/admin/*" element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                } >
                    <Route index element={<Navigate to="product" />} />
                    <Route path="product" element={<ListProduct />} /> 
                    <Route path="addproduct" element={<Addproduct />} />     
                    <Route path="product/:id" element={<EditProduct />} /> 
                    <Route path="categories" element={<ListCategory />} />
                    <Route path="addcategory" element={<AddCategory />} />
                    <Route path="category/:slug" element={<EditCategory />} />
                    <Route path="listorder" element={<ListOrder />} />
                    <Route path="order/:id" element={<OrderDetail />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default Router;