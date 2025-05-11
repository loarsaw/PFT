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
          name="index"
          options={{
            title: "Account",
          }}
        />
      </Stack>
    </Provider>
  );
}
