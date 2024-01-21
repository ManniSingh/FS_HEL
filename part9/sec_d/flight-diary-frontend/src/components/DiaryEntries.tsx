import { DiaryEntry } from '../Types';

const Entries =({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      <ul>
        {diaries.map((entry, index) => (
          <li key={index}>
            <p>Date: {entry.date}</p>
            <p>Weather: {entry.weather}</p>
            <p>Visibility: {entry.visibility}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Entries;
