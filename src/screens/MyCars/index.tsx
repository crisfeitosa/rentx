import React, { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import { GoBackButton } from "../../components/GoBackButton";
import { CarCard } from "../../components/CarCard";
import { AnimatedLoading } from "../../components/AnimatedLoading";

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";

interface ICar {
  user_id: string;
  car: CarDTO;
  id: string;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const theme = useTheme();
  const { goBack } = useNavigation();

  const [cars, setCars] = useState<ICar[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  function handleGoBack() {
    goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data } = await api.get("schedules_byuser?user_id=1");
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
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <GoBackButton color={theme.colors.shape} onPress={handleGoBack} />

        <Title>
          Seus agendamentos, {"\n"}
          estão aqui.
        </Title>

        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>

      {isFetching ? (
        <AnimatedLoading />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>
              {String(cars.length).padStart(2, "0")}
            </AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <CarCard data={item.car} />

                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>

                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />

                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}