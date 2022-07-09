import * as SecureStore from "expo-secure-store";

const StoreToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync("ALLCOOKS", authToken);
    console.log("token stored");
  } catch (error) {
    console.log("Error Storing the Token", error);
  }
};
const storeUser = async (user) => {
  try {
    await SecureStore.setItemAsync("ALLCOOKSUSER", JSON.stringify(user));
    console.log("user stored");
  } catch (error) {
    console.log("Error Storing the User", error);
  }
};
const getUser = async () => {
  try {
    const user = await SecureStore.getItemAsync("ALLCOOKSUSER");
    return JSON.parse(user);
  } catch (error) {
    console.log("Error getting the User", error);
  }
};
const getToken = async () => {
  try {
    return await SecureStore.getItemAsync("ALLCOOKS");
  } catch (error) {
    console.log("Error getting the Token", error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync("ALLCOOKS");
  } catch (error) {
    console.log("Error in deleting Token", error);
  }
};
const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync("ALLCOOKSUSER");
  } catch (error) {
    console.log("Error in deleting user", error);
  }
};
export default {
  removeToken,

  getToken,
  StoreToken,
  storeUser,
  getUser,
  removeUser,
};
