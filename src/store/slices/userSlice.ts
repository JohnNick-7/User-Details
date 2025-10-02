import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import restService from '../../components/service/restService.ts';
import { toast } from 'react-toastify';
import { hideLoader, showLoader } from './loaderSlice.ts';
// User interface based on your API response
export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  LastName?: string; // Keep both for compatibility
  email: string;
  imageLink: string;
}

const BASE_URL = "https://68dd6f87d7b591b4b78c729b.mockapi.io/api";

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoader());
      const response = await restService.get('/users', BASE_URL);
      dispatch(hideLoader());
      return response.data as User[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoader());
      await restService.delete(`/users/${id}`, BASE_URL);
      dispatch(hideLoader());
      toast.success('User deleted successfully');
      return id;
    } catch (error: any) {
      dispatch(hideLoader());
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data: User, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoader()); 
      const res = await restService.put(`/users/${data.id}`, data, BASE_URL);
      dispatch(hideLoader());
      if (res.status === 200) {
        toast.success('User updated successfully');
        return res.data;
      } else {
        dispatch(hideLoader());
        return rejectWithValue(res.data?.message || 'Failed to update user');
      }
    } catch (error: any) {
      dispatch(hideLoader());
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (data: User, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoader());
      const res = await restService.post('/users', data, BASE_URL);
      dispatch(hideLoader());
      if (res.status === 201) {
        toast.success('User created successfully');
        return res.data;
      } else {
        dispatch(hideLoader());
        return rejectWithValue(res.data?.message || 'Failed to create user');
      }

    } catch (error: any) {
      dispatch(hideLoader());
      return rejectWithValue(error.response?.data?.message || 'Failed to create user');
    }
  }
);

interface UserState {
  allUsers: User[];
  filteredUsers: User[];
  displayedUsers: User[];
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  // Search
  searchQuery: string;
  // Loading states
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  allUsers: [],
  filteredUsers: [],
  displayedUsers: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 0,
  searchQuery: '',
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Search functionality
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to first page when searching

      // Filter users based on search query
      if (action.payload.trim() === '') {
        state.filteredUsers = state.allUsers;
      } else {
        const query = action.payload.toLowerCase();
        state.filteredUsers = state.allUsers.filter(user =>
          (user.firstName || '').toLowerCase().includes(query) ||
          (user.lastName || '').toLowerCase().includes(query) ||
          (user.LastName || '').toLowerCase().includes(query) ||
          (user.email || '').toLowerCase().includes(query)
        );
      }

      // Update pagination
      state.totalPages = Math.ceil(state.filteredUsers.length / state.itemsPerPage);

      // Update displayed users
      const startIndex = (state.currentPage - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      state.displayedUsers = state.filteredUsers.slice(startIndex, endIndex);
    },

    // Pagination functionality
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;

      // Update displayed users based on current page
      const startIndex = (action.payload - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      state.displayedUsers = state.filteredUsers.slice(startIndex, endIndex);
    },

    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page

      // Recalculate pagination
      state.totalPages = Math.ceil(state.filteredUsers.length / action.payload);

      // Update displayed users
      const startIndex = 0;
      const endIndex = action.payload;
      state.displayedUsers = state.filteredUsers.slice(startIndex, endIndex);
    },

    // Clear search and reset
    clearSearch: (state) => {
      state.searchQuery = '';
      state.filteredUsers = state.allUsers;
      state.currentPage = 1;
      state.totalPages = Math.ceil(state.allUsers.length / state.itemsPerPage);

      const startIndex = 0;
      const endIndex = state.itemsPerPage;
      state.displayedUsers = state.filteredUsers.slice(startIndex, endIndex);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
        state.filteredUsers = action.payload;

        // Calculate pagination
        state.totalPages = Math.ceil(action.payload.length / state.itemsPerPage);

        // Set initial displayed users (first page)
        const endIndex = Math.min(state.itemsPerPage, action.payload.length);
        state.displayedUsers = action.payload.slice(0, endIndex);

        state.currentPage = 1;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string || 'Failed to fetch users');
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.allUsers = state.allUsers.filter(user => user.id !== action.payload);
        state.filteredUsers = state.filteredUsers.filter(user => user.id !== action.payload);
        state.displayedUsers = state.displayedUsers.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        toast.error(action.payload as string || 'Failed to delete user');
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.allUsers.push(action.payload);
        state.filteredUsers.push(action.payload);
        // Recalculate pagination after adding
        state.totalPages = Math.ceil(state.filteredUsers.length / state.itemsPerPage);
      })
      .addCase(createUser.rejected, (state, action) => {
        toast.error(action.payload as string || 'Failed to create user');
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.allUsers.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.allUsers[index] = action.payload;
          state.filteredUsers[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        toast.error(action.payload as string || 'Failed to update user');
      });
  },
});

export const {
  setSearchQuery,
  setCurrentPage,
  setItemsPerPage,
  clearSearch
} = userSlice.actions;

export default userSlice.reducer;
