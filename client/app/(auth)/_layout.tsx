import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "@/redux/store";
import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";

export default function StackLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
        }}
      >
        <Stack.Screen
          name="login"
          options={{
            title: "Account",
          }}
        />

        <Stack.Screen
          name="signup"
          options={{
            title: "SignUp",
          }}
        />
      </Stack>
    </Provider>
  );
}
