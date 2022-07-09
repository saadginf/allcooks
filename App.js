import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { isRtl, t } from "./locales";
import LocalContext from "./locales/context";
import AuthContext from "./auth/context";
import storage from "./auth/storage";
import AppCustomerNavigator from "./navigation/AppCustomerNavigator";
import AppCookerNavigator from "./navigation/AppCookerNavi";

import AuthNavigator from "./navigation/AuthNavigation";
import navigationTheme from "./navigation/navigationTheme";
import jwt_decode from "jwt-decode";

export default function App() {
  const [user, setuser] = useState();
  const [isReady, setisReady] = useState(false);
  const restoreUser = async () => {
    const token = await storage.getToken();
    const decode = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
      storage.removeToken();
      storage.removeUser();
      setuser(null);
      return;
    }

    const userStored = await storage.getUser();
    if (!userStored) return;

    setuser(userStored);
  };
  console.log(user);
  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setisReady(true)}
        onError={(e) => console.log(e)}
      />
    );
  return (
    <AuthContext.Provider value={{ user, setuser }}>
      <LocalContext.Provider value={{ isRtl, t }}>
        <NavigationContainer theme={navigationTheme}>
          {user ? (
            user.authorities[0] == "ALLCOOKS_COOKER" ? (
              <AppCookerNavigator />
            ) : (
              <AppCustomerNavigator />
            )
          ) : (
            <AuthNavigator />
          )}
        </NavigationContainer>
      </LocalContext.Provider>
    </AuthContext.Provider>
  );
}
