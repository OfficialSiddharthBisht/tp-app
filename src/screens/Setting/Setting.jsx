import { useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Context from "../../contexts/context";
import { themes } from "../../contexts/ContextProvider";

const Settings = () => {
  const { theme, changeTheme } = useContext(Context);
  const renderThemeOption = ({ item }) => {
    const isSelected = theme === themes[item];

    return (
      <TouchableOpacity
        style={[
          styles.themeButton,
          {
            backgroundColor: isSelected ? themes[item]?.buttonColor : "#ddd",
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
      <Text style={[styles.title, { color: theme?.textColor }]}>
        Select Theme
      </Text>
      <FlatList
        data={Object.keys(themes)}
        keyExtractor={(item) => item}
        renderItem={renderThemeOption}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
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
});

export default Settings;
