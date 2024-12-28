import axios from 'axios';

export function readTokenData() {

  const validateToken = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/protected", {
        withCredentials: true,
      });

      if (response.data != "No cookie") {
        sendUserData(response.data);
        console.log("NO COOKIE RETREAT1")
        navigate("/");
      }
      else {
        // setIsLoggedIn(false);
        console.log("bot bot");
        console.log("NO COOKIE RETREAT2")
      }
    } catch (error) {
      console.error("Error validating token:", error);
      console.log("NO COOKIE RETREAT3")
      // setIsLoggedIn(false);
    } finally {
      console.log("NO COOKIE RETREAT4")
      // setLoading(false);
    }
  };

  return validateToken();
}