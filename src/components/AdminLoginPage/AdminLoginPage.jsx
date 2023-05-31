import AdminNav from '../AdminNav/AdminNav';
import LoginForm from '../LoginForm/LoginForm';

const AdminLoginPage = () => {
    return (
        <div>
            <AdminNav />
            <div className="adminWrapper">
                <LoginForm></LoginForm>
            </div>
        </div>
    );
};

export default AdminLoginPage;
