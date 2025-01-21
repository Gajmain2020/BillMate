import { FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { paddingTop: 6 },
        tabBarActiveTintColor: '#166534',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Invoice',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="file-invoice" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user-astronaut" size={size} color={color} />
          ),
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
