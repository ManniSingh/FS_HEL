import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import DiaryForm from './components/DiaryForm';
import Entries from './components/DiaryEntries';
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './Types';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: '',
    weather: Weather.Rainy,
    visibility: Visibility.Great,
    comment: '',
  });

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    axios
      .post('http://localhost:3000/api/diaries', newDiary)
      .then((response) => {
        console.log(response.data);
        setDiaries(diaries.concat(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    let value: string | Weather | Visibility = event.target.value;
    if (name === 'weather') {
      value = value as Weather;
    } else if (name === 'visibility') {
      value = value as Visibility;
    }
    setNewDiary({
      ...newDiary,
      [name]: value,
    });
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then((response) => {
      //console.log(response.data);
      setDiaries(response.data as DiaryEntry[]);
    });
  }, [newDiary]);

  return (
    <div className="App">
      <DiaryForm
        newDiary={newDiary}
        handleChange={handleChange}
        diaryCreation={diaryCreation}
      />
      <Entries diaries={diaries} />
    </div>
  );
}

export default App;
