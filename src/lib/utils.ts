import  dayjs from 'dayjs'
import { DEPARTMENTS, startDay } from './constants';



export function getDayNumber() : number {
  const now = dayjs();
  const elapsedDays = now.diff(startDay, 'day') + 1
  return elapsedDays
}

export function getScore(action: Action) {
  let score: number;
  switch (action.code) {
    case 'non-accueil':
      score = 10;
      break;
    case 'casserolade':
      score = 5;
      break;
  }
  if (action.target === 'ministre-regalien') {
    score *= 2;
  }
  if (action.target === 'plusieurs-ministres') {
    score *= 2;
  }
  if (action.target === 'PR') {
    score *= 4;
  }
  return score;
}

export function generateLeaderboard(jsonData: string) {
  const data = JSON.parse(jsonData) as DayData[];
  console.log(data);
  const departmentsResults: DepartmentResult = {};
  data.forEach((dayData) => {
    dayData.evenements.forEach((evenement) => {
      console.log(evenement);
      evenement.actions.forEach((action) => {
        departmentsResults[evenement.dept] =
          (departmentsResults[evenement.dept] || 0) + getScore(action);
      });
    });
  });
  return Object.entries(departmentsResults).sort((d1, d2) => {
    return d2[1] - d1[1];
  });
}

export function getDepartmentName(code: string): string {
  console.log(code);
  const dept = DEPARTMENTS.find((elt) => elt.code === code);
  if (!dept) {
    console.error(`erreur dans les données, le département ${code} est inconnu`);
  }
  return dept? dept.nom : '(inconnu)';
}
