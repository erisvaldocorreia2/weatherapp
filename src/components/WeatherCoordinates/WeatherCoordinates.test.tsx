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

describe("Testing WeatherCoordinates component", () => {
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

  describe("testing Latitude field", () => {
    it("should not show error when value is lowest the range value", () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId("weather-coordinates-latitude");
      fireEvent.changeText(field, "-90");

      return expect(
        wrapper.findByText("Latitude must be a valid number")
      ).rejects.toThrow();
    });

    it("should not show error when value is highest the range value", () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId("weather-coordinates-latitude");
      fireEvent.changeText(field, "90");

      return expect(
        wrapper.findByText("Latitude must be a valid number")
      ).rejects.toThrow();
    });

    it("should show error when value is lower than the lowest range value", async () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId("weather-coordinates-latitude");
      fireEvent.changeText(field, "-91");

      await waitFor(() => {
        wrapper.getByText("Latitude must be a valid number");
      });
    });

    it("should show error when value is higher than the highest range value", async () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId("weather-coordinates-latitude");
      fireEvent.changeText(field, "91");

      await waitFor(() => {
        wrapper.getByText("Latitude must be a valid number");
      });
    });
  });

  describe("testing Longitude field", () => {
    it("should not show error when value is lowest the range value", () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId("weather-coordinates-longitude");
      fireEvent.changeText(field, "-90");

      return expect(
        wrapper.findByText("Longitude must be a valid number")
      ).rejects.toThrow();
    });

    it("should not show error when value is highest the range value", () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId("weather-coordinates-longitude");
      fireEvent.changeText(field, "90");

      return expect(
        wrapper.findByText("Longitude must be a valid number")
      ).rejects.toThrow();
    });

    it("should show error when value is lower than the lowest range value", async () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId("weather-coordinates-longitude");
      fireEvent.changeText(field, "-91");

      await waitFor(() => {
        wrapper.getByText("Longitude must be a valid number");
      });
    });

    it("should show error when value is higher than the highest range value", async () => {
      const wrapper = render(<WeatherCoordinates />);

      const field = wrapper.getByTestId("weather-coordinates-longitude");
      fireEvent.changeText(field, "91");

      await waitFor(() => {
        wrapper.getByText("Longitude must be a valid number");
      });
    });
  });
});
