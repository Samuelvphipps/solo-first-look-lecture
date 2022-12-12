const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
            //same as req.user on the server
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

const petsReducer = (state =[], action) => {
    switch (action.type){
        case 'SET_PETS':
            return action.payload;
    }
    return state;
}

// user will be on the redux state at:
// state.user
export default petsReducer;
