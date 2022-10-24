import { addDays } from "date-fns";
import { Platform } from "react-native";

// No Iphone o componente de Calendário pega o dia - 1
export function getPlatformDate(date: Date) {
  if (Platform.OS === "ios") {
    return addDays(date, 1);
  } else {
    return date;
  }
}