* This app is a booking portal for a SaaS product that clients can link to from their website, completed reservations will show up in their private dashboard.
* Many of the redux actions/reducers are usen incorrectly, I know this.
* When you want to test it, add "/?companyId=1" after localhost:xxxx
* The app is in spanish, but if you want to change language you can do it by editing fallbackLng in "src\i18n.js" to one of {es, en, sv}, however not all parts have translations so there might be some missing key/value pairs, or some strings might be in pure text and not i18n compatible.
