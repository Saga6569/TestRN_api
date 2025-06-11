import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {User} from '../api/users';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {findUser} from '../slice/getUserDetail';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

type RootStackParamList = {
  Home: undefined;
  PeopleDetail: {id: string};
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const WhiteSheet = () => {
  const state = useSelector((state: RootState) => state.users);
  const navigation = useNavigation<NavigationProp>();

  const arrIsWhiteSheet = state.usersDetail
    .filter(user => user.isWhiteSheet)
    .map(user => user.id);
  if (arrIsWhiteSheet.length === 0) {
    return (
      <View className="flex-1 bg-gray-700 items-center justify-center">
        <Text className="text-white text-lg pb-10">
          У вас нет пользователей в избранном
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text className="text-blue-500 text-lg">Перейти на главную</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-700">
      <View className="p-4">
        {state.users
          .filter(user => arrIsWhiteSheet.includes(user.id))
          .map((user: User) => (
            <TouchableOpacity
              key={user.id}
              onPress={() => {
                navigation.navigate('PeopleDetail', {id: user.id});
              }}
              className="bg-gray-800 rounded-lg p-4 mb-4 flex-row items-center active:opacity-70">
              <Image
                source={{uri: user.avatar}}
                className="w-20 h-20 rounded-full"
              />
              <Text className="text-white text-lg ml-4 flex-1 text-left">
                {user.name}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

export default WhiteSheet;
