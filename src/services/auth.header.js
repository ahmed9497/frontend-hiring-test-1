// import aes256 from "aes256";
const KEY = process.env.REACT_APP_HASH_KEY;

// let cipher = aes256.createCipher(KEY);


export default function authHeader() {

  // const serializedState = localStorage.getItem('token');
  // if (!serializedState) return undefined;
  // let decrypted = cipher.decrypt(serializedState);

  // let data = JSON.parse(decodeURIComponent(escape(atob(decrypted))));

  const auth = JSON.parse(localStorage.getItem('token'));
// console.log(auth)
  const token = auth?.access_token;

  // const timeStamp = new Date().getTime();
 

  // let logTokken = timeStamp + "?" + userId;

  let headers = {
    // 'log-token': logTokken,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',

  };

  if (auth && token) {
    return { ...headers, 'Authorization': `Bearer ${token}` };
  } else {
    return headers;
  }

}