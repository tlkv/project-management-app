import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiUserInfo } from '../../data/interfacesA';
import UserInfo from '../../components/UserInfo/UserInfo';
import getAllUsers from '../../api/getAllUsers';
import './StatsPage.scss';
import { AppContext } from '../../App';

export default function StatsPage() {
  const { isAuth, logoutUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState<ApiUserInfo[]>([]);

  const handleCurrentUsers = async () => {
    const res = await getAllUsers(logoutUser);
    setUsers(res);
  };

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    } else {
      handleCurrentUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

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