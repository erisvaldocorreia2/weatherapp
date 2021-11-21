import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Button from "../Button/Button";
import { Colors } from "../../utils/constants";

type FormValues = {
  latitude: string;
  longitude: string;
};

const validationSchema = Yup.object().shape({
  latitude: Yup.number(),
  longitude: Yup.number(),
});

const WeatherCoordinates = () => {
  const navigation = useNavigation();

  const defaultValues: FormValues = {
    latitude: "",
    longitude: "",
  };

  const form = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: "onChange",
  });

  const handleSubmit = form.handleSubmit((values) => {
    navigation.navigate("Weather", values);
  });

  return (
    <View testID={"weather-cardinates"}>
      <View
        style={{
          marginBottom: 15,
        }}
      >
        <Controller
          control={form.control}
          render={({ field: { onChange }, ...props }) => (
            <TextInput
              {...props}
              testID="weather-coordinates-latitude"
              onChangeText={onChange}
              placeholder="Latitude"
              placeholderTextColor={Colors.GREY}
              style={{
                backgroundColor: "transparent",
                margin: 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Colors.GREY,
                paddingHorizontal: 15,
                paddingVertical: 8,
                color: Colors.WHITE,
              }}
            />
          )}
          name="latitude"
        />
        <Controller
          control={form.control}
          render={({ field: { onChange }, ...props }) => (
            <TextInput
              {...props}
              testID="weather-coordinates-longitude"
              onChangeText={onChange}
              placeholder="Longitude"
              placeholderTextColor={Colors.GREY}
              style={{
                backgroundColor: "transparent",
                margin: 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Colors.GREY,
                paddingHorizontal: 15,
                paddingVertical: 8,
                color: Colors.WHITE,
              }}
            />
          )}
          name="longitude"
        />
      </View>
      <Button onPress={handleSubmit} label="Find" />
    </View>
  );
};

export default WeatherCoordinates;

// ALTERNATIVE - CODE TESTED WITHOUT USING HOOK FORM!
//
//
/* import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../utils/constants";
import { Button } from "..";

const WeatherCardinates = () => {
  const navigation = useNavigation();
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);

  const handleSubmit = () => {
    navigation.navigate("Weather", {
      latitude: latitude,
      longitude: longitude,
    });
  };

  return (
    <View testID={"weather-cardinates"}>
      <View
        style={{
          marginBottom: 15,
        }}
      >
        <TextInput
          testID="weather-coordinates-latitude"
          onChangeText={(e) => setLatitude(parseInt(e))}
          placeholder="Latitude"
          placeholderTextColor={Colors.GREY}
          style={{
            backgroundColor: "transparent",
            margin: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.GREY,
            paddingHorizontal: 15,
            paddingVertical: 8,
            color: Colors.WHITE,
          }}
        />

        <TextInput
          testID="weather-coordinates-longitude"
          onChangeText={(e) => setLongitude(parseInt(e))}
          placeholder="Longitude"
          placeholderTextColor={Colors.GREY}
          style={{
            backgroundColor: "transparent",
            margin: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.GREY,
            paddingHorizontal: 15,
            paddingVertical: 8,
            color: Colors.WHITE,
          }}
        />
      </View>
      <Button onPress={handleSubmit} label="Find" />
    </View>
  );
};

export default WeatherCardinates;
 */
