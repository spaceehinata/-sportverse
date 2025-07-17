'use client';

import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import MessageIcon from '@/components/MessageIcon';
import { MenuProvider } from './context/MenuContext';

export default function RootLayout() {
  return (
    <MenuProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />

        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarIconStyle: styles.tabBarIconStyle,
          }}
        >
          <Tabs.Screen
            name="homepage"
            options={{
              tabBarIcon: ({ color, size }) => (
                <MessageIcon color={color} size={size} />
              ),
              tabBarButton: (props) => {
                const filteredProps = Object.fromEntries(
                  Object.entries(props).filter(([_, v]) => v !== null)
                );
                return (
                  <TouchableOpacity
                    {...filteredProps}
                    onPress={(e) => {
                      if (props.onPress) props.onPress(e);
                    }}
                  />
                );
              },
            }}
          />

          {/* გამოიყენე თუ გინდა შეტყობინებები ან პროფილი */}
          {/* 
          <Tabs.Screen
            name="notification"
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <NotificationIcon color={color} size={size} focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="user"
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <UserIcon color={color} size={size} focused={focused} />
              ),
            }}
          />
          */}
        </Tabs>
      </View>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 66,
    paddingBottom: 31,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 0,
    backgroundColor: '#263238',
  },
  tabBarIconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
