
import { CarDTO } from '../../dtos/CarDTO';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondyStep: {
    user: {
      name: string,
      email: string,
      driverLicense: string,
    }
  },
  CarDetails: {
    car: CarDTO
  },
  MyCars: undefined;
  Scheduling: {
    car: CarDTO
  },
  SchedulingDetails: {
    car: CarDTO,
    dates: string[],
  },
  Confirmation: {
    title: string,
    message: string,
    nextScreenRoute: 'Home' | 'SignIn',
  }
};