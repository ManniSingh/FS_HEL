export enum Weather {
    Rainy = 'rainy',
    Sunny = 'sunny',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
}
  
export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
}
  
export interface DiaryEntry {
    id: number;
    date: string;
    visibility: Visibility;
    weather: Weather;
    comment: string;
  }
  
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
  
export type CuratedDiaryEntry = Omit<DiaryEntry, 'comment'>;