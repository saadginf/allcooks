import { create } from "apisauce";

import { encode as btoa } from "base-64";

const username = "allCooks-client";
const password = "allCooks-secret";
let encodedAuth = "Basic " + btoa(`${username}:${password}`);

const apiClient = create({
  baseURL: "https://allcooks-oauth-server-yd4ny7uppa-ez.a.run.app",
});

apiClient.addAsyncRequestTransform(async (request) => {
  request.headers["Authorization"] = encodedAuth;
});
export default apiClient;
