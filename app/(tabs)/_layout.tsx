import { Feather, FontAwesome6 } from '@expo/vector-icons';
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
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="invoices"
        options={{
          title: 'Invoices',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="file-invoice" size={size} color={color} />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="contact-book" size={size} color={color} />
          ),
          title: 'Contacts',
          headerTitleAlign: 'center',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user-astronaut" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
