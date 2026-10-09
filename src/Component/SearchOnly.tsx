import { IoNewspaperSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";

function SearchOnly(){
    const navigate = useNavigate();
    return <section className="Header searchOnly">
        <input type="text" placeholder='Search' readOnly onClick={() => navigate("/search")}/>

        <div>
            <NavLink to="/NewsLetter"><IoNewspaperSharp /></NavLink>
            <NavLink to="/settings"><IoMdSettings /></NavLink>
        </div>

    </section>
}

export default SearchOnly;