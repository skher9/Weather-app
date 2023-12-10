import React, { useState } from "react";
import styled from "styled-components";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import snow_icon from "../Assets/snow.png";

const Container = styled.div`
  width: 607px;
  height: 800px;
  margin: auto;
  margin-top: 75px;
  border-radius: 12px;
  background-image: linear-gradient(180deg, #130754 0%, #3b2f80 100%);
`;

const TopBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  padding-top: 60px;
`;

const Input = styled.input`
  display: flex;
  width: 362px;
  height: 78px;
  background: #ebfffc;
  boder: none;
  outline: none;
  border-radius: 40px;
  padding-left: 40px;
  color: #626262;
  font-size: 20px;
  font-weight: 400;
`;

const SearchIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78px;
  height: 78px;
  background: #ebfffc;
  border-radius: 40px;
  cursor: pointer;
`;

const SearchImage = styled.img``;

const WeatherImage = styled.div`
  margin-top: 29px;
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  margin-top: 10px;
`;

const WeatherTemp = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  font-size: 120px;
  font-weight: 400;
`;

const WeatherLocation = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  font-size: 60px;
  font-weight: 400;
`;

const DataContainer = styled.div`
  margin-top: 50px;
  color: white;
  display: flex;
  justify-content: center;
`;

const Element = styled.div`
  margin: auto;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const Data = styled.div`
  font-size: 34px;
  font-weight: 400;
`;

const HumidityPercent = styled.div``;

const Text = styled.div`
  font-size: 20px;
  font-weight: 400;
`;

const IconImg = styled.img`
  margin-top: 10px;
`;

const WeatherApp = () => {
  let api_key = "f4dc40e920151cb13946f34f621337ad";

  const [wicon, setwicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&%unit=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percent");
    const Wind = document.getElementsByClassName("wind-rate");
    const temp = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    Wind[0].innerHTML = data.wind.speed + " km/h";
    temp[0].innerHTML = data.main.temp + " °C";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon == "01d" || data.weather[0].icon == "01n") {
      setwicon(clear_icon);
    } else if (data.weather[0].icon == "02d" || data.weather[0].icon == "02n") {
      setwicon(cloud_icon);
    } else if (data.weather[0].icon == "03d" || data.weather[0].icon == "03n") {
      setwicon(drizzle_icon);
    } else if (data.weather[0].icon == "04d" || data.weather[0].icon == "04n") {
      setwicon(drizzle_icon);
    } else if (data.weather[0].icon == "09d" || data.weather[0].icon == "09n") {
      setwicon(rain_icon);
    } else if (data.weather[0].icon == "10d" || data.weather[0].icon == "10n") {
      setwicon(rain_icon);
    } else if (data.weather[0].icon == "13d" || data.weather[0].icon == "13n") {
      setwicon(snow_icon);
    } else {
      setwicon(clear_icon);
    }
  };

  return (
    <Container>
      <TopBar>
        <Input type="text" placeholder="Search" className="cityInput" />
        <SearchIcon
          onClick={() => {
            search();
          }}
        >
          <SearchImage src={search_icon} />
        </SearchIcon>
      </TopBar>
      <WeatherImage>
        <Img src={wicon}></Img>
      </WeatherImage>
      <WeatherTemp className="weather-temp">24°C</WeatherTemp>
      <WeatherLocation className="weather-location">London</WeatherLocation>
      <DataContainer>
        <Element>
          <IconImg src={humidity_icon} />
          <Data>
            <HumidityPercent className="humidity-percent">64%</HumidityPercent>
            <Text>Humidity</Text>
          </Data>
        </Element>
        <Element>
          <IconImg src={wind_icon} />
          <Data>
            <HumidityPercent className="wind-rate">18 km/h</HumidityPercent>
            <Text>Wind Speed</Text>
          </Data>
        </Element>
      </DataContainer>
    </Container>
  );
};

export default WeatherApp;
