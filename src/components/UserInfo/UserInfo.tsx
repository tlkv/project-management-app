import { ApiUserInfo } from '../../data/interfaces';
import s from './UserInfo.module.scss';

export default function UserInfo({ name, login }: ApiUserInfo) {
  return (
    <div className={s.ProfDescr}>
      <div className={s.ProfDescrItem}>
        <i className="fa-solid fa-user-large user-big" />
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
