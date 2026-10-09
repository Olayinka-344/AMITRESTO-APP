import { useEffect } from 'react';
import logo from '../assets/pictures/logoBlack.png';

interface IntroProps {onFinish: () => void;}

function Intro({ onFinish }: IntroProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 2500);
        return () => clearTimeout(timer);
    }, [onFinish])

    return <div className="intro-page">
        <img src={logo} alt="" />
        <h1>AMITRESTO</h1>
    </div>
}

export default Intro;