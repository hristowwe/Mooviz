import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import { checkPlatform } from "../../common/constants";
import { authenticate, logout } from "../../store/authSlice";

export const signInWithGoogle = () => {
  return async (dispatch) => {
    try {
      const userInfo = await GoogleSignin.signIn();
      const { idToken, user } = userInfo;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const result = await auth().signInWithCredential(googleCredential);
      const { uid } = result.user;
      const fullName = user.name;
      dispatch(authenticate({ uid, fullName }));
    } catch (error) {
      throw new Error(error);
    }
  };
};

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Необходими са разрешения",
        "Трябва да разрешите известията в настройките, за да получавате актуализации",
        [
          {
            text: "ОК!",
            onPress: () => {},
          },
        ]
      );
      return;
    }

    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });

    console.log(token.data);
  } else {
    Alert.alert("Трябва да използвате физическо устройство за Push известия");
  }

  if (checkPlatform() === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const { uid } = result.user;
      dispatch(authenticate({ uid: uid, fullName: "Firebaser" }));
      await registerForPushNotificationsAsync();
    } catch (error) {
      const errorCode = error.code;
      let message = "Нещо се обърка.";

      if (errorCode === "auth/email-already-in-use") {
        message = "Имейлът е зает!";
      }

      throw new Error(message);
    }
  };
};
export const userLogout = () => {
  return async (dispatch) => {
    dispatch(logout());
  };
};
export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      const { uid } = result.user;
      dispatch(authenticate({ uid: uid, fullName: "Firebaser" }));
    } catch (error) {
      const errorCode = error.code;
      let message = "Нещо се обърка....";
      console.log(error.message);
      if (
        errorCode === "auth/wrong-password" ||
        errorCode === "auth/user-not-found" ||
        errorCode === "auth/invalid-login" ||
        errorCode === "auth/invalid-credential"
      ) {
        message = "Потребителското име или паролата са Ви грешни.";
      } else if (errorCode === "auth/user-disabled") {
        message = "Вашият акаунт е премахнат или деактивиран";
      } else if (errorCode === "auth/too-many-requests") {
        message =
          "Достъпът до този акаунт е временно деактивиран поради много неуспешни опити за влизане. Можете незабавно да го възстановите, като нулирате паролата си, или можете да опитате отново по-късно.";
      }
      throw new Error(message);
    }
  };
};
