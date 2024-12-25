import axios from 'axios';

export function readTokenData() {
  const readData = () => {
    axios.get("http://localhost:8080/user/protected", {withCredentials:true}) //? It needs the "withCredentials" flag to tell if cookies should be sent with request 
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    }).catch((error) => console.log("error token : " + error))
  }
    return readData();
}