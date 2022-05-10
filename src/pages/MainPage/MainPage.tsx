import BoardList from '../../components/BoardList/BoardList';
import CreateBoardBar from '../../components/CreateBoardBar/CreateBoardBar';

function MainPage() {
  return (
    <div className="narrow-container">
      <CreateBoardBar />
      <BoardList />
    </div>
  );
}

export default MainPage;
