// Library Imports
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getHeight, moderateScale } from "../../common/constants";
import KeyBoardAvoidWrapper from "../../components/common/KeyBoardAvoidWrapper";
import { styles } from "../../themes";
import { signUp } from "../../utils/actions/authActions";
import { validateEmail, validatePassword } from "../../utils/validators";
import MButton from "../common/MButton";
import MInput from "../common/MInput";
import MSafeAreaView from "../common/MSafeAreaView";
import MText from "../common/MText";
const Register = ({ setSignUp }) => {
  const colors = useSelector((state) => state.theme.theme);
  const navigation = useNavigation();
  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    backgroundColor: colors.inputFocusColor,
    borderColor: colors.primary,
  };

  const BlurredIconStyle = colors.grayScale5;
  const FocusedIconStyle = colors.primary;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [emailIcon, setEmailIcon] = React.useState(BlurredIconStyle);

  const [passwordIcon, setPasswordIcon] = React.useState(BlurredIconStyle);
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);

  const [loading, setLoading] = React.useState(false);
  const [emailInputStyle, setEmailInputStyle] = React.useState(BlurredStyle);
  const [passwordInputStyle, setPasswordInputStyle] =
    React.useState(BlurredStyle);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);

  const onFocusInput = (onHighlight) => onHighlight(FocusedStyle);
  const onFocusIcon = (onHighlight) => onHighlight(FocusedIconStyle);
  const onBlurInput = (onUnHighlight) => onUnHighlight(BlurredStyle);
  const onBlurIcon = (onUnHighlight) => onUnHighlight(BlurredIconStyle);

  useEffect(() => {
    if (
      email.length > 0 &&
      password.length > 0 &&
      !emailError &&
      !passwordError
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [email, password, emailError, passwordError]);

  const onChangedEmail = (val) => {
    const { msg } = validateEmail(val.trim());
    setEmail(val.trim());
    setEmailError(msg);
  };
  const onChangedPassword = (val) => {
    const { msg } = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordError(msg);
  };

  const dispatch = useDispatch();

  const authHandler = useCallback(async () => {
    try {
      setLoading(true);
      const action = signUp(email, password);
      await dispatch(action);
    } catch (error) {
      console.log(error);
      Alert.alert("Грешка", error.message, [
        {
          text: "Ок",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [dispatch, email, password]);

  const onPressPasswordEyeIcon = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const EmailIcon = () => {
    return <Ionicons name="mail" size={moderateScale(20)} color={emailIcon} />;
  };

  const onFocusEmail = () => {
    onFocusInput(setEmailInputStyle);
    onFocusIcon(setEmailIcon);
  };
  const onBlurEmail = () => {
    onBlurInput(setEmailInputStyle);
    onBlurIcon(setEmailIcon);
  };

  const PasswordIcon = () => (
    <Ionicons
      name="lock-closed"
      size={moderateScale(20)}
      color={passwordIcon}
    />
  );
  const onFocusPassword = () => {
    onFocusInput(setPasswordInputStyle);
    onFocusIcon(setPasswordIcon);
  };
  const onBlurPassword = () => {
    onBlurInput(setPasswordInputStyle);
    onBlurIcon(setPasswordIcon);
  };
  const RightPasswordEyeIcon = () => (
    <TouchableOpacity
      onPress={onPressPasswordEyeIcon}
      style={localStyles.eyeIconContainer}
    >
      <Ionicons
        name={isPasswordVisible ? "eye-off" : "eye"}
        size={moderateScale(20)}
        color={passwordIcon}
      />
    </TouchableOpacity>
  );

  const onPressSignIn = () => {
    setSignUp(false);
  };

  return (
    <MSafeAreaView>
      <KeyBoardAvoidWrapper>
        <View style={localStyles.mainContainer}>
          <MText
            type={"b46"}
            align={"left"}
            style={[styles.mv40, { flexShrink: 1 }]}
          >
            {"Създай акаунт"}
          </MText>
          <MInput
            placeHolder={"Имейл"}
            keyBoardType={"email-address"}
            _value={email}
            _errorText={emailError}
            autoCapitalize={"none"}
            insideLeftIcon={() => <EmailIcon />}
            toGetTextFieldValue={onChangedEmail}
            inputContainerStyle={[
              { backgroundColor: colors.inputBg },
              localStyles.inputContainerStyle,
              emailInputStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusEmail}
            onBlur={onBlurEmail}
          />

          <MInput
            placeHolder={"Парола"}
            keyBoardType={"default"}
            _value={password}
            _errorText={passwordError}
            autoCapitalize={"none"}
            insideLeftIcon={() => <PasswordIcon />}
            toGetTextFieldValue={onChangedPassword}
            inputContainerStyle={[
              { backgroundColor: colors.inputBg },
              localStyles.inputContainerStyle,
              passwordInputStyle,
            ]}
            _isSecure={isPasswordVisible}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusPassword}
            onBlur={onBlurPassword}
            rightAccessory={() => <RightPasswordEyeIcon />}
          />

          {loading ? (
            <ActivityIndicator size={"large"} color={colors.textColor} />
          ) : (
            <MButton
              title={"Регистрирай се"}
              type={"S16"}
              color={isSubmitDisabled && colors.white}
              containerStyle={[
                localStyles.signBtnContainer,
                { opacity: isSubmitDisabled ? 0.5 : 1 },
              ]}
              onPress={authHandler}
              bgColor={isSubmitDisabled && colors.disabledColor}
              disabled={isSubmitDisabled}
            />
          )}
          <View style={localStyles.divider}>
            <View
              style={[
                localStyles.orContainer,
                { backgroundColor: colors.bColor },
              ]}
            />
            <MText type={"s18"} style={styles.mh10}>
              {"Вече имаш акаунт?"}
            </MText>
            <View
              style={[
                localStyles.orContainer,
                { backgroundColor: colors.bColor },
              ]}
            />
          </View>

          <TouchableOpacity
            onPress={onPressSignIn}
            style={localStyles.signUpContainer}
          >
            <MText
              type={"b16"}
              color={colors.dark ? colors.grayScale7 : colors.grayScale5}
            >
              {"Имаш акаунт?"}
            </MText>
            <MText type={"b16"} color={colors.primary}>
              {" "}
              {"Влез"}
            </MText>
          </TouchableOpacity>
        </View>
      </KeyBoardAvoidWrapper>
    </MSafeAreaView>
  );
};

export default Register;

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.ph20,
  },

  divider: {
    ...styles.rowCenter,
    ...styles.mv20,
  },
  orContainer: {
    height: moderateScale(1),
    width: "30%",
  },
  signBtnContainer: {
    ...styles.center,
    width: "100%",
    ...styles.mv20,
  },
  signUpContainer: {
    ...styles.rowCenter,
    ...styles.mv20,
  },
  inputContainerStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
});
