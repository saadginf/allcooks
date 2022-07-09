import client1 from "./AuthClient";
import client2 from "./AppClient";
const endpoint1 = "/oauth/token";
const endpoint2 = "/users/exist";
const endpoint3 = "/users";
const login = (data) => {
  return client1.post(endpoint1, data);
};
const getRegisterToken = () => {
  let formdata = new FormData();
  formdata.append("grant_type", "client_credentials");
  return client1.post(endpoint1, formdata);
};
const userExist = (username, email, token) => {
  client2.setHeader("Authorization", "Bearer " + token);
  return client2.get(endpoint2 + "?username=" + username + "&email=" + email);
};
const registerUser = (user, image, token) => {
  const data = new FormData();

  data.append("request", JSON.stringify(user));
  data.append("profileImg", {
    name: "image",
    type: "image/jpeg",
    uri: image,
  });
  client2.setHeader("Authorization", "Bearer " + token);
  return client2.post(endpoint3, data);
};

export default {
  login,
  getRegisterToken,
  userExist,
  registerUser,
};
