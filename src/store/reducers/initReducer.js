const initState = {
  data: null
}

const initReducer = (state = initState, action) => {
  switch (action.type) {
    case 'DATA_OBTAINED':
      return {
        ...state,
        data: action.data,
      };
  
    default:
      return state;
  }
}

export default initReducer