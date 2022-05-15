import s from './UserInfo.module.scss';

export default function UserInfo({ name, login }: { name: string; login: string }) {
  return (
    <div className={s.ProfDescr}>
      <div className={s.ProfDescrItem}>
        <img src="./assets/img/userIcon.png" alt="user icon" className={s.UserImg} />
      </div>
      <div className={s.ProfDescrItem}>
        <div className={s.ProfDescrText}>
          <span>Name:</span> {name}
        </div>
        <div className={s.ProfDescrText}>
          <span>Login:</span> {login}
        </div>
      </div>
    </div>
  );
}
