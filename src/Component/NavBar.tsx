import { IoHome } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { NavLink } from "react-router-dom";

interface NavBarProps {
    onSettingsClick: () => void;
}

function NavBar({ onSettingsClick }: NavBarProps){
    return (<section className="NavBar">
        <NavLink to="/" className="navlink"><IoHome /></NavLink>
        <NavLink to="/category" className="navlink"><BiSolidCategory /></NavLink>
        <NavLink to="/cart" className=" navlink cart"><FaCartArrowDown /></NavLink>
        <NavLink to="/NewsLetter" className="navlink"><IoNewspaperSharp /></NavLink>
        <button onClick={onSettingsClick} className="navlink"><IoMdSettings /></button>
    </section>);
}

export default NavBar;