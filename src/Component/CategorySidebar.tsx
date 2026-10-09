import { NavLink } from "react-router-dom";

function CategorySideBar(){
    return (
        <aside className="Category-SideBar">
            <NavLink to="/category/main-course" className="SideBar-Link">Main-Course</NavLink>
            <NavLink to="/category/appetizer" className="SideBar-Link">Appetizers</NavLink>
            <NavLink to="/category/Side" className="SideBar-Link">Sides</NavLink>
            <NavLink to="/category/salad" className="SideBar-Link">Salads</NavLink>
            <NavLink to="/category/fast-food" className="SideBar-Link">Fast-Food</NavLink>
            <NavLink to="/category/dessert" className="SideBar-Link">Dessert</NavLink>
            <NavLink to="/category/soft-drink" className="SideBar-Link">Soft-Drink</NavLink>
            <NavLink to="/category/coffee" className="SideBar-Link">Coffee</NavLink>
            <NavLink to="/category/smoothie" className="SideBar-Link">Smoothie</NavLink>
            <NavLink to="/category/cocktail" className="SideBar-Link">Cocktail</NavLink>
            <NavLink to="/category/chef-special" className="SideBar-Link">Chef-Special</NavLink>
        </aside>
    )
}

export default CategorySideBar;