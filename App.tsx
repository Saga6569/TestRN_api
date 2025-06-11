import * as React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import BackArrow from './src/icons/BackArrow';

import Home from './src/screenPage/Home';
import WhiteSheet from './src/screenPage/WhiteSheet';
import BlackSheet from './src/screenPage/BlackSheet';
import PeopleDetail from './src/screenPage/PeopleDetail';
import './global.css';
import {Provider} from 'react-redux';
import {store, useAppDispatch} from './src/store/store';

import {fetchUserThunk} from './src/slice/userSlice';

type RootDrawerParamList = {
  Главное: undefined;
  Избранное: undefined;
  'Черный список': undefined;
  PeopleDetail: {id: string};
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View>
        <BackArrow />
      </View>
    </TouchableOpacity>
  );
};

const options = {
  headerStyle: {height: 80, backgroundColor: '#70b4e0'},
};

const DrawerScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="Главное">
      <Drawer.Screen
        name="Главное"
        component={Home}
        options={{
          ...options,
          headerTitle: () => (
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontSize: 20 }}>Главное</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Избранное"
        component={WhiteSheet}
        options={{
          ...options,
        }}
      />
      <Drawer.Screen
        name="Черный список"
        component={BlackSheet}
        options={{
          ...options,
        }}
      />
      <Drawer.Screen
        name="PeopleDetail"
        component={PeopleDetail}
        options={{
          ...options,
          headerShown: true,
          title: 'Детали пользователя',
          drawerItemStyle: {height: 0},
          headerLeft: () => <BackButton />,
        }}
      />
    </Drawer.Navigator>
  );
};

function ReduxInitializer() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);
  return null;
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ReduxInitializer />
        <DrawerScreen />
      </NavigationContainer>
    </Provider>
  );
}
