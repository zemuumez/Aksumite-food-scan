export function useAuth() {
  return {
    user: { id: 1, name: "Mock User", role: "admin" },
    isLoading: false,
    error: null,
    isAuthenticated: true,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
    hasRole: () => true,
    hasPermission: () => true,
    canAccess: () => true,
    isLoggingIn: false,
    isRegistering: false,
    isLoggingOut: false,
  };
}
