import { Outlet } from "react-router-dom";
import CategorySideBar from "../Component/CategorySidebar";

function Category(){
    return <section className="Category">
        <CategorySideBar />
        <div className="Category-Content">
            <Outlet />
        </div>
    </section>
}

export default Category;