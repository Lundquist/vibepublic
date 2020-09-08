const defaultConfig = {
    serverUrl:'https://redhirobooking.herokuapp.com',
    STRIPE_PUBLISHABLE_KEY: (process.env.NODE_ENV === 'production') ? 'pk_live_h6nieWiX1tdIcqr4GPB2A4Uk00mCsMqwFa' : 'pk_test_wguKhnBNi9r1x4gDqXkgITv200M57KPGJm',

};

const config = Object.assign({}, defaultConfig);

export default config;
