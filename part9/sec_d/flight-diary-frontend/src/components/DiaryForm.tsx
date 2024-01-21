import React from 'react';
import { Weather, Visibility, NewDiaryEntry } from '../Types';

interface DiaryFormProps {
  newDiary: NewDiaryEntry;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  diaryCreation: (event: React.SyntheticEvent) => void;
}

const DiaryForm: React.FC<DiaryFormProps> = ({ newDiary, handleChange, diaryCreation }) => {
  return (
    <form onSubmit={diaryCreation}>
      {/* Date Input */}
      <div>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={newDiary.date}
            onChange={handleChange}
          />
        </label>
      </div>
      {/* Weather Radio Buttons */}
      <div>
        <label>
          Weather:
          {Object.values(Weather).map((weatherOption) => (
            <label key={weatherOption}>
              <input
                type="radio"
                name="weather"
                value={weatherOption}
                checked={newDiary.weather === weatherOption}
                onChange={handleChange}
              />
              {weatherOption}
            </label>
          ))}
        </label>
      </div>
      {/* Visibility Radio Buttons */}
      <div>
        <label>
          Visibility:
          {Object.values(Visibility).map((visibilityOption) => (
            <label key={visibilityOption}>
              <input
                type="radio"
                name="visibility"
                value={visibilityOption}
                checked={newDiary.visibility === visibilityOption}
                onChange={handleChange}
              />
              {visibilityOption}
            </label>
          ))}
        </label>
      </div>
      {/* Comment Input */}
      <label>
        Comment:
        <input
          type="text"
          name="comment"
          value={newDiary.comment}
          onChange={handleChange}
        />
      </label>
      <br />
      {/* Submit Button */}
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default DiaryForm;
