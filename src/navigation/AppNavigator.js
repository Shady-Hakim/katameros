import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  HomeScreen,
  OpeningScreen,
  CategoriesScreen,
  PostsScreen,
  SinglePostScreen,
  PageScreen,
} from '../screens';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const defaultStackScreenOptions = {
  headerBackTitle: 'الرجوع',
  headerStyle: {
    backgroundColor: '#f3f3f3',
  },
};

const defaultDrawerScreenOptions = ({ navigation }) => ({
  headerLeft: () => (
    <Ionicons
      name="menu-sharp"
      style={{ marginStart: 10 }}
      size={32}
      color="#fff"
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    />
  ),
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
});

const createDynamicStackNavigator = (screens) => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions}>
    {screens.map(({ name, component, options }, index) => (
      <Stack.Screen
        key={index}
        name={name}
        component={component}
        options={options}
      />
    ))}
  </Stack.Navigator>
);
const AppNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={defaultDrawerScreenOptions}
    >
      <Drawer.Screen
        name="HomeStack"
        options={{ drawerLabel: 'الرئيسية', title: 'الرئيسية' }}
      >
        {() =>
          createDynamicStackNavigator([
            {
              name: 'Home',
              component: HomeScreen,
              options: { headerShown: false },
            },
            {
              name: 'Posts',
              component: PostsScreen,
              options: ({ route }) => ({
                title: route.params?.name || 'القراءات',
              }),
            },
            {
              name: 'Single',
              component: SinglePostScreen,
              options: ({ route }) => ({
                title: route.params?.title || 'القراءات',
              }),
            },
          ])
        }
      </Drawer.Screen>
      <Drawer.Screen
        name="Opening"
        component={OpeningScreen}
        options={{ drawerLabel: 'كلمة افتتاحية', title: 'كلمة افتتاحية' }}
      />
      <Drawer.Screen
        name="Arsany"
        component={PageScreen}
        options={{
          drawerLabel: 'تقديم نيافة الأنبا أرساني',
          title: 'تقديم نيافة الأنبا أرساني',
        }}
        initialParams={{ pageId: 2 }}
      />
      <Drawer.Screen
        name="Yassa"
        component={PageScreen}
        options={{
          drawerLabel: 'تقديم القمص يسي ثابت',
          title: 'تقديم القمص يسي ثابت',
        }}
        initialParams={{ pageId: 7 }}
      />
      <Drawer.Screen
        name="Readings"
        options={{ drawerLabel: 'القراءات', title: 'القراءات' }}
      >
        {() =>
          createDynamicStackNavigator([
            {
              name: 'Categories',
              component: CategoriesScreen,
              options: { headerShown: false },
            },
            {
              name: 'Posts',
              component: PostsScreen,
              options: ({ route }) => ({
                title: route.params?.name || 'القراءات',
              }),
            },
            {
              name: 'Single',
              component: SinglePostScreen,
              options: ({ route }) => ({
                title: route.params?.title || 'القراءات',
              }),
            },
          ])
        }
      </Drawer.Screen>
    </Drawer.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
