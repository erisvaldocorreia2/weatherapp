import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LocationService from "../../services/LocationService";
import Button from "../Button/Button";
import { Colors } from "../../utils/constants";

const WeatherCurrent = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleFetchLocation = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const position = await LocationService.getCurrentPosition();
      navigation.navigate("Weather", position);
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }, [navigation]);

  return (
    <Button
      testID={"weather-current"}
      label="Weather at my position!"
      onPress={handleFetchLocation}
      loading={loading}
      style={error && { borderColor: Colors.ERROR, borderWidth: 2 }}
    />
  );
};

export default WeatherCurrent;
