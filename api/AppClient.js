import { create } from "apisauce";
import authStorage from "../auth/storage";
const apiClient = create({
  baseURL: "https://allcooks-backend-yd4ny7uppa-ez.a.run.app",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;

  request.headers["Authorization"] = "Bearer " + authToken;
});
export default apiClient;
