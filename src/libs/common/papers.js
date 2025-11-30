import {loadJSONFile} from "../utility";

export async function getPaper(paperId) {
  // !!! UNCOMMENT ME BEFORE PRODUCTION:
  // const response = await fetch(`https://uconfy.com/papers/api/papers/${paperId}`);
  // const paper = await response.json();
  // <--- TILL HERE

  // !!! COMMENT ME BEFORE PRODUCTION:
  const cachedPapers = loadJSONFile('papers_cached.json');
  const cachedFilteredPapers = cachedPapers.filter(paper => paper.id === parseInt(paperId));
  const paper = cachedFilteredPapers.length > 0 ? cachedFilteredPapers[0] : {};
  // <--- TILL HERE

  // Update papers from 'papers_update.json'
  if (paper && paper.id) {
    const paperUpdates = loadJSONFile('papers_update.json')
      .filter(update => update.id === paper.id);
    if (paperUpdates.length > 0) {
      Object.assign(paper, paperUpdates[0]);
    }
  }

  // Authors are now just strings, convert them to objects:
  if (paper && paper.authors) {
    paper.authors = paper.authors.map(a => ({name: a}));
  }

  return paper;
}
