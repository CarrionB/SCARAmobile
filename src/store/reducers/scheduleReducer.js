const initState = {
  schedule: null
}

const scheduleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SCHEDULE_OBTAINED':
      return {
        ...state,
        schedule: action.schedule,
      };
  
    default:
      return state;
  }
}


export default scheduleReducer;