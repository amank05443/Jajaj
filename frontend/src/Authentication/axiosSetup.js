//Purpose :-For customizing the axios setup so as to include headers for credentials,
//  required for api calls.
// added by:- Abhishek Singh,LAM

import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default axios;