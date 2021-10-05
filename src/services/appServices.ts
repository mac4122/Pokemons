export const fetchData = (url: string) => 
  fetch(url)
  .then((res: Response) => res.json())
  .then(results => results)
  .catch(err => { 
    console.log('view details err', err);
    return {};
  });