import { FontAwesome6 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: "#111",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: insets.bottom + 15, // 👈 IMPORTANT
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const icons = {
          index: "house",
          collections: "layer-group",
          favorites: "heart",
          account: "user",
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
          >
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: isFocused ? "#019CDF20" : "transparent",
                  paddingVertical: 8,
                  paddingHorizontal: 25,
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <FontAwesome6 name={icons[route.name]} size={20} color="#fff" />
              </View>

              <Text
                style={{
                  color: isFocused ? "#019CDF" : "#aaa",
                  fontSize: 11,
                  marginTop: 5,
                }}
              >
                {route.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
