const initState = {
    error: true,
    tableData: []
}

const requestReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_REQUEST':
            console.log('Solicitud creada', action.request);
            // alert("Solicitud creada");
            return {
                ...state,
                error: false
            };
        case 'CREATE_REQUEST_ERROR':
            console.log('Error', action.error);
            return {
                ...state,
                error: true
            };;
        case 'REQUEST_DATA_LOADED':
            console.log(action)
            return {
                ...state,
                data: action.tableData
            };
    }
    return state;
}

export default requestReducer;