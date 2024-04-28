import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className=" w-full h-full p-6 flex flex-col justify-center items-center gap-1">
            <div className=" max-w-sm w-full rounded-lg px-4 py-2 ring-slate-900/5 shadow-lg">
                <h1 className=" font-bold text-4xl flex justify-center mb-4">404</h1>
                <p className="text-slate-400 font-bold">Ooops...</p>
                <p className="text-slate-400">Page not found </p>
            </div>
            <button
                    className="bg-black text-white
                p-2 rounded-md"
                    onClick={() => navigate('/')}>
                    Back to Home
                </button>
        </div>
    );
};

export default NotFound;
