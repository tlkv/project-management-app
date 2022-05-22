import BoardList from '../../components/BoardList/BoardList';
import './MainPage.scss';

function MainPage() {
  return (
    <div className="narrow-container">
      <h1 className="board__title">YOUR WORKSPACE</h1>
      <BoardList />
    </div>
  );
}

export default MainPage;
