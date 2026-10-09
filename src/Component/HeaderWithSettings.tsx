import Header from "./header";
import { useState } from "react";
import SettingsSideBar from "./settingsSideBar";

function HeaderWithSettings(){
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return(
        <>
        <Header onSettingsClick={()=> setIsSettingsOpen(true)} />
        <SettingsSideBar isOpen={isSettingsOpen}
        onClose={()=> setIsSettingsOpen(false)} />
        </>
    );
}

export default HeaderWithSettings;