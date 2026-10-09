import { Outlet } from "react-router-dom";
import NavBarWithSettings from "../Component/NavBarWithSettings";
import SearchOnly from "../Component/SearchOnly";

function NavBarOnlyLayout(){
    return(
        <>
        <SearchOnly />
        <div className="pageSwap">
            <Outlet />
        </div>
        <NavBarWithSettings />
        </>
    )
}

export default NavBarOnlyLayout;