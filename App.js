/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import HomePage from "./src/pages";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";

Amplify.configure(awsmobile);

const listLocations = `query listLocations {
  listLocations{
    items{
      id,
      lat,
      long
    }
  }
}`;

type Props = {};

const App = (props: Props) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    API.graphql(graphqlOperation(listLocations)).then(result => {
      console.log(result);
      setList(result.data.listLocations.items);
      alert(JSON.stringify(result));
    });
  }, []);

  return <HomePage list={list} setList={setList} />;
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
