import React, { useState } from "react";
import { Text } from "react-native";
import { checkPlatform } from "../common/constants";

export default function ReadMoreText({
  style,
  numberOfLines = 1,
  children,
  readMoreText = "виж повече",
  readLessText = "виж по-малко",
  readMoreStyle = { color: "black" },
  readLessStyle = { color: "black" },
  ...props
}) {
  const [readMore, setReadMore] = useState(false);
  const [text, setText] = useState({
    length: 0,
    isTruncatedText: false,
  });

  const getReadMoreStyle = () => (readMore ? readLessStyle : readMoreStyle);

  const handleReadMoreText = (textLayoutLines) => {
    let textLength = 0;
    if (textLayoutLines.length > numberOfLines) {
      for (let line = 0; line < numberOfLines; line++) {
        textLength += textLayoutLines[line].text.length;
      }
      setText({ length: textLength, isTruncatedText: true });
      return;
    }
    setText({ length: children.length, isTruncatedText: false });
  };

  return (
    <>
      {checkPlatform() === "ios" && (
        <Text
          style={{ height: 0 }}
          onTextLayout={({ nativeEvent: { lines } }) => {
            if (text.length > 0) {
              return;
            }
            handleReadMoreText(lines);
          }}
        >
          {children}
        </Text>
      )}

      <Text
        style={style}
        numberOfLines={text.length === 0 ? numberOfLines : 0}
        onTextLayout={({ nativeEvent: { lines } }) => {
          if (text.length > 0) {
            return;
          }
          if (checkPlatform() === "android") {
            handleReadMoreText(lines);
          }
        }}
        {...props}
      >
        {text.isTruncatedText && !readMore && text.length !== 0
          ? `${children.slice(0, text.length - 10).trim()}...`
          : children}
        {"\n"}

        {text.isTruncatedText && (
          <Text
            style={getReadMoreStyle()}
            onPress={() => setReadMore(!readMore)}
          >
            {readMore ? readLessText : readMoreText}
          </Text>
        )}
      </Text>
    </>
  );
}
