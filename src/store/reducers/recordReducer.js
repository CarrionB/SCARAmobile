const initState = {
  records: []
}

const recordReducer = (state = initState, action) => {
  switch (action.type) {
    case 'RECORDS_OBTAINED':
      return {
        ...state,
        records: action.table,
      };

    case 'RECORDS_NULL':
      return {
        ...state,
        records: null,
      };

    default:
      return state;
  }
}

export default recordReducer;