import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CAdd from "../screens/CAdd";
import Edit from "../screens/CEdit";

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddForm"
        component={CAdd}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
