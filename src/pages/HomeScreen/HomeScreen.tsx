import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

import { Colors } from "../../utils/constants";
import { WeatherCurrent } from "../../components";
import { WeatherCoordinates } from "../../components";

const HomeScreen = () => {
  const now = moment(new Date());
  return (
    <LinearGradient
      colors={[Colors.LIGHT_GREY, Colors.DARK_GREY]}
      style={styles.container}
      testID={"home-screen"}
    >
      <Text style={styles.date}>WeatherApp with TDD</Text>
      <View style={styles.title}>
        <Text style={styles.date}>{now.format("MMM DD, YYYY")}</Text>
        <Text style={styles.day}>{now.format("dddd")}</Text>
      </View>
      <WeatherCurrent />
      <Text testID={"home-screen-divider"} style={styles.divider}>
        OR
      </Text>
      <WeatherCoordinates />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    alignContent: "space-between",
    justifyContent: "space-evenly",
  },
  title: {
    justifyContent: "flex-end",
  },
  date: {
    color: Colors.GREY,
    fontSize: 13,
  },
  day: {
    color: Colors.WHITE,
    fontSize: 21,
  },
  divider: {
    color: Colors.WHITE,
    textAlign: "center",
  },
});

export default HomeScreen;
