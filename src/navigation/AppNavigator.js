import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  HomeScreen,
  CategoriesScreen,
  PostsScreen,
  SinglePostScreen,
  PageScreen,
} from '../screens';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const CategoriesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: 'الرجوع' }}>
      <Stack.Screen
        name='Categories'
        component={CategoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Posts'
        component={PostsScreen}
        options={({ route }) => ({ title: route.params.name || 'القراءات' })}
      />
      <Stack.Screen
        name='Single'
        component={SinglePostScreen}
        options={({ route }) => ({ title: route.params.title || 'القراءات' })}
      />
    </Stack.Navigator>
  );
};

const AppNavigagtor = () => {
  const { Navigator, Screen } = Drawer;
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4c2710',
          },
          headerTintColor: '#fff',
          drawerStyle: {
            backgroundColor: '#4c2710',
            width: 280,
          },
          drawerLabelStyle: {
            fontSize: 18,
            color: '#fff',
            alignSelf: 'flex-start',
          },
          overlayColor: 'transparent',
        }}
      >
        <Screen
          name='Home'
          component={HomeScreen}
          options={{ drawerLabel: 'كلمة افتتاحية', title: 'كلمة افتتاحية' }}
        />
        <Screen
          name='Arsany'
          component={PageScreen}
          options={{
            drawerLabel: 'تقديم نيافة الأنبا أرساني',
            title: 'تقديم نيافة الأنبا أرساني',
          }}
          initialParams={{ pageId: 2 }}
        />
        <Screen
          name='Yassa'
          component={PageScreen}
          options={{
            drawerLabel: 'تقديم القمص يسي ثابت',
            title: 'تقديم القمص يسي ثابت',
          }}
          initialParams={{ pageId: 7 }}
        />
        <Screen
          name='Maana'
          component={PageScreen}
          options={{
            drawerLabel: 'معني ومغزي القراءات الكنسية',
            title: 'معني ومغزي القراءات الكنسية',
          }}
          initialParams={{ pageId: 9 }}
        />
        <Screen
          name='Readings'
          component={CategoriesStackNavigator}
          options={{ drawerLabel: 'القراءات', title: 'القراءات' }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigagtor;
