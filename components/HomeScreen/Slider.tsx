import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Heading from "@/global/Heading";

const getSlider = gql`
  query getSlider {
    sliders {
      id
      name
      image {
        url
      }
    }
  }
`;

export default function Slider() {
  const { loading, error, data } = useQuery(getSlider);

  if (loading) return <Text>Loading...</Text>;
  if (error) console.log(error);

  return (
    <View>
      <Heading text={"Offers For You"} />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data.sliders}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 20 }}>
            <Image
              source={{ uri: item?.image?.url }}
              style={styles.sliderImage}
            />
            {/* <Text>{item.name}</Text> */}
          </View>
        )}
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
  sliderImage: {
    width: 270,
    height: 150,
    borderRadius: 20,
    // objectFit: "contain",
  },
});
