import json
import os
import requests
from tqdm import tqdm


PROGRAM_FILE = os.path.join('data', 'program.json')
PAPERS_CACHE_FILE = os.path.join('data', 'papers_cached.json')

def load_papers_ids():
    paper_ids = []
    with open(PROGRAM_FILE) as json_file:
        data = json.load(json_file)
        for session in data['sessions']:
            for lecture in session.get('lectures', []):
                if 'paperId' in lecture:
                    paper_ids.append(lecture['paperId'])
    return paper_ids


def load_papers_data(paper_ids):
    papers = []
    for paper_id in tqdm(paper_ids):
        if paper_id != "vid":
            url = f'https://uconfy.com/papers/api/papers/{paper_id}'
            response = requests.get(url)
            papers.append(response.json())
    return papers


def write_papers(papers):
    with open(PAPERS_CACHE_FILE, 'w') as json_file:
        json.dump(papers, json_file)


if __name__ == '__main__':
    print('* Loading papers IDs')
    ids = load_papers_ids()
    print(f'  -> {len(ids)} IDs loaded')

    print('* Loading papers data')
    data = load_papers_data(ids)
    print(f'  -> {len(data)} papers loaded')

    print('* Writing papers cache')
    write_papers(data)
    print('= Finished')
