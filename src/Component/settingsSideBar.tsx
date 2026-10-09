import { Link } from "react-router-dom";
import useTheme from "../Hooks/useTheme";
import { RiCloseCircleFill } from "react-icons/ri";

interface settingsSideBarProps {
    isOpen: boolean;
    onClose: ()=> void;
}

function SettingsSideBar({ isOpen, onClose }: settingsSideBarProps) {
    const { theme, toggleTheme } = useTheme();
    if (!isOpen) return null;

    return (
        <>
        <div className="settings-overlay" onClick={onClose} />
        <div className="settinngs-sidebar">
            <button className="settings-close" onClick={onClose}>
                <RiCloseCircleFill />
            </button>

            <h2>Settings</h2>

            <div className="settings-row">
                <div className="theme-div">
                    <span>Dark Mode</span>
                    <button onClick={toggleTheme}>
                        {theme === 'dark' ? 'on' : 'off'}
                    </button>
                </div>
                
                <nav className="settings-links">
                    <Link to="/newsletter" onClick={onClose}>Newsletter</Link>
                    <Link to="/privacy" onClick={onClose}>Privacy Policy</Link>
                </nav>
            </div>
        </div>
        </>
    );
}

export default SettingsSideBar;