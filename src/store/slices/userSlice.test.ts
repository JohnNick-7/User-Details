jest.mock('../../components/service/restService.ts', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('./loaderSlice.ts', () => ({
    showLoader: jest.fn(() => ({ type: 'loader/show' })),
    hideLoader: jest.fn(() => ({ type: 'loader/hide' })),
}));



import reducer, {
    setSearchQuery,
    setCurrentPage,
    clearSearch,
    fetchUsers,
    deleteUser,
    createUser,
    updateUser,
} from './userSlice';
import { toast } from 'react-toastify';
import restService from '../../components/service/restService.ts';

const mockUser = { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@test.com', imageLink: 'img.jpg' };

describe('userSlice reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual({
            allUsers: [],
            filteredUsers: [],
            displayedUsers: [],
            currentPage: 1,
            itemsPerPage: 10,
            totalPages: 0,
            searchQuery: '',
            loading: false,
            error: null,
        });
    });

    it('should handle setSearchQuery', () => {
        const prevState = { ...reducer(undefined, { type: '' }), allUsers: [mockUser] };
        const newState = reducer(prevState, setSearchQuery('john'));
        expect(newState.filteredUsers.length).toBe(1);
    });

    it('should handle setCurrentPage', () => {
        const prevState = { ...reducer(undefined, { type: '' }), allUsers: [mockUser], filteredUsers: [mockUser] };
        const newState = reducer(prevState, setCurrentPage(1));
        expect(newState.displayedUsers).toEqual([mockUser]);
    });

    it('should clear search', () => {
        const prevState = { ...reducer(undefined, { type: '' }), allUsers: [mockUser], searchQuery: 'john' };
        const newState = reducer(prevState, clearSearch());
        expect(newState.searchQuery).toBe('');
    });
});

describe('userSlice thunks', () => {
    const dispatch: any = jest.fn((action: any) => {
        if (typeof action === 'function') {
            return action(dispatch, getState, undefined);
        }
        return action;
    });

    const getState = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetchUsers success', async () => {
        (restService.get as jest.Mock).mockResolvedValueOnce({ data: [mockUser] });

        await fetchUsers()(dispatch, getState, undefined);

        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchUsers.pending.type }));
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchUsers.fulfilled.type, payload: [mockUser] }));
    });

    it('fetchUsers rejected should call toast.error', () => {
        const prevState = reducer(undefined, { type: '' });
        const action = { type: fetchUsers.rejected.type, payload: 'Error' };
        const newState = reducer(prevState, action);

        expect(newState.error).toBe('Error');
        expect(toast.error).toHaveBeenCalledWith('Error');
    });


    it('createUser success', async () => {
        (restService.post as jest.Mock).mockResolvedValueOnce({ status: 201, data: mockUser });

        await createUser(mockUser)(dispatch, getState, undefined);

        expect(toast.success).toHaveBeenCalledWith('User created successfully');
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: createUser.fulfilled.type, payload: mockUser }));
    });

    it('deleteUser success', async () => {
        (restService.delete as jest.Mock).mockResolvedValueOnce({});
        await deleteUser('1')(dispatch, getState, undefined);
        expect(toast.success).toHaveBeenCalledWith('User deleted successfully');
    });

    it('updateUser success', async () => {
        (restService.put as jest.Mock).mockResolvedValueOnce({ status: 200, data: mockUser });
        await updateUser(mockUser)(dispatch, getState, undefined);
        expect(toast.success).toHaveBeenCalledWith('User updated successfully');
    });
});
