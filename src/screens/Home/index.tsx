import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { RectButton } from "react-native-gesture-handler";

import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";

import { CarCard } from "../../components/CarCard";
import { AnimatedLoading } from "../../components/AnimatedLoading";

import Logo from "../../assets/logo.svg";
import { Container, Header, HeaderContent, TotalCars, CarList } from "./styles";

export function Home() {
  const { navigate } = useNavigation();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  function handleCarDetails(car: CarDTO) {
    navigate("CarDetails", { car });
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data } = await api.get("/cars");

        setCars(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetching(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!isFetching && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {isFetching ? (
        <AnimatedLoading />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CarCard data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}