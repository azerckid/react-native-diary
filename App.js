import Realm from "realm";
// import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import Navigator from "./navigator";
import { DBContext } from "./context";

SplashScreen.preventAutoHideAsync();
const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
  },
  primaryKey: "_id",
};
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [realm, setRealm] = useState([]);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load, make any API calls you need to do here
        const connection = await Realm.open({
          path: "emotionNote",
          schema: [FeelingSchema],
        });
        setRealm(connection);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <DBContext.Provider value={realm}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
