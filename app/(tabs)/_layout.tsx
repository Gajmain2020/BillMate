import { FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
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
