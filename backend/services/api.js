const BASE_URL = 'http://localhost:3000'; // ваш json-server

export const api = {
  getUsers: async () => {
    const res = await fetch(`${BASE_URL}/users`);
    return res.json();
  },

  registerUser: async (user) => {
    const res = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return res.json();
  },

  loginUser: async (email, password) => {
    const users = await api.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Невірний email або пароль');
    return user;
  }
};