export const createRequest = (request) =>{
  return (dispatch, getState, {firebase})=>{

    const database = firebase.database();

    var classroom = [];

    database.ref('Aulas/' + request.NombreAu).on('value', function (snapshot){
      classroom = {...snapshot.val()}
    })

    setTimeout(function(){
      if(validateRequest(classroom, request))
      {
        var dateMonth = '';

        if(request.FechaReserva.getMonth()<9)
        {
          dateMonth = '0' + (request.FechaReserva.getMonth()+1)
        }
        else
        {
          dateMonth = (request.FechaReserva.getMonth()+1)
        }

        var dateDay = '';

        if(request.FechaReserva.getDate()<10)
        {
          dateDay = '0' + (request.FechaReserva.getDate())
        }
        else
        {
          dateDay = (request.FechaReserva.getDate())
        }

        var cedula = firebase.auth().currentUser.uid;

        var referencia = database.ref('Solicitudes')
          .child('@'+ cedula + '-'+
          request.FechaReserva.getFullYear() + '-' + dateMonth + '-' + dateDay + '-' +
          request.NombreMat.replace('/','*'));
        referencia.set({
          Aprobacion: 0,
          Cedula: cedula,
          Error: 0,
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
    }, 1000);
  }
}

const validateRequest = (classroom, request) => {
  var horaValida = true;
  var daysOfWeek = ['Lunes','Martes','Miercoles','Jueves', 'Viernes','Sabado'];
  var keysAu = Object.keys(classroom.Grupos)
  keysAu.forEach(key => {
    var keysR = Object.keys(classroom.Grupos[key].Horario);
    keysR.forEach(keyR => {
      var ranura = classroom.Grupos[key].Horario[keyR];
      var horaInicio = new Date(ranura.HoraInicio);
      var horaFin = new Date(ranura.Horafin);
      if(ranura.Dia === daysOfWeek[request.FechaReserva.getDay()-1])
      {
        console.log(horaInicio.getUTCHours(),horaFin.getUTCHours());
        console.log(request.HoraIni, request.HoraFin);

        if(horaFin.getUTCHours() >= request.HoraFin 
        && horaInicio.getUTCHours() <= request.HoraIni)
        {
            horaValida= false;
        }
        if(horaFin.getUTCHours() > request.HoraFin 
        && horaInicio.getUTCHours() <= request.HoraFin)
        {
            horaValida= false;
        }
        if(horaInicio.getUTCHours() <= request.HoraIni 
        && horaFin.getUTCHours() > request.HoraIni)
        {
            horaValida= false;
        }
        if(horaFin.getUTCHours() < request.HoraFin 
        && horaInicio.getUTCHours() > request.HoraIni)
        {
            horaValida= false;
        }
      }
    })
  })

  return horaValida;
}

export const getRequest = () => {
  return (dispatch, getState, {firebase})=>{

    const database = firebase.database();

    var tableData = []

    database.ref('Solicitudes/').on('value', function (snapshot){
      requestList = snapshot.val();

      if(requestList != null){
        tableData.splice(0,tableData.length);
        let requestKeys = Object.keys(requestList);
        
        requestKeys.reverse();
        requestKeys.forEach(key =>{
          var dateRequest = new Date(requestList[key].FechaReserva);
          var dateToday = new Date();

          dateRequest.setHours(0,0,0,0);
          dateToday.setHours(0,0,0,0);

          // console.log(dateRequest, dateToday)

          if(firebase.auth().currentUser.uid === requestList[key].Cedula){
            if(dateRequest >= dateToday){
              let rowData = [];
              rowData.push(dateRequest.getDate() + '-' + (dateRequest.getMonth()+1) +
                '-'+dateRequest.getFullYear()+' '+requestList[key].HoraIni+':00 - '
                + requestList[key].HoraFin+':00');
              rowData.push('');
              tableData.push(rowData);
              rowData=[];
              rowData.push(requestList[key].NombreMat+ ' '+requestList[key].NombreGr);
              if(requestList[key].Aprobacion == 0)
              {
                rowData.push('Pendiente');
              }
              else if(requestList[key].Aprobacion == 1)
              {
                rowData.push('Aprobada');
              }
              else
              {
                if(requestList[key].Error == 0)
                {
                  rowData.push('Rechazada\nMotivo: Acercarse a Coordinacion');
                }
                else if(requestList[key].Error == 1)
                {
                  rowData.push('Rechazada\nMotivo: Aula no disponible');
                }
                else if(requestList[key].Error == 2)
                {
                  rowData.push('Rechazada\nMotivo: Horario no disponible');
                }
                else if(requestList[key].Error == 3)
                {
                  rowData.push('Rechazada\nMotivo: La fecha es un feriado');
                }
              }
              tableData.push(rowData);
            }
          }
        })
      }
      
      if(tableData.length == 0){
        let rowData = [];
        rowData.push('No tiene solicitudes pendientes');
        rowData.push('');
        tableData.push(rowData);
      }

      console.log(tableData)

      dispatch({type: 'REQUEST_DATA_LOADED', tableData})
    })
  }
}