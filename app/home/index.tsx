import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import Header from "@/components/HomeScreen/Header";
import Slider from "@/components/HomeScreen/Slider";
import Category from "@/components/HomeScreen/Category";
import BusinessList from "@/components/HomeScreen/BusinessList";

export default function Home() {
  return (
    <View>
      <Header />
      <View style={{ padding: 20 }}>
        <Slider />
        <Category />
        <BusinessList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
