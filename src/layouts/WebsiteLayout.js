import { Outlet } from "react-router-dom";
import FooterWebsite from "../compoments/website/footer";
import Header from "../compoments/website/header";




const WebsiteLayout = () =>{
    return(
        <div>
            <Header />
            <Outlet />
            <FooterWebsite />
        </div>
    )
}

export default WebsiteLayout;