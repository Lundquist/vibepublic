const defaultConfig = {
    serverUrl: (process.env.NODE_ENV === 'production') ? 'https://redhirobooking.herokuapp.com' : 'https://redhirobooking.herokuapp.com',
    clientUrl: (process.env.NODE_ENV === 'production') ? 'https://elastic-kepler-79113b.netlify.com' : 'http://localhost:3000',
    STRIPE_SECRET_KEY: (process.env.NODE_ENV === 'production') ? 'sk_live_nXFjgudI456E0mKW0QCXk0pN00ovz98fgA' : 'sk_test_J7wtVsEKNTEh982dKMXwRidb00KWz4SVpZ',
    STRIPE_PUBLISHABLE_KEY: (process.env.NODE_ENV === 'production') ? 'pk_live_h6nieWiX1tdIcqr4GPB2A4Uk00mCsMqwFa' : 'pk_test_wguKhnBNi9r1x4gDqXkgITv200M57KPGJm',
    STRIPE_WEBHOOK_SECRET: (process.env.NODE_ENV === 'production') ? 'whsec_YMdrXrIin5kKEoMTVJHrofOmevpzBZRa' : 'whsec_X3fl4jlaIB2LqpdugnPvHZJQd8XM7gfG',

};

const config = Object.assign({}, defaultConfig);

export default config;
