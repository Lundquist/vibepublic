const defaultConfig = {
serverUrl: (process.env.NODE_ENV === 'production') ? 'https://redhirobooking.herokuapp.com' : 'http://localhost:1337',
    clientUrl: (process.env.NODE_ENV === 'production') ? 'https://elastic-kepler-79113b.netlify.com' : 'http://localhost:3000'
};

const config = Object.assign({}, defaultConfig);

export default config;
