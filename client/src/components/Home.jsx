import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg'; // Assuming you have a logo image

export function Home() {
    const navigate = useNavigate();
    
    function uploadClick() {
        navigate('/upload');
    }

    function captureClick() {
        navigate('/capture');
    }

    return (
        <div className="bg-gray-900 text-white">
            <nav className="bg-gray-800 p-4 flex items-center justify-between fixed right-0 left-0 top-0">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-10 w-10 rounded-md mr-3" />
                    <span className="text-2xl font-semibold">ReciPic</span>
                </div>
            </nav>
            <div className="flex justify-center items-center h-screen flex-col md:flex-row">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 mb-2 md:mr-2 md:mb-0" onClick={() => uploadClick()}>
                    Upload Image
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300" onClick={() => captureClick()}>
                    Capture Image
                </button>
            </div>
        </div>
    );
}
