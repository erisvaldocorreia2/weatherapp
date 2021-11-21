import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";

import WeatherCoordinates from "./WeatherCoordinates";

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn().mockReturnValue({ navigate: jest.fn() }),
  };
});

describe("Testing WeatherCurrent component", () => {
  it("Should render correclty", () => {
    const wrapper = render(<WeatherCoordinates />);
    wrapper.getByTestId("weather-cardinates");
  });

  it("should navigate to weather screen whith given coordinates when valid form is submited", () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({
      navigate: mockNavigate,
    });
    const wrapper = render(<WeatherCoordinates />);

    const fields = {
      latitue: wrapper.getByTestId("weather-coordinates-latitude"),
      longitude: wrapper.getByTestId("weather-coordinates-longitude"),
    };

    fireEvent.changeText(fields.latitue, "0");
    fireEvent.changeText(fields.longitude, "0");

    const button = wrapper.getByTestId("button");
    fireEvent.press(button);

    waitFor(() => {
      expect(mockNavigate).toBeCalledWith("Weather", {
        latitude: 0,
        longitude: 0,
      });
    });
  });
});
