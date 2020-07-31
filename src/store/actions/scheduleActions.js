export const getSchedule = (queryData) => {
  return (dispatch, getState, {firebase})=>{
    const database = firebase.database();

    var daysOfWeek = ['Lunes','Martes','Miercoles','Jueves', 'Viernes','Sabado'];

    var schedule = [];
    var date = queryData.selectedDate;
    var startOfWeek = new Date(date)
    var endOfWeek = new Date(date)

    if(date.getDay() !== 0){
      var diff = ((date.getDay() - 1)%7)
      startOfWeek.setDate(startOfWeek.getDate()-diff)

      diff = (6 + (1 - date.getDay())%7)
      endOfWeek.setDate(endOfWeek.getDate()+diff)
    }
    else
    {
      startOfWeek.setDate(startOfWeek.getDate()-6)
    }

    for (let i = 0; i < 13; i += 1) {
      const rowData = [];
      for (let j = 0; j < 6; j += 1) {
          rowData.push('');
      }
      schedule.push(rowData);
    }

    console.log(schedule)

    database.ref('Aulas/'+ queryData.selectedClass).on('value', function (data){
      var grupos = data.val().Grupos; 
      var keysGr = Object.keys(grupos);
      for(var j = 0; j< keysGr.length; j++)
      {
        var kGR = keysGr[j];
        var nombreGR = grupos[kGR].NombreGr;
        var nombreMat =  grupos[kGR].Materia.Nombre;
        var horario = grupos[kGR].Horario;
        var keysHor = Object.keys(horario); 
        var recuperacion = grupos[kGR].Recuperacion;
        var grupoValido = true;
        console.log(nombreGR,nombreMat)
        if (recuperacion == 1)
        {	
          var fechaInicio = new Date(grupos[kGR].FechaInicio);
          var fechaFin =  new Date(grupos[kGR].FechaFin);
          var fechaInicioAux = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate(),-5,0,0,0);
          var fechaFinAux = new Date(endOfWeek.getFullYear(), endOfWeek.getMonth(), endOfWeek.getDate(),-5,0,0,0);
          // console.log(fechaInicio,fechaFin);
          // console.log(fechaInicioAux, fechaFinAux);
          // console.log(+fechaInicio >= +fechaInicioAux && +fechaInicio <= +fechaFinAux);
          // console.log(+fechaFin >= +fechaInicioAux && +fechaFin <= +fechaFinAux);
          // console.log(+fechaInicio < +fechaInicioAux && +fechaFin > +fechaFinAux);
          if (!((+fechaInicio >= +fechaInicioAux && +fechaInicio <= +fechaFinAux) ||
            (+fechaFin >= +fechaInicioAux && +fechaFin <= +fechaFinAux) ||
            (+fechaInicio < +fechaInicioAux && +fechaFin > +fechaFinAux)))
          {
            grupoValido = false;
          }
        }
        if(grupoValido)
        {
          console.log("grupo valido")
          for(var k = 0; k< keysHor.length; k++)
          {
            var kHor = keysHor[k];
            var dia = horario[kHor].Dia;
            var horaInicio = new Date(horario[kHor].HoraInicio);
            var horaFin = new Date(horario[kHor].Horafin);
            horaInicio.setTime( horaInicio.getTime() + new Date().getTimezoneOffset()*60*1000 )
            horaFin.setTime( horaFin.getTime() + new Date().getTimezoneOffset()*60*1000 )
            for(var i = 0; i < daysOfWeek.length; i++){
              if(dia === daysOfWeek[i])
              {
                schedule [horaInicio.getHours()-7][i] = 'Ocupado';
                var totalHours = horaFin.getHours() - horaInicio.getHours();
                if(totalHours==2){
                  schedule [horaInicio.getHours()-6][i] = 'Ocupado';
                }
                if(totalHours==3){
                  schedule [horaInicio.getHours()-6][i] = 'Ocupado';
                  schedule [horaInicio.getHours()-5][i] = 'Ocupado';
                }
              }
            }
          }
        }
      }
    })

    dispatch({type: 'SCHEDULE_OBTAINED', schedule})
  }
}