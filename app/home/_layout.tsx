import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Stack, useRouter } from "expo-router";
import { View, Text } from "react-native";
import Home from ".";
import Tasks from "./tasks";
import Notifications from "./notifications";
import Profile from "./profile";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primaryColor,
      }}
    >
      <Tab.Screen
        name="home"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
        component={Home} // Import Home screen
      />
      <Tab.Screen
        name="tasks"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Tasks
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="table" size={size} color={color} />
          ),
        }}
        component={Tasks} // Import Tasks screen
      />
      <Tab.Screen
        name="notifications"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Notifications
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="bells" size={size} color={color} />
          ),
        }}
        component={Notifications} // Import Notifications screen
      />
      <Tab.Screen
        name="profile"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
        component={Profile} // Import Profile screen
      />
    </Tab.Navigator>
  );
}
