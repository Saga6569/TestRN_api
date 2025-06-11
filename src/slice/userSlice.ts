import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {User, UserDetail, fetchUsers, fetchUserDetail} from '../api/users';

export interface State {
  users: User[];
  usersDetail: UserDetail[];
}

const initialState: State = {
  users: [],
  usersDetail: [],
};

export const fetchUserThunk = createAsyncThunk('state/fetchUser', async () => {
  const users = await fetchUsers();
  return users; // возвращаем массив
});

export const fetchUserDetailThunk = createAsyncThunk(
  'state/fetchUserDetail',
  async (userId: string) => {
    const userDetail = await fetchUserDetail(userId);
    return userDetail;
  },
);

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    // addNewUser: (state, id) => {},
    findUser: (state, action: PayloadAction<string>) => {
      const user = state.usersDetail.find(u => u.id === action.payload);
      if (user) {
        console.log(user);
      } else {
        console.log('user not found');
      }
    },
    updateUserDetailWhiteSheet: (state, action: PayloadAction<UserDetail>) => {
      const user = state.usersDetail.find(u => u.id === action.payload.id);
      if (user) {
        user.isWhiteSheet = action.payload.isWhiteSheet;
      }
    },
    updateUserDetailBlackSheet: (state, action: PayloadAction<UserDetail>) => {
      const user = state.usersDetail.find(u => u.id === action.payload.id);
      if (user) {
        user.isBlackSheet = action.payload.isBlackSheet;
      }
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchUserDetailThunk.fulfilled, (state, action) => {
      state.usersDetail.push(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const {findUser, updateUserDetailWhiteSheet, updateUserDetailBlackSheet} =
  stateSlice.actions;

export default stateSlice.reducer;
