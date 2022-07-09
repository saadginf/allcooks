import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Principale";
import Role from "../screens/Role";
import Login from "../screens/Login";
import Registration from "../screens/Register";

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="role"
        component={Role}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="registration"
        component={Registration}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
