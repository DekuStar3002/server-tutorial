const http = require('http');

const PORT = process.env.PORT || 5000;
let currentIndex = 3;
const noteStore = [{
  id: 1,
  name: 'note1',
  isComplete: false,
}, 
{
  id: 2,
  name: 'note2',
  isComplete: false,
},];

// FUNCTION TO GET ALL NOTES
const sendGetData = () => {
  return JSON.stringify(noteStore);
};

// FUNCTION TO STORE NOTES IN ARRAY
const storeNote = (note) => {
  noteStore.push({
    id: currentIndex,
    name: `${note.name}`,
    isComplete: false,  
  });
  currentIndex+=1;
  return JSON.stringify({
    status: 'success',
    message: 'data stored succesfully',
    data: [ ...noteStore ]
  });
};

//FUNCTION TO GET NOTES BY ID 
const getNotesById = (id) => {
  const note = noteStore.filter((note) => note.id === id);
  if(note.length === 0)
    return {
      status: 'failure',
      message: `can't find note with id ${id}`,
      data: [],
    };
  return {
    status: 'success',
    message: `found note with id ${id}`,
    data: [ ...note ],
  };
};
const requestFunction = (req, res) => {
  switch(req.method) {
  case 'GET': {
    if(req.url === '/tasks')
      res.write(sendGetData());
    if(req.url === '/task/')

    res.end();
      
  } 
    break;
  case 'POST': {
    if(req.url === '/tasks') {
      let body = '';
      req.on('data', (chunk) => { 
        body += chunk.toString(); 
      });
      req.on('end', () => { 
        res.end(storeNote(JSON.parse(body))); 
      });
    }
  }
    break;
  }
};
const app = http.createServer(requestFunction);
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

