import {loadJSONFile} from "./utility";

export const getDeadlines = () => {
  const deadlinesList = loadJSONFile('deadlines.json') || [];

  // Group and sort deadlines:
  deadlinesList.sort((a, b) => a.date < b.date || (a.date === b.date && a['important'] && !b['important']));
  let groupedDeadlines = [];
  for (const deadline of deadlinesList) {
    const lastItem = groupedDeadlines ? groupedDeadlines[groupedDeadlines.length - 1] : undefined;
    if (lastItem && lastItem.date === deadline.date) {
      lastItem.events.push({
        event: deadline.event,
        important: !!deadline['important']
      });
    } else {
      groupedDeadlines.push({
        date: deadline.date,
        events: [{
          event: deadline.event,
          important: !!deadline['important']
        }]
      })
    }
  }

  return groupedDeadlines;
}
