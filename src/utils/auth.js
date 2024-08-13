export function loginUser(username) {
  localStorage.setItem("user", username);
}

export function logoutUser() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  return localStorage.getItem("user");
}

export function isAuthenticated() {
  return !!getCurrentUser();
}
