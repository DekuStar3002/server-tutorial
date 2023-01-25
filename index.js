const http = require('http');

// PORT
const PORT = process.env.PORT || 5000;

// DATABASE
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

// FUNCTION GENERATE NEW NOTE OBJECT
const generateNote = (id, name) => {
  return {
    id: id,
    name: `${name}`,
    isComplete: false,  
  };
};

// RESPONSE GENERATOR
const generateResponse = (status, message, payload) => {
  if(status === 'success')
    return {
      status: status,
      message: message, 
      data: payload,
    };
  return {
    status: status,
    message: message,
    error: payload,
  };
};

// FUNCTION TO GET ALL NOTES
const sendNotesData = ( response ) => {
  try {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    return JSON.stringify(generateResponse('success', 'sucessfully fetched all the notes data', notesState.notes.filter( note => !note.isComplete)));
  } catch ( error ) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    return JSON.stringify(generateResponse('failure', 'internal server error', error.message));
  }
};

// FUNCTION TO STORE NOTES IN ARRAY
const storeNote = ( response, note ) => {
  try {
    notesState.notes.push(generateNote(notesState.currentID + 1, note.name));
    notesState.currentID+=1;
    response.writeHead(201, { 'Content-Type': 'application/json' });
    return JSON.stringify(generateResponse('success', 'data stored succesfully', [ 3 ]));
  } catch ( error ) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    return JSON.stringify(generateResponse('failure', 'internal server error', error.message));
  }
};

// FUNCTION TO GET NOTES BY ID 
const getNotesById = ( response, id ) => {
  try {
    const note = notesState.notes.filter((note) => note.id === id);
    if(note.length === 0 || note[0].isComplete) {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      return JSON.stringify({
        status: 'failure',
        message: `can't find note with id ${id}`,
        data: [],
      });
    }
    response.writeHead(200, { 'Content-Type': 'application/json' });
    return JSON.stringify({
      status: 'success',
      message: `found note with id ${id}`,
      data: [ ...note ],
    });
  } catch ( error ) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    return JSON.stringify(generateResponse('failure', 'internal server error', error.message));
  }
};

// FUNCTION TO UPDATE ALL VALUE OF NOTE
const updateNote = ( response, id, updatedNote ) => {
  try {
    const indexOfNote = notesState.notes.findIndex((note) => note.id === id);
    if(indexOfNote === -1){
      response.writeHead(404, { 'Content-Type': 'application/json' });
      return JSON.stringify({
        status: 'failure',
        message: `can't find note with id ${id}`,
        data: [],
      });
    }
  
    notesState.notes[indexOfNote] = updatedNote;
    response.writeHead(200, { 'Content-Type': 'application/json' });
    return JSON.stringify({
      status: 'success',
      message: `updated note with id ${id}`,
      data: [ updatedNote ],
    });
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    return JSON.stringify(generateResponse('failure', 'internal server error', error.message));
  }
};

// FUNCTION TO UPDATE PARTICULAR FIELD OF NOTE
const patchNode = ( response, id, noteField ) => {
  try{
    const indexOfNote = notesState.notes.findIndex((note) => note.id === id);
    if(indexOfNote === -1){
      response.writeHead(404, { 'Content-Type': 'application/json' });
      return JSON.stringify({
        status: 'failure',
        message: `can't find note with id ${id}`,
        data: [],
      });
    }

    notesState.notes = notesState.notes.map( note => note.id === id ? { ...note, ...noteField } : note );
    response.writeHead(200, { 'Content-Type': 'application/json' });
    return JSON.stringify({
      status: 'success',
      message: `updated note with id ${id}`,
      data: [ notesState.notes[indexOfNote] ],
    });
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    return JSON.stringify(generateResponse('failure', 'internal server error', error.message));
  }
};
// FUNCTION TO DELETE NOTE
const deleteNote = (response, id) => {
  try {
    const indexOfNote = notesState.notes.findIndex((note) => note.id === id);
    if(indexOfNote === -1){
      response.writeHead(404, { 'Content-Type': 'application/json' });
      return JSON.stringify({
        status: 'failure',
        message: `can't find note with id ${id}`,
        data: [],
      });
    }
    notesState.notes[indexOfNote].isComplete = true;
    response.writeHead(200, { 'Content-Type': 'application/json' });
    return JSON.stringify({
      status: 'success',
      message: `deleted note with id ${id}`,
      data: [ notesState.notes[indexOfNote] ],
    });
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    return JSON.stringify(generateResponse('failure', 'internal server error', error.message));
  }
};

// REQUEST FUNCTION
const requestFunction = (req, res) => {
  const pathParam = req.url;

  switch(req.method) {

  case 'GET': {
    if(pathParam === '/tasks')
      res.write(sendNotesData(res));
    if(pathParam.includes('/tasks/'))
      res.write( 
        getNotesById(res,  
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
        res.end(storeNote(res, JSON.parse(body))); 
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
        res.end(updateNote(res, Number(pathParam.substring(pathParam.lastIndexOf('/') + 1)), JSON.parse(body))); 
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
        res.end(patchNode(res, Number(pathParam.substring(pathParam.lastIndexOf('/') + 1)), JSON.parse(body))); 
      });
    }
  }
    break;

  case 'DELETE': {
    if(pathParam.includes('/tasks/')) {
      res.write(deleteNote(res, Number(pathParam.substring(pathParam.lastIndexOf('/') + 1)))); 
    }
    res.end();
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

