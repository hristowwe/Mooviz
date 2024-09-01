import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { getHeight, moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import typography from "../../themes/typography";
import MText from "./MText";

export default MInput = (props) => {
  let {
    _value,
    label,
    inputContainerStyle,
    inputBoxStyle,
    toGetTextFieldValue,
    placeHolder,
    keyBoardType,
    _onFocus,
    _onBlur,
    _errorText,
    _autoFocus,
    _isSecure,
    _maxLength,
    _mimLength,
    _editable = true,
    autoCapitalize,
    required = false,
    labelStyle,
    multiline,
    errorStyle,
    fieldRef,
    insideLeftIcon,
    showError = true,
    rightAccessory,
  } = props;

  const colors = useSelector((state) => state.theme.theme);

  // Change Text Input Value
  const onChangeText = (val) => {
    toGetTextFieldValue(val);
  };

  return (
    <View style={styles.mv10}>
      {label && (
        <View style={[localStyle.labelContainer, labelStyle]}>
          <View style={styles.flexRow}>
            <MText style={localStyle.labelText} type={"b18"}>
              {label}
            </MText>
            {required && (
              <MText style={{ color: colors.alertColor }}>{" *"}</MText>
            )}
          </View>
        </View>
      )}
      <View
        style={[
          localStyle.inputContainer,
          {
            borderColor: _errorText ? colors.alertColor : colors.bColor,
            height: multiline ? moderateScale(200) : moderateScale(50),
          },
          inputContainerStyle,
        ]}
      >
        {insideLeftIcon ? (
          <View style={styles.pl10}>{insideLeftIcon()}</View>
        ) : null}
        <TextInput
          ref={fieldRef}
          secureTextEntry={_isSecure}
          value={_value}
          maxLength={_maxLength}
          defaultValue={_value}
          autoFocus={_autoFocus}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={colors.placeHolderColor}
          onChangeText={onChangeText}
          keyboardType={keyBoardType}
          multiline={multiline}
          editable={_editable}
          onFocus={_onFocus}
          onBlur={_onBlur}
          placeholder={placeHolder}
          style={[
            localStyle.inputBox,
            {
              color: colors.textColor,
              textAlignVertical: multiline ? "top" : "center",
            },
            { height: multiline ? getHeight(200) : getHeight(50) },
            inputBoxStyle,
            _editable == false && { color: colors.placeHolderColor },
          ]}
          {...props}
        />
        {/* Right Icon And Content Inside TextInput */}
        <View style={[styles.mr15]}>
          {rightAccessory ? rightAccessory() : null}
        </View>
      </View>
      <View
        style={{
          alignItems: "flex-start",
        }}
      >
        {/* Error Text Message Of Input */}
        {_errorText && _errorText != "" ? (
          <MText
            style={{
              ...localStyle.errorText,
              ...errorStyle,
              color: colors.alertColor,
            }}
          >
            {_errorText}
          </MText>
        ) : null}

        {_maxLength && showError && _value?.length >= _maxLength ? (
          <MText style={{ ...localStyle.errorText, ...errorStyle }}>
            Достигнахте лимита
          </MText>
        ) : _mimLength && _value?.length < _mimLength && _value?.length >= 1 ? (
          <MText style={{ ...localStyle.errorText, ...errorStyle }}>
            Въведете поне {_mimLength} символа
          </MText>
        ) : null}
        {_maxLength && (
          <View style={localStyle.charCounter}>
            <MText style={{ color: colors.textColor }}>
              {_value.length}/{_maxLength}
            </MText>
          </View>
        )}
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  labelText: {
    textAlign: "left",
    opacity: 0.9,
  },
  inputBox: {
    ...typography.fontSizes.f16,
    ...typography.fontWeights.Regular,
    ...styles.ph10,
    ...styles.flex,
  },
  inputContainer: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(6),
    ...styles.rowSpaceBetween,
    ...styles.mt5,
    width: "100%",
  },
  labelContainer: {
    ...styles.mt10,
    ...styles.rowSpaceBetween,
    ...styles.mb5,
  },
  errorText: {
    textAlign: "left",
    ...typography.fontSizes.f12,
    ...styles.mt5,
    ...styles.ml10,
    color: "#F75555",
  },

  charCounter: {
    marginLeft: "auto",
    marginTop: moderateScale(5),
  },
});
