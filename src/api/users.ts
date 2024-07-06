import userData from './users.json'

export function loadUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userData);
    }, 800); // Delay for 2 seconds
  });
}