import { useState } from "react";
import SettingsSideBar from "./settingsSideBar";
import NavBar from "./NavBar";

function NavBarWithSettings(){
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return(
        <>
        <NavBar onSettingsClick={()=> setIsSettingsOpen(true)} />
        <SettingsSideBar isOpen={isSettingsOpen}
        onClose={()=> setIsSettingsOpen(false)} />
        </>
    );
}

export default NavBarWithSettings;