import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import BoardList from '../../components/BoardList/BoardList';

function MainPage() {
  const { isAuth } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('pmapp34-token')) {
      navigate('/welcome');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className="narrow-container">
      <h1>YOUR WORKSPACE</h1>
      <BoardList />
    </div>
  );
}

export default MainPage;
