import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.scss';
import logo from '../assets/fit-coder.png';
function Dashboard() {
    const navigation = useNavigate();
    const [userdata, setUserData] = useState({
        name: 'John Doe',
        email: 'hadjha@sdhkfh.com',
        bio: 'I am a software developer',
    });
    const Interests = ["Bubble", "Bubble", "Bubble", "Bubble"];

    const imageUrls = ["logo1", "logo2", "logo3", "logo4", "logo5", "logo6", "logo7"];
    const handleBubble = () => {
        navigation('/bubble');
    }
    return (
        <>
            <div className="left-flex">
                <img src={logo} alt="Profile" />
                <h2>{userdata.name}</h2>
                <p>{userdata.bio}</p>
            </div>

            <div className="right-flex">
                <h2>Sorting</h2>
            </div>
            <div className="interestList">
                {Interests.map((interest, index) => {
                    return <button onClick={handleBubble} className="interest" key={index}>{interest}</button>
                })}
            </div>
            <div className='image-grid'>
                <div className='image-item'>
                    {imageUrls.map((url, index) => {
                        return (
                            <>
                                <img src={logo} alt="placeholder" key={index} />
                                {/* <p key={index} className='image-item-overlay'>#{url}</p> */}
                            </>
                        )
                    })}
                </div>

            </div>
        </>
    );
}

export default Dashboard;