import React, {useEffect, useState} from 'react';
import axios from 'axios';

interface UserInfo {
  name: string;
  email: string;
  company: {
    name: string;
  };
}

const UserProfile = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users/5')
      .then((response) => {
        const {name, email, company} = response.data
        setUser({name, email, company})
        setError(null)
        console.log('Response obj:', response.data)
      })
      .catch((err) => {
        setError(err.message || 'Помилка запиту. Спробуйте оновити сторінку.')
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, []);

  return (
    <div>
      <h1>Тестування асинхронної логіки React-компонентів з використанням Vitest та React Testing Library</h1>
      {loading && <p>Завантаження...</p>}
      {error && <p style={{color: 'red'}}>Помилка: {error}</p>}
      {user && (
        <div>
          <h3>Персональні дані користувача (User Profile)</h3>
          <p>Ім'я: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Компанія: {user.company.name}</p>
        </div>
      )}
    </div>
  )
}

export default UserProfile