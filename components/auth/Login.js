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
import Google from "../../assets/svgs/Google";
import { getHeight, moderateScale } from "../../common/constants";
import KeyBoardAvoidWrapper from "../../components/common/KeyBoardAvoidWrapper";
import { styles } from "../../themes";
import { signIn, signInWithGoogle } from "../../utils/actions/authActions";
import { validateEmail, validatePassword } from "../../utils/validators";
import MButton from "../common/MButton";
import MInput from "../common/MInput";
import MText from "../common/MText";
const Login = ({ setSignUp }) => {
  const colors = useSelector((state) => state.theme.theme);

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
  const [emailInputStyle, setEmailInputStyle] = React.useState(BlurredStyle);
  const [passwordInputStyle, setPasswordInputStyle] =
    React.useState(BlurredStyle);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  const onFocusInput = (onHighlight) => onHighlight(FocusedStyle);
  const onFocusIcon = (onHighlight) => onHighlight(FocusedIconStyle);
  const onBlurInput = (onUnHighlight) => onUnHighlight(BlurredStyle);
  const onBlurIcon = (onUnHighlight) => onUnHighlight(BlurredIconStyle);
  const RenderSocialBtn = React.memo(() => {
    return (
      <TouchableOpacity
        onPress={async () => {
          const action = signInWithGoogle();
          await dispatch(action);
        }}
        style={[
          localStyles.socialBtn,
          {
            backgroundColor: colors.inputBg,
            borderColor: colors.bColor,
          },
        ]}
      >
        <Google />
      </TouchableOpacity>
    );
  });
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

  const onPressPasswordEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);
  const onPressSignUp = () => {
    setSignUp(true);
  };
  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const action = signIn(email, password);
      await dispatch(action);
    } catch (error) {
      Alert.alert("Грешка", error.message, [
        {
          text: "Ок",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, email, password]);
  return (
    <KeyBoardAvoidWrapper>
      <View style={localStyles.mainContainer}>
        <MText type={"b46"} align={"left"} style={styles.mv40}>
          Влез в акаунта си
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
          inputBoxStyle={localStyles.inputBoxStyle}
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
          inputBoxStyle={localStyles.inputBoxStyle}
          _onFocus={onFocusPassword}
          onBlur={onBlurPassword}
          rightAccessory={() => <RightPasswordEyeIcon />}
        />

        {isLoading ? (
          <ActivityIndicator size={"large"} color={colors.textColor} />
        ) : (
          <MButton
            title={"Влез"}
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
            {"Регистрирай се"}
          </MText>
          <View
            style={[
              localStyles.orContainer,
              { backgroundColor: colors.bColor },
            ]}
          />
        </View>
        <View style={localStyles.socialBtnContainer}>
          <RenderSocialBtn />
        </View>
        <TouchableOpacity
          onPress={onPressSignUp}
          style={localStyles.signUpContainer}
        >
          <MText
            type={"b16"}
            color={colors.dark ? colors.grayScale7 : colors.grayScale5}
          >
            {"Нямаш акаунт?"}
          </MText>
          <MText type={"b16"} color={colors.primary}>
            {" "}
            {"Регистрирай се"}
          </MText>
        </TouchableOpacity>
      </View>
    </KeyBoardAvoidWrapper>
  );
};

export default Login;

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.ph20,
  },
  divider: {
    ...styles.rowCenter,
    ...styles.mv30,
  },
  orContainer: {
    height: getHeight(1),
    width: "30%",
  },
  signBtnContainer: {
    ...styles.center,
    width: "100%",
    ...styles.mv20,
  },
  signUpContainer: {
    ...styles.rowCenter,
    ...styles.mv10,
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

  socialBtnContainer: {
    ...styles.rowCenter,
    ...styles.mv20,
  },
  socialBtn: {
    ...styles.center,
    height: getHeight(60),
    width: moderateScale(90),
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    ...styles.mh10,
  },
});
