import React from "react";
import { StyleSheet, Text, View } from "react-native";

import COrdersItem from "../components/COrderItem";
import Header from "../components/Header";

const COrders = ({ navigation }) => {
  return (
    <>
      <Header Title="Orders" OnBackPress={() => navigation.goBack()} />
      <COrdersItem />
    </>
  );
};

export default COrders;

const styles = StyleSheet.create({});
