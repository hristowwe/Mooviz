import React from "react";
import { Provider } from "react-redux";
import MSafeAreaView from "./components/common/MSafeAreaView";
import AppNavigator from "./navigation/AppNavigator";
import { store } from "./store/store";
import { styles } from "./themes";

export default function App() {
  return (
    <Provider store={store}>
      <MSafeAreaView style={styles.flex}>
        <AppNavigator />
      </MSafeAreaView>
    </Provider>
  );
}
