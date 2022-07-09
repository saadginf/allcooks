import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CHOME from "../screens/CHome";
import CORDERS from "../screens/COrders";

const Stack = createStackNavigator();
const CHomeNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CHOME"
        component={CHOME}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CORDERS"
        component={CORDERS}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CHomeNavi;
