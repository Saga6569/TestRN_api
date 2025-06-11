import React from 'react';
import {View, Text, TextInput, ScrollView, Image} from 'react-native';
import CheckBox from 'react-native-check-box';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {
  fetchUserDetailThunk,
  updateUserDetailWhiteSheet,
  updateUserDetailBlackSheet,
} from '../slice/userSlice';
import {useAppDispatch} from '../store/store';

const PeopleDetail = ({route}: {route: {params: {id: string}}}) => {
  const {id} = route.params;
  const dispatch = useAppDispatch();
  const userDetail = useSelector((state: RootState) => state.users.usersDetail);
  const users = useSelector((state: RootState) => state.users.users);
  const currentUser = userDetail.find(user => user.id === id);

  React.useEffect(() => {
    if (!currentUser) {
      dispatch(fetchUserDetailThunk(id));
    }
  }, [dispatch, id, currentUser]);

  const formatDate = (dateString: string) => {
    return dateString && new Date(dateString).toString() !== 'Invalid Date'
      ? new Date(dateString).toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Нет данных';
  };

  if (!currentUser) {
    return (
      <View className="flex-1 bg-gray-700 items-center justify-center">
        <Text className="text-white text-lg">Ищем данные пользователя...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-700">
      <View className="p-4">
        {/* Аватар пользователя */}

        <View className="items-center mb-6">
          <Image
            source={{uri: users.find(user => user.id === id)?.avatar}}
            className="w-40 h-40 rounded-full mb-2"
          />
        </View>

        <View className="bg-gray-800 rounded-lg p-6 mb-4">
          <View className="mb-6 flex-row items-center gap-10">
            <Text className="text-gray-400 text-sm mb-1">ID</Text>
            <Text className="text-white text-lg">{currentUser.id}</Text>
          </View>

          <View className="mb-6 flex-row items-center gap-10">
            <Text className="text-gray-400 text-sm mb-1">Имя</Text>
            <Text className="text-white text-lg">
              {users.find(user => user.id === id)?.name}
            </Text>
          </View>
          <View className="mb-6 flex-row items-center gap-10">
            <Text className="text-gray-400 text-sm mb-1">Email</Text>
            <Text className="text-white text-lg">{currentUser.Email}</Text>
          </View>

          <View className="mb-6 flex-row items-center gap-10">
            <Text className="text-gray-400 text-sm mb-1">Город</Text>
            <Text className="text-white text-lg">{currentUser.City}</Text>
          </View>

          <View className="mb-6 flex-row items-center gap-10">
            <Text className="text-gray-400 text-sm mb-1">Описание</Text>
            <Text className="text-white text-lg">
              {currentUser.Description}
            </Text>
          </View>

          <View className="mb-6 flex-row items-center gap-10">
            <Text className="text-gray-400 text-sm mb-1">Дата создания</Text>
            <Text className="text-white text-lg">
              {formatDate(currentUser.createdAt)}
            </Text>
          </View>

          <View className="mb-6 flex-row items-center gap-10">
            <Text className="text-gray-400 text-sm mb-1">Люимый Цвет</Text>
            <View className="flex-row items-center">
              <View
                style={{backgroundColor: currentUser.Color}}
                className="w-8 h-8 rounded-full mr-3"
              />
            </View>
          </View>
          <View className="flex-row justify-between mb-6">
            <View className="flex-row items-center gap-2">
              <Text className="text-white ">Избранное</Text>
              <CheckBox
                onClick={() => {
                  dispatch(
                    updateUserDetailWhiteSheet({
                      ...currentUser,
                      isWhiteSheet: !currentUser.isWhiteSheet,
                    }),
                  );
                }}
                isChecked={currentUser.isWhiteSheet}
              />
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-white ">Черный список</Text>
              <CheckBox
                onClick={() => {
                  dispatch(
                    updateUserDetailBlackSheet({
                      ...currentUser,
                      isBlackSheet: !currentUser.isBlackSheet,
                    }),
                  );
                }}
                isChecked={currentUser.isBlackSheet}
              />
            </View>
          </View>
          <TextInput
            className="bg-transparent border border-white rounded-lg color-white"
            multiline={true}
            placeholder="Добавьте коментарий"
            placeholderTextColor="#888"
            numberOfLines={10}
            value={currentUser.Comment}
            style={{
              height: 200,
              textAlignVertical: 'top',
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PeopleDetail;
