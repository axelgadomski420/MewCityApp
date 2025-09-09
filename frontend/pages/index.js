import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState(null);

  const register = async () => {
    await axios.post('http://localhost:3000/user/register', { email, password });
    alert('Registered');
  };

  const login = async () => {
    const res = await axios.post('http://localhost:3000/user/login', { email, password });
    setToken(res.data.access_token);
  };

  const refresh = async () => {
    const res = await axios.post('http://localhost:3000/auth/refresh', { refresh_token: token });
    setToken(res.data.access_token);
  };

  const getProfile = async () => {
    const res = await axios.get('http://localhost:3000/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProfile(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Auth Test</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={refresh}>Refresh Token</button>
      <button onClick={getProfile}>Get Profile</button>
      {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}
    </div>
  );
}
