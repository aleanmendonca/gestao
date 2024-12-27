import { create } from 'zustand';
    import { persist } from 'zustand/middleware';

    type UserRole = 'admin' | 'employee';

    interface User {
      id: string;
      name: string;
      email: string;
      photo: string | null;
      planId: string | null;
      role: UserRole;
    }

    interface UserState {
      currentUser: User | null;
      users: User[];
      setCurrentUser: (user: User | null) => void;
      addUser: (user: Omit<User, 'id'>) => void;
      updateUser: (id: string, user: Partial<User>) => void;
      deleteUser: (id: string) => void;
    }

    export const useUserStore = create<UserState>()(
      persist(
        (set) => ({
          currentUser: null,
          users: [
            {
              id: 'user-1',
              name: 'Admin User',
              email: 'aleanmendonca@gmail.com',
              photo: null,
              planId: null,
              role: 'admin',
            },
          ],
          setCurrentUser: (user) => set({ currentUser: user }),
          addUser: (userData) => set((state) => ({
            users: [...state.users, { ...userData, id: crypto.randomUUID() }],
          })),
          updateUser: (id, updatedData) => set((state) => ({
            users: state.users.map((user) =>
              user.id === id ? { ...user, ...updatedData } : user
            ),
          })),
          deleteUser: (id) => set((state) => ({
            users: state.users.filter((user) => user.id !== id),
          })),
        }),
        {
          name: 'user-storage',
        }
      )
    );
