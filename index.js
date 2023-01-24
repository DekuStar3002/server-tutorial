const http = require('http');

const PORT = process.env.PORT || 5000;

const notesState = {
  currentID: 2,
  notes: [{
    id: 1,
    name: 'note1',
    isComplete: false,
  }, 
  {
    id: 2,
    name: 'note2',
    isComplete: false,
  },]
};

// FUNCTION TO GET ALL NOTES
const sendNotesData = () => {
  return JSON.stringify(notesState.notes);
};

// FUNCTION TO STORE NOTES IN ARRAY
const storeNote = (note) => {
  notesState.notes.push({
    id: notesState.currentID + 1,
    name: `${note.name}`,
    isComplete: false,  
  });

  notesState.currentID+=1;

  return JSON.stringify({
    status: 'success',
    message: 'data stored succesfully',
    data: [ ...notesState.notes ],
  });
};

// FUNCTION TO GET NOTES BY ID 
const getNotesById = (id) => {
  const note = notesState.notes.filter((note) => note.id === id);

  if(note.length === 0)
    return JSON.stringify({
      status: 'failure',
      message: `can't find note with id ${id}`,
      data: [],
    });

  return JSON.stringify({
    status: 'success',
    message: `found note with id ${id}`,
    data: [ ...note ],
  });
};

// FUNCTION TO UPDATE ALL VALUE OF NOTE
const updateNote = ( id, updatedNote ) => {
  const indexOfNote = notesState.notes.findIndex((note) => note.id === id);

  if(indexOfNote === -1)
    return JSON.stringify({
      status: 'failure',
      message: `can't find note with id ${id}`,
      data: [],
    });

  notesState.notes[indexOfNote] = updatedNote;

  return JSON.stringify({
    status: 'success',
    message: `updated note with id ${id}`,
    data: [ updatedNote ],
  });
};

// FUNCTION TO UPDATE PARTICULAR FIELD OF NOTE
const patchNode = ( id, noteField ) => {
  const indexOfNote = notesState.notes.findIndex((note) => note.id === id);

  if(indexOfNote === -1)
    return JSON.stringify({
      status: 'failure',
      message: `can't find note with id ${id}`,
      data: [],
    });

  notesState.notes = notesState.notes.map( note => note.id === id ? { ...note, ...noteField } : note );

  return JSON.stringify({
    status: 'success',
    message: `updated note with id ${id}`,
    data: [ notesState.notes[indexOfNote] ],
  });
};

// REQUEST FUNCTION
const requestFunction = (req, res) => {
  const pathParam = req.url;

  switch(req.method) {

  case 'GET': {
    if(pathParam === '/tasks')
      res.write(sendNotesData());
    if(pathParam.includes('/tasks/'))
      res.write( 
        getNotesById( 
          Number( 
            pathParam.substring( 
              pathParam.lastIndexOf('/') + 1
            )
          )
        )
      );
    res.end();
      
  } 
    break;

  case 'POST': {
    if(pathParam === '/tasks') {
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

  case 'PUT': {
    if(pathParam.includes('/tasks/')) {
      let body = '';
      req.on('data', (chunk) => { 
        body += chunk.toString(); 
      });
      req.on('end', () => { 
        res.end(updateNote(Number(pathParam.substring(pathParam.lastIndexOf('/') + 1)), JSON.parse(body))); 
      });
    }
  }
    break;

  case 'PATCH': {
    if(pathParam.includes('/tasks/')) {
      let body = '';
      req.on('data', (chunk) => { 
        body += chunk.toString(); 
      });
      req.on('end', () => { 
        res.end(patchNode(Number(pathParam.substring(pathParam.lastIndexOf('/') + 1)), JSON.parse(body))); 
      });
    }
  }
    break;

  default: {
    res.write(JSON.stringify({
      status: 'failure',
      message: 'http method not allowed',
    }));
    res.end();
  }

  }
};

const app = http.createServer(requestFunction);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

