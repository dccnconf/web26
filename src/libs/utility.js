import path from "path";
import * as fs from "fs";
import matter from "gray-matter";

export const getRootPath = (rootPath) => {
  return rootPath || path.join(process.cwd(), 'data');
}

export const loadJSONFile = (filename, rootPath) => {
  rootPath = getRootPath(rootPath);
  const fullPath = path.join(rootPath, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  try {
    return JSON.parse(fileContents);
  } catch(err) {
    console.log('Error parsing deadlines: ', err);
    return null;
  }
}

export const loadFileNameIDs = (dir, rootPath) => {
  return fs.readdirSync(path.join(getRootPath(rootPath), dir))
    .map(fileName => fileName.replace(/\.md$/, ''));
}


export const loadMarkdown = (baseName, dir, rootPath) => {
  const filePath = path.join(getRootPath(), dir, `${baseName}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return matter(fileContents);
}
