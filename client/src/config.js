const prod = {
    env: 'production',
    api_host: '',
    use_frontend_test_user: false,
};
const dev = {
    env: 'development',
    api_host: 'http://localhost:5000', 
    use_frontend_test_user: true, // false for production, true for testing
    user: "test"
};


export default process.env.NODE_ENV === 'production' ? prod : dev;