import { View, Text, FlatList } from "react-native";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import Heading from "@/global/Heading";
import BusinessListItemSmall from "./BusinessListItemSmall";

const getBusinessList = gql`
  query getBusinessList {
    businessLists {
      id
      name
      email
      contactPerson
      category {
        name
      }
      about
      address
      images {
        url
      }
    }
  }
`;

export default function BusinessList() {
  const { loading, error, data } = useQuery(getBusinessList);

  if (loading) return <Text>Loading...</Text>;
  if (error) console.log(error);

  return (
    <View style={{ marginTop: 20 }}>
      <Heading text={"Latest Business"} isViewAll={true} />
      <FlatList
        data={data.businessLists}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 10 }}>
            <BusinessListItemSmall business={item} />
          </View>
        )}
      />
    </View>
  );
}
