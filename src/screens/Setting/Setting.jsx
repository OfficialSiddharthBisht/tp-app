import React, { useState, useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Context from "../../contexts/context";
import { themes } from "../../utils/theme";

// reusable section component
const SettingsSection = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setIsExpanded((prev) => !prev)}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionArrow}>{isExpanded ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {isExpanded && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
};

const Settings = () => {
  const { theme, changeTheme } = useContext(Context);

  // Theme option rendering logic
  const renderThemeOption = ({ item }) => {
    const isSelected = theme === themes[item];

    return (
      <TouchableOpacity
        style={[
          styles.themeButton,
          {
            backgroundColor: isSelected ? theme?.buttonColor : "#ddd",
          },
          isSelected && styles.selectedThemeButton,
        ]}
        onPress={() => changeTheme(item)}
        disabled={isSelected}
      >
        <Text
          style={[
            styles.themeButtonText,
            {
              color: isSelected ? themes[item]?.textColor : "#666",
            },
          ]}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme?.backgroundColor,
        },
      ]}
    >
      <Text style={[styles.mainTitle, { color: theme?.textColor }]}>
        Settings
      </Text>

      {/* Theme Selection Section */}
      <SettingsSection title="Select Theme">
        <FlatList
          data={Object.keys(themes)}
          keyExtractor={(item) => item}
          renderItem={renderThemeOption}
          contentContainerStyle={styles.list}
        />
      </SettingsSection>

      {/* Placeholder for future sections */}
      {/* <SettingsSection title="Notifications">
        <Text style={{ color: theme?.textColor }}>Coming Soon!</Text>
      </SettingsSection>

      <SettingsSection title="Account">
        <Text style={{ color: theme?.textColor }}>Coming Soon!</Text>
      </SettingsSection> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    gap: 10,
  },
  themeButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aaa",
  },
  selectedThemeButton: {
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  themeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  // Section styling
  sectionContainer: {
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionArrow: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionContent: {
    padding: 10,
  },
});

export default Settings;
