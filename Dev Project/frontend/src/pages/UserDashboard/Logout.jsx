const Logout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/signin'; // Redirect to signin page
};
export default Logout;