import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { Text, View } from '../../components/Themed';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: () => <View style={{ backgroundColor: '#3B7A57' }}>
            <Text style={{ fontSize: 20, fontWeight: '800',color:'white' }}>Welcome</Text>
            <Text style={{ fontSize: 14, fontWeight: '400',color:'white' }}>Igbashio Julius I.</Text>
          </View>,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1,color:'white' }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          tabBarShowLabel: false,
          headerStyle: { backgroundColor: '#3B7A57' },
          headerTitleStyle: { color: '#FFFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          tabBarShowLabel: false
        }}
      />
    </Tabs>
  );
}
