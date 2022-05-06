import { showMessage } from "react-native-flash-message";

export function errorAlert(title: string, message: string) {
  showMessage({
    message: title,
    description: message,
    type: "danger",
    duration: 4000,
    backgroundColor: '#D0342C',
    titleStyle: {
      fontFamily: 'BalooChettan2_700Bold'
    },
    textStyle: {
      fontFamily: 'Poppins_400Regular'
    },
  })
}

export function warningAlert(title: string, message: string) {
  showMessage({
    message: title,
    description: message,
    type: "info",
    duration: 4000,
    backgroundColor: '#369BED',
    titleStyle: {
      fontFamily: 'BalooChettan2_700Bold'
    },
    textStyle: {
      fontFamily: 'Poppins_400Regular'
    },
  })
}
