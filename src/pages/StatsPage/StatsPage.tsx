import { useEffect, useState } from 'react';
import { ApiUserInfo } from '../../data/interfacesA';
import UserInfo from '../../components/UserInfo/UserInfo';
import getAllUsers from '../../api/getAllUsers';
import './StatsPage.scss';

export default function StatsPage() {
  const [users, setUsers] = useState<ApiUserInfo[]>([]);

  const handleCurrentUsers = async () => {
    const res = await getAllUsers();
    setUsers(res);
  };

  useEffect(() => {
    handleCurrentUsers();
  }, []);

  return (
    <div className="narrow-container">
      <h1 className="title">Statistics</h1>
      <h2 className="title">Registered Users</h2>
      <div className="stats-container">
        {users.map((i) => (
          <UserInfo name={i.name} login={i.login} id={i.id} key={i.id} />
        ))}
      </div>
    </div>
  );
}
