import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function ListItemDeleteAction({ onPress, onEdit }) {
  return (
    <View style={styles.deleteEditContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="trash-can"
            size={35}
            color={colors.white}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onEdit}>
        <View style={styles.containeredit}>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={35}
            color={colors.white}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    width: 35,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  containeredit: {
    backgroundColor: colors.orange,
    width: 35,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteEditContainer: {},
});

export default ListItemDeleteAction;
