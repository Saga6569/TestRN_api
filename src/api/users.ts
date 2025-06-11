import axios from 'axios';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface UserDetail {
  createdAt: string;
  City: string;
  Description: string;
  Email: string;
  Color: string;
  id: string;
  listId: string;
  Comment: string;
  isWhiteSheet: boolean;
  isBlackSheet: boolean;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(
      'https://6499a30479fbe9bcf83fa986.mockapi.io/list',
    );

    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
};

export const fetchUserDetail = async (userId: string): Promise<UserDetail> => {
  try {
    const response = await axios.get<UserDetail>(
      `https://6499a30479fbe9bcf83fa986.mockapi.io/user/${userId}`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    console.error('Ошибка при получении информации о пользователе:', error);
    throw error;
  }
};
