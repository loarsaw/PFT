import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider as StoreProvider } from "react-redux";

import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "@/redux/store";

function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <StoreProvider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
              title: "Home",
            }}
          />
           <Stack.Screen
            name="(task)"
            options={{
              headerShown: false,
              title: "Task",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </StoreProvider>
  );
}
export default RootLayout;
