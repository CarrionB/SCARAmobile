const initState = {
    error: true,
    tableData: []
}

const requestReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_REQUEST':
            // alert("Solicitud creada");
            return {
                ...state,
                error: false
            };
        case 'CREATE_REQUEST_ERROR':
            return {
                ...state,
                error: true
            };
        case 'REQUEST_DATA_LOADED':
            return {
                ...state,
                data: action.tableData
            };
    }
    return state;
}

export default requestReducer;