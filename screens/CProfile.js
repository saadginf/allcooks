import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import storage from "../auth/storage";
import AuthContext from "../auth/context";
const CProfile = () => {
  const authContext = useContext(AuthContext);
  const handleLogout = () => {
    authContext.setuser(null);
    storage.removeToken();
    storage.removeUser();
  };
  return (
    <View style={styles.conatainer}>
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
};

export default CProfile;

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
