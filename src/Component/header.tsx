import logo from '../assets/pictures/logoBlack.png';
import { IoNewspaperSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';

interface NavBarProps {
    onSettingsClick: () => void;
}

function Header({ onSettingsClick }: NavBarProps) {
    return <section className="Header">
        <img src={logo} alt="Logo" />
        <h5>AMITRESTO</h5>

        <div className='headerNav'>
            <Link to="/Search" className='headerLink'><IoSearch /></Link>
            <NavLink to="/NewsLetter" className='headerLink'><IoNewspaperSharp /></NavLink>
            <button onClick={onSettingsClick} className='headerLink'><IoMdSettings /></button>
        </div>
        
    </section>
}

export default Header;