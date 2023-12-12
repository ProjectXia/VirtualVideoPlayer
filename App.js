import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "./store";
import { Provider } from "react-redux";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

import LibraryScreen from "./screens/LibraryScreen";
import SettingsScreen from "./screens/SettingsScreen";
import PlayScreen from "./screens/PlayScreen";
import PlaylistScreen from "./screens/PlaylistScreen";
import FavoritiesScreen from "./screens/FavoritiesScreen";
import AboutScreen from "./screens/AboutScreen";

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Library") {
            if (focused) {
              return <Entypo name={"video"} size={25} color={"#4D3C77"} />;
            } else {
              return (
                <Entypo name={"folder-video"} size={25} color={"#4D3C77"} />
              );
            }
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
            return <Ionicons name={iconName} size={25} color={"#4D3C77"} />;
            // } else if (route.name === "Play") {
            //   iconName = focused ? "play" : "play-outline";
            //   return <Ionicons name={iconName} size={25} color={"#4D3C77"} />;
          } else if (route.name === "Playlist") {
            iconName = focused ? "playlist-play" : "playlist-play";
            return <MaterialIcons name={iconName} size={25} color="#4D3C77" />;
          } else if (route.name === "Favorites") {
            iconName = focused ? "favorite" : "favorite-border";
            return <MaterialIcons name={iconName} size={25} color="#4D3C77" />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Playlist" component={PlaylistScreen} />
      {/* <Tab.Screen name="Play" component={PlayScreen} /> */}
      <Tab.Screen name="Favorites" component={FavoritiesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Play"
            component={PlayScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
