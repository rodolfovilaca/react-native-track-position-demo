/**
 * @format
 * @flow
 */

import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { onCreateLocation } from "../graphql/subscriptions";

type Props = {
  list: Array
};

const HomePage = (props: Props) => {
  const { list, setList } = props;
  useEffect(() => {
    const subscriber = API.graphql(graphqlOperation(onCreateLocation)).subscribe({
      next: data => {
        const newLocation = data.value.data.onCreateLocation;
        setList(prepProps => [...prepProps, newLocation])
      }
    });
    () => subscriber.unsubscribe();
  }, []);

  useEffect(() => {
    console.log("list", list);
  }, [list]);

  return (
    <View>
      {list.map(item => (
        <Text>{item.long + " " + item.lat}</Text>
      ))}
    </View>
  );
};

export default HomePage;
