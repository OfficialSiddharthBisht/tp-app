import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const AppHeader = ({ title, onPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 20,
  },
});
