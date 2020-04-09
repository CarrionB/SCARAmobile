const initState = {
    obj: 'xd'
}
const requestReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_REQUEST':
            console.log('Solicitud creada', action.request);
            alert("Solicitud creada");

            return state;
        case 'CREATE_REQUEST_ERROR':
            console.log('Error', action.error);
            alert("Hello! I am an alert box!!");
            return state;
    }
    return state;
}

export default requestReducer;