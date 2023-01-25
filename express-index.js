const express = require('express');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5050;

// INITIAL DB
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

// NOTE GENERATOR
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
    response.statusCode = 200;
    response.set('Content-Type', 'application/json');
    return generateResponse('success', 'sucessfully fetched all the notes data', notesState.notes.filter( note => !note.isComplete));
  } catch ( error ) {
    response.statusCode = 500;
    response.set('Content-Type', 'application/json');
    return generateResponse('failure', 'internal server error', error.message);
  }
};
  
// FUNCTION TO STORE NOTES IN ARRAY
const storeNote = ( response, note ) => {
  try {
    notesState.notes.push(generateNote(notesState.currentID + 1, note.name));
    notesState.currentID+=1;
    response.statusCode = 201;
    response.set('Content-Type', 'application/json');
    return generateResponse('success', 'data stored succesfully', [ ...notesState.notes ]);
  } catch ( error ) {
    response.statusCode = 500;
    response.set('Content-Type', 'application/json');
    return generateResponse('failure', 'internal server error', error.message);
  }
};
  
// FUNCTION TO GET NOTES BY ID 
const getNotesById = ( response, id ) => {
  try {
    const note = notesState.notes.filter((note) => note.id === id);
    if(note.length === 0 || note[0].isComplete) {
      response.statusCode = 404;
      response.set('Content-Type', 'application/json');
      return {
        status: 'failure',
        message: `can't find note with id ${id}`,
        data: [],
      };
    }
    response.statusCode = 200;
    response.set('Content-Type', 'application/json');
    return {
      status: 'success',
      message: `found note with id ${id}`,
      data: [ ...note ],
    };
  } catch ( error ) {
    response.statusCode = 500;
    response.set('Content-Type', 'application/json');
    return generateResponse('failure', 'internal server error', error.message);
  }
};
  
// FUNCTION TO UPDATE ALL VALUE OF NOTE
const updateNote = ( response, id, updatedNote ) => {
  try {
    const indexOfNote = notesState.notes.findIndex((note) => note.id === id);
    if(indexOfNote === -1){
      response.statusCode = 404;
      response.set('Content-Type', 'application/json');
      return {
        status: 'failure',
        message: `can't find note with id ${id}`,
        data: [],
      };
    }
    
    notesState.notes[indexOfNote] = updatedNote;
    response.statusCode = 200;
    response.set('Content-Type', 'application/json');
    return {
      status: 'success',
      message: `updated note with id ${id}`,
      data: [ updatedNote ],
    };
  } catch (error) {
    response.statusCode = 500;
    response.set('Content-Type', 'application/json');
    return generateResponse('failure', 'internal server error', error.message);
  }
};
  
// FUNCTION TO UPDATE PARTICULAR FIELD OF NOTE
const patchNode = ( response, id, noteField ) => {
  try{
    const indexOfNote = notesState.notes.findIndex((note) => note.id === id);
    if(indexOfNote === -1){
      response.statusCode = 404;
      response.set('Content-Type', 'application/json');
      return {
        status: 'failure',
        message: `can't find note with id ${id}`,
        data: [],
      };
    }
  
    notesState.notes = notesState.notes.map( note => note.id === id ? { ...note, ...noteField } : note );
    response.statusCode = 200;
    response.set('Content-Type', 'application/json');
    return {
      status: 'success',
      message: `updated note with id ${id}`,
      data: [ notesState.notes[indexOfNote] ],
    };
  } catch (error) {
    response.statusCode = 500;
    response.set('Content-Type', 'application/json');
    return generateResponse('failure', 'internal server error', error.message);
  }
};
  // FUNCTION TO DELETE NOTE
const deleteNote = (response, id) => {
  try {
    const indexOfNote = notesState.notes.findIndex((note) => note.id === id);
    if(indexOfNote === -1){
      response.statusCode = 404;
      response.set('Content-Type', 'application/json');
      return {
        status: 'failure',
        message: `can't find note with id ${id}`,
        data: [],
      };
    }
    notesState.notes[indexOfNote].isComplete = true;
    response.statusCode = 200;
    response.set('Content-Type', 'application/json');
    return {
      status: 'success',
      message: `deleted note with id ${id}`,
      data: [ notesState.notes[indexOfNote] ],
    };
  } catch (error) {
    response.statusCode = 500;
    response.set('Content-Type', 'application/json');
    return generateResponse('failure', 'internal server error', error.message);
  }
};

app.route('/tasks')
  .get((req, res) => {
    res.send(sendNotesData(res));
  })
  .post((req, res) => {
    const body = req.body;
    res.send(storeNote(res, body));
  });

app.route('/tasks/:id')
  .get((req, res) => {
    const id = Number(req.params.id);
    res.send(getNotesById(res, id));
  })
  .put((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    res.send(updateNote(res, id, body));
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    res.send(patchNode(res, id, body));
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    res.send(deleteNote(res, id));
  });

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});