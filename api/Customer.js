import client from "./AppClient";

const endpoint1 =
  "instanceMeals?longitude=3&latitude=51&minPrice&maxPrice&categories&distance&quantity";
const endpoint2 = "/categories";
const endpoint3 = "/users/";
const endpoint4 = "/instanceMeals";
const getInstantMeal = () => {
  return client.get(endpoint1);
};
const getCategories = () => {
  return client.get(endpoint2);
};
const getUser = (user) => {
  return client.get(endpoint3 + user);
};

const addMEal = (request, image) => {
  const data = new FormData();

  data.append("request", JSON.stringify(request));
  data.append("images", {
    name: "image",
    type: "image/jpeg",
    uri: image,
  });

  return client.post(endpoint4, data);
};
const getMealsBycooker = () => client.get(endpoint4 + "/bycooker");
const deleteMealByRef = (ref) => client.post(endpoint4 + "/disable/" + ref);

export default {
  getInstantMeal,
  getCategories,
  getUser,
  addMEal,
  getMealsBycooker,
  deleteMealByRef,
};
