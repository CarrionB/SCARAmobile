export const createRequest = (request) =>{
    return (dispatch, getState, {firebase})=>{

        const database = firebase.database();

        var dateMonth = '';

        if(request.FechaReserva.getMonth()<9)
        {
            dateMonth = '0' + (request.FechaReserva.getMonth()+1)
        }else{
            dateMonth = (request.FechaReserva.getMonth()+1)
        }
        var dateDay = '';

        if(request.FechaReserva.getDate()<10)
        {
            dateDay = '0' + (request.FechaReserva.getDate())
        }else{
            dateDay = (request.FechaReserva.getDate())
        }

        var referencia = database.ref('Solicitudes')
            .child('@'+request.Cedula+'-'+
            request.FechaReserva.getFullYear()+'-'+dateMonth+'-'+dateDay+'-'+
            request.NombreAu.replace('/','*'));
            referencia.set({
                Aprobacion: request.Aprobacion,
                Cedula: request.Cedula,
                Error: request.Error,
                NombreMat: request.NombreMat,
                NombreGr: request.NombreGr,
                NombreAu: request.NombreAu.replace('*','/'),
                FechaReserva: request.FechaReserva,
                HoraIni: request.HoraIni,
                HoraFin: request.HoraFin
            })
            .then(() =>{
                dispatch({type: 'CREATE_REQUEST', request})
            })
            .catch((error) => {
                dispatch({type: 'CREATE_REQUEST_ERROR', error})
            });
    }
}

