import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function BusinessListItemSmall({ business }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: business?.images?.url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={{ fontSize: 17, fontFamily: "Roboto-medium" }}>
          {business.name}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: "Roboto",
            color: Colors.secondaryColor,
          }}
        >
          {business.contactPerson}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "Roboto",
            padding: 3,
            color: Colors.primaryColor,
            backgroundColor: Colors.backgroundColor,
            borderRadius: 3,
            alignSelf: "flex-start",
            paddingHorizontal: 7,
          }}
        >
          {business.category.name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  infoContainer: {
    padding: 7,
    display: "flex",
    gap: 3,
  },
  image: { width: 160, height: 100, borderRadius: 10 },
});
