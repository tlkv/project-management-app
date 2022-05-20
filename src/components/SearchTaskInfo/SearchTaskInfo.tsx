import { TaskResponse } from '../../data/interfacesV';
import './SearchTaskInfo.scss';

export default function SearchTaskInfo({ title, done, description }: TaskResponse) {
  return (
    <div className="search-task-info">
      <div className="search-task-field">{title}</div>
      <div className="search-task-field">{description}</div>
      <div className="search-task-field">{done ? 'done' : 'not done'}</div>
    </div>
  );
}
