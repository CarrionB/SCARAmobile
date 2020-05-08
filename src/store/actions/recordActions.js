export const getRecords = (queryData, groupList) => {
  return (dispatch, getState, {firebase})=>{
    const database = firebase.database();
    let records = []
    var table = []
    var daysOfWeek = ['Lunes','Martes','Miercoles','Jueves', 'Viernes','Sabado'];
    database.ref('Registros/'+firebase.auth().currentUser.uid)
      .on('value', function (snapshot){
        records = snapshot.val();
        
        //console.log(records);

        if(records != null)
        {
          var keysRecords = Object.keys(records)
          var recordsAux = [];
          //keysRecords.reverse();
          keysRecords.forEach(item => {
            console.log(records[item].Fecha)
            var fechaReg = new Date(records[item].Fecha);
            fechaReg = new Date(fechaReg.getFullYear(), fechaReg.getMonth(), fechaReg.getDate(),-5,0,0,0);
            var fechaRegAux = new Date(queryData.selectedStartDate.getFullYear(), queryData.selectedStartDate.getMonth(), queryData.selectedStartDate.getDate(),-5,0,0,0);
            var fechaFinAux = new Date(queryData.selectedEndDate.getFullYear(), queryData.selectedEndDate.getMonth(), queryData.selectedEndDate.getDate(),-5,0,0,0);
            console.log(fechaReg,fechaRegAux,fechaFinAux);
            console.log(+fechaReg >= +fechaRegAux && +fechaReg <= +fechaFinAux);
            if (+fechaReg >= +fechaRegAux && +fechaReg <= +fechaFinAux)
            {
              var filtrar = true;

              if(queryData.filterActivated)
              {
                if(queryData.selectedGroup !== records[item].NombreGr ||
                  queryData.selectedSubject !== records[item].NombreMat)
                {
                  filtrar = false;
                }
              }

              if(filtrar)
              {
                groupList.forEach(gr =>{
                  if(gr.NombreGr === records[item].NombreGr &&
                  gr.Materia.Nombre === records[item].NombreMat)
                  {
                    fechaReg = new Date(records[item].Fecha);
                    //console.log('grupo valido', records[item].NombreGr, records[item].NombreMat);
                    gr.Horario.forEach(ranura =>{
                      // console.log(fechaReg.getDay())
                      // console.log(ranura.Dia);
                      // console.log(daysOfWeek[fechaReg.getDay()-1]);
                      if(ranura.Dia === daysOfWeek[fechaReg.getDay()-1])
                      {
                        // console.log('ranura con dia valido');
                        // console.log(ranura.HoraInicio, ranura.Horafin);
                        var horaInicio = new Date(ranura.HoraInicio);
                        var horaFin = new Date(ranura.Horafin);

                        if(horaFin.getUTCHours() >= fechaReg.getUTCHours() && horaInicio.getUTCHours() <= fechaReg.getUTCHours())
                        {
                          console.log('ranura valida');
                          if(recordsAux.length == 0)
                          {
                            recordsAux.push(records[item]);
                          }
                          else if(recordsAux.length > 0)
                          {
                            var fechaRegAux = new Date(recordsAux[0].Fecha);
                            var strDateReg = fechaReg.getFullYear() + fechaReg.getMonth() + fechaReg.getDate()
                            var strDateReg2 = fechaRegAux.getFullYear() + fechaRegAux.getMonth() + fechaRegAux.getDate()
                            if(strDateReg == strDateReg2)
                            {
                              recordsAux.push(records[item]);
                            }
                            else
                            {
                              recordsAux.splice(0,recordsAux.length);
                              recordsAux.push(records[item]);
                            }
                          }

                          if(recordsAux.length > 1)
                          {
                            var fechaRegAux = new Date(recordsAux[0].Fecha);
                            let rowData = [];

                            if(table.length > 0)
                            {
                              var fechaAux = table[table.length - 1][3];
                              var strDateReg = fechaReg.getFullYear() + '-' +
                              (fechaReg.getMonth()+1) + '-' + fechaReg.getDate();

                              console.log(fechaAux,strDateReg);

                              if(fechaAux == strDateReg)
                              {
                                var lastRecDate = new Date(recordsAux[recordsAux.length - 1].Fecha)

                                rowData.push(records[item].NombreMat);
                                rowData.push(records[item].NombreGr);
                                rowData.push(records[item].NombreAula);
                                rowData.push(fechaRegAux.getFullYear() + '-' +
                                  (fechaRegAux.getMonth()+1) + '-' + fechaRegAux.getDate());
                                rowData.push(horaInicio.getUTCHours());
                                rowData.push(horaFin.getUTCHours());

                                if(fechaRegAux.getUTCHours()>lastRecDate.getUTCHours())
                                {
                                  rowData.push(lastRecDate.getUTCHours()+":"+lastRecDate.getMinutes());
                                  rowData.push(fechaRegAux.getUTCHours()+":"+fechaRegAux.getMinutes());
                                }
                                else
                                {
                                  rowData.push(fechaRegAux.getUTCHours()+":"+fechaRegAux.getMinutes());
                                  rowData.push(lastRecDate.getUTCHours()+":"+lastRecDate.getMinutes());
                                }

                                table[table.length - 1] = rowData;
                              }
                            }
                            else
                            {
                              rowData.push(records[item].NombreMat);
                              rowData.push(records[item].NombreGr);
                              rowData.push(records[item].NombreAula);
                              rowData.push(fechaRegAux.getFullYear() + '-' +
                                (fechaRegAux.getMonth()+1) + '-' + fechaRegAux.getDate());
                              rowData.push(horaInicio.getUTCHours());
                              rowData.push(horaFin.getUTCHours());
                              rowData.push(fechaRegAux.getUTCHours()+":"+fechaRegAux.getMinutes());
                              rowData.push(new Date(recordsAux[recordsAux.length - 1].Fecha).getUTCHours()
                                +":"+new Date(recordsAux[recordsAux.length - 1].Fecha).getMinutes());
                              table.push(rowData);
                            }
                          }
                        }
                      }
                    })
                  }
                })
              }
            }
          })
        }
        
        if(table.length == 0){
          dispatch({type: 'RECORDS_NULL'});
        }
        else
        {
          dispatch({type: 'RECORDS_OBTAINED', table});
        }
      }
    )
  }
}