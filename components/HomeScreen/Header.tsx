import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export default function Header() {
  const { user } = useUser();
  return (
    user && (
      <View style={styles.container}>
        {/* PROFILE SECTION */}
        <View style={styles.profileMainContainer}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
            <View>
              <Text style={{ color: "#fff", fontFamily: "Roboto" }}>
                Welcome,
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "Roboto-medium",
                }}
              >
                {user?.fullName}
              </Text>
            </View>
          </View>
          <FontAwesome name="bookmark-o" size={27} color="white" />
        </View>

        {/* SEARCH BAR SECTION */}
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Search"
            style={styles.textInput}
            placeholderTextColor="black"
          />
          <TouchableOpacity style={styles.searchButton}>
            <FontAwesome name="search" size={24} color={Colors.primaryColor} />
          </TouchableOpacity>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.primaryColor,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileMainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  searchBarContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  textInput: {
    padding: 7,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "85%",
    fontSize: 16,
    height: "85%",
  },
});
