import { User } from '@/types/movie';

const AUTH_STORAGE_KEY = 'talent-growth-auth';
const USERS_STORAGE_KEY = 'talent-growth-users';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Get stored users
const getStoredUsers = (): User[] => {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

// Store users
const storeUsers = (users: User[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Get auth state
export const getAuthState = (): AuthState => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const user = JSON.parse(stored);
      return { user, isAuthenticated: true };
    }
  } catch {
    // Invalid stored data
  }
  return { user: null, isAuthenticated: false };
};

// Store auth state
const storeAuthState = (user: User): void => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
};

// Clear auth state
const clearAuthState = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

// Register user
export const registerUser = async (email: string, password: string, name: string): Promise<User> => {
  const users = getStoredUsers();
  
  // Check if user already exists
  if (users.find(user => user.email === email)) {
    throw new Error('User already exists with this email');
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    favoriteMovies: [],
  };
  
  // Store user
  users.push(newUser);
  storeUsers(users);
  storeAuthState(newUser);
  
  return newUser;
};

// Login user
export const loginUser = async (email: string, password: string): Promise<User> => {
  const users = getStoredUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Store auth state
  storeAuthState(user);
  
  return user;
};

// Logout user
export const logoutUser = (): void => {
  clearAuthState();
};

// Update user favorites
export const updateUserFavorites = (movieId: number): User => {
  const { user } = getAuthState();
  if (!user) throw new Error('User not authenticated');
  
  const users = getStoredUsers();
  const userIndex = users.findIndex(u => u.id === user.id);
  
  if (userIndex === -1) throw new Error('User not found');
  
  // Toggle favorite
  const favoriteIndex = user.favoriteMovies.indexOf(movieId);
  if (favoriteIndex === -1) {
    user.favoriteMovies.push(movieId);
  } else {
    user.favoriteMovies.splice(favoriteIndex, 1);
  }
  
  // Update stored data
  users[userIndex] = user;
  storeUsers(users);
  storeAuthState(user);
  
  return user;
};