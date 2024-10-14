import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import Heading from "@/global/Heading";
import { Colors } from "@/constants/Colors";

const getCategory = gql`
  query getCategory {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
`;

export default function Category() {
  const { loading, error, data } = useQuery(getCategory);

  if (loading) return <Text>Loading...</Text>;
  if (error) console.log(error);

  return (
    <View style={{ marginTop: 10 }}>
      <Heading text={"Categories"} isViewAll={true} />
      <FlatList
        data={data.categories}
        numColumns={4}
        renderItem={({ item, index }) =>
          index <= 3 && (
            <View style={styles.container}>
              <View style={styles.iconContainer}>
                <Image
                  source={{ uri: item?.icon?.url }}
                  style={{ width: 40, height: 40 }}
                />
              </View>
              <Text style={{ fontFamily: "Roboto-medium", marginTop: 5 }}>
                {item.name}
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: "Roboto-medium",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: Colors.backgroundColor,
    padding: 10,
    borderRadius: 99,
  },
});
