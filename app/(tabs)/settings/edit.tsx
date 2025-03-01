import { zodResolver } from '@hookform/resolvers/zod';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { useForm, FormProvider } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';

import { Button } from '~/components/Button';
import InfoSection from '~/components/InfoSection';
import LogoSection from '~/components/LogoSection';
import OptionalSection from '~/components/OptionalSection';
import { ownerEntitySchema, OwnerEntityType } from '~/schema/invoice';
import { useStore } from '~/store';

const Tab = createMaterialTopTabNavigator();

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  return (
    <View className="flex-row justify-between border-b border-gray-300 bg-white">
      {state.routes.map((route: { key: string; name: string }, index: number) => {
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            className={`flex-1 items-center p-3 ${
              isFocused
                ? 'rounded border-b-2 border-emerald-500 bg-gray-300/60'
                : 'border-b-2 border-transparent'
            }`}>
            <Text className={isFocused ? 'font-bold text-emerald-500' : 'text-gray-500'}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default function Profile() {
  const setProfile = useStore((data) => data.setProfile);
  const profile = useStore((data) => data.profile);

  const form = useForm<OwnerEntityType>({
    resolver: zodResolver(ownerEntitySchema),
    defaultValues: {
      id: profile?.id || '',
      name: profile?.name || '',
      address: profile?.address || '',
      gst: profile?.gst || '',
      contact: profile?.contact || '',
      altContact: profile?.altContact || '',
      email: profile?.email || '',
      website: profile?.website || '',
      logo: profile?.logo || '',
    },
  });

  const navigation = useNavigation();

  const onSubmit = (data: OwnerEntityType) => {
    setProfile(data);
    navigation.goBack();
  };

  return (
    <FormProvider {...form}>
      <Text className="text-2xl font-bold">Edit Profile</Text>
      <Text className="mb-4 text-gray-600">Update your business details</Text>

      {/* Tab Navigation */}
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen name="Info" component={InfoSection} />
        <Tab.Screen name="Optional" component={OptionalSection} />
        <Tab.Screen name="Logo" component={LogoSection} />
      </Tab.Navigator>

      <View className="p-4">
        <Button title="Save Changes" onPress={form.handleSubmit(onSubmit)} />
      </View>
    </FormProvider>
  );
}
