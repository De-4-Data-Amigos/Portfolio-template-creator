const URL = "http://localhost:7070/api/v1/";
function handleHttpErrors(res) {
 if (!res.ok) {
   return Promise.reject({ status: res.status, fullError: res.json() })
 }
 return res.json();
}

function apiFacade() {

  
 const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
  const getToken = () => {
    return localStorage.getItem('jwtToken')
  }
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  }
    const logout = () => {
    localStorage.removeItem("jwtToken");
  }

const login = (user, password) => {
  const options = makeOptions("POST", true,{username: user, password: password });
  return fetch(URL + "auth/login", options)
      .then(handleHttpErrors)
      .then(res => {setToken(res.token) })
}
const signup = (username, password, role) => {
  const options = makeOptions("POST", true, { username, password, role });
  return fetch(URL + "auth/register", options).then(handleHttpErrors);
}
const sendContactMessage = (formData) => {
  const options = makeOptions("POST", false, formData);
  return fetch(URL + "contact/save", options)
    .then(handleHttpErrors)
    .catch(err => {
      console.error("Error sending contact message:", err);
      throw err;
    });
}
  const fetchData = () => {
    const options = makeOptions("GET", true);
    return fetch(URL+"ptc/", options)
      .then(handleHttpErrors)
  }
  const makeOptions = (method,addToken,body) =>{
   var opts = {
     method: method,
     headers: {
       "Content-type": "application/json",
       'Accept': 'application/json',
     }
   }
   if (addToken && loggedIn()) {
     opts.headers["Authorization"] = `Baerer ${getToken()}`;
   }
   if (body) {
     opts.body = JSON.stringify(body);
   }
   return opts;
 }
 return {
     makeOptions,
     setToken,
     getToken,
     loggedIn,
     login,
     logout,
     signup,
     fetchData,
     sendContactMessage 

 }
}

const facade = apiFacade();
export default facade;