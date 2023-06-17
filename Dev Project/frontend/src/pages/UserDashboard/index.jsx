import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    <h1>Dashboard</h1>
    const navigate = useNavigate(); const handleGoBack = () => { navigate(-1) }
    const handleGotoSignin = () => { navigate("/signin") }
    return (
        <>
            <div>
                <button onClick={handleGoBack}>Go back</button>
                <button onClick={handleGotoSignin}>Goto Signin page</button>
            </div>
        </>
    )
};
export default Dashboard;
