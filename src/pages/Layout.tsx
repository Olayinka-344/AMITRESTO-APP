import { Outlet } from "react-router-dom";
import HeaderWithSettings from "../Component/HeaderWithSettings";
import NavBarWithSettings from "../Component/NavBarWithSettings";

function Layout(){
    return(
        <>
        <HeaderWithSettings />
        <div className="pageSwap">
            <Outlet />
        </div>
        <NavBarWithSettings />
        </>
    )
}

export default Layout;