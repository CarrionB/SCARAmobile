import { registerCustomIconType } from "react-native-elements";

export const getRecords = (queryData, groupList) => {
  return (dispatch, getState, {firebase})=>{
    console.log(groupList)
    const database = firebase.database();
    let records = []
    var table = []
    var daysOfWeek = ['Lunes','Martes','Miercoles','Jueves', 'Viernes','Sabado'];
    database.ref('Registros/'+firebase.auth().currentUser.uid)
      .on('value', function (snapshot){
        records = snapshot.val();
        console.log(getState())
        if(records != null)
        {
          var keysRecords = Object.keys(records).sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
          var recordsAux = [];
          //console.log(keysRecords)
          //keysRecords.reverse();

          keysRecords.forEach(item => {
            //console.log(records[item].Fecha)
            var fechaReg = new Date(records[item].Fecha);
            fechaReg = new Date(fechaReg.getFullYear(), fechaReg.getMonth(), fechaReg.getDate(),-5,0,0,0);
            var fechaRegAux = new Date(queryData.selectedStartDate.getFullYear(), queryData.selectedStartDate.getMonth(), queryData.selectedStartDate.getDate(),-5,0,0,0);
            var fechaFinAux = new Date(queryData.selectedEndDate.getFullYear(), queryData.selectedEndDate.getMonth(), queryData.selectedEndDate.getDate(),-5,0,0,0);
            //console.log(fechaReg,fechaRegAux,fechaFinAux);
            //console.log(+fechaReg >= +fechaRegAux && +fechaReg <= +fechaFinAux);
            if (+fechaReg >= +fechaRegAux && +fechaReg <= +fechaFinAux)
            {
              console.log(item)

              var filtrar = true;
              fechaReg = new Date(records[item].Fecha);

              if(queryData.filterActivated)
              {
                if(queryData.selectedGroup !== records[item].NombreGr ||
                  queryData.selectedSubject !== records[item].NombreMat)
                {
                  filtrar = false;
                }
              }

              let horaInicio = null;
              let horaFin = null;

              if(filtrar)
              {
                if(recordsAux.length == 0)
                {
                  let grAux = groupList.find(gr => gr.NombreGr == records[item].NombreGr 
                    && gr.Materia.Nombre === records[item].NombreMat && gr.Horario.find(ranura => {
                      console.log(gr.Recuperacion)
                      if(ranura.Dia === daysOfWeek[fechaReg.getDay()-1]){
                        let horaInicio = new Date(ranura.HoraInicio);
                        let horaFin = new Date(ranura.Horafin);
                        if(horaFin.getUTCHours() >= fechaReg.getUTCHours() && 
                        horaInicio.getUTCHours() <= fechaReg.getUTCHours())
                        {
                          return ranura
                        }
                      }
                  }))

                  if(grAux)
                  {
                    let rAux = grAux.Horario.find(ranura => {
                      if(ranura.Dia === daysOfWeek[fechaReg.getDay()-1]){
                        horaInicio = new Date(ranura.HoraInicio);
                        horaFin = new Date(ranura.Horafin);
                        if(horaFin.getUTCHours() >= fechaReg.getUTCHours() && 
                        horaInicio.getUTCHours() <= fechaReg.getUTCHours()){
                          return ranura
                        }
                      }
                    })

                    rAux.Horafin=new Date(rAux.Horafin)
                    rAux.HoraInicio=new Date(rAux.HoraInicio)

                    records[item].Fecha = new Date(records[item].Fecha)

                    recordsAux.push({
                      materia: grAux.Materia.Nombre,
                      gr: grAux.NombreGr,
                      ranura: rAux,
                      fecha: new Date(records[item].Fecha),
                      records: [records[item]]
                    })
                  }
                }
                else
                {

                  let index = recordsAux.findIndex(rec => 
                    fechaReg.getFullYear() === rec.fecha.getFullYear() &&
                    fechaReg.getMonth() === rec.fecha.getMonth() &&
                    fechaReg.getDate() === rec.fecha.getDate() && 
                    records[item].NombreGr == rec.gr &&
                    records[item].NombreMat == rec.materia)
                  console.log('index',index)
                  if(index>=0)
                  {
                    records[item].Fecha = new Date(records[item].Fecha)
                    recordsAux[index].records.push(records[item])
                  }
                  else{
                    let grAux = groupList.find(gr => gr.NombreGr == records[item].NombreGr 
                      && gr.Materia.Nombre === records[item].NombreMat && gr.Horario.find(ranura => {
                        console.log(gr.Recuperacion)
                        if(ranura.Dia === daysOfWeek[fechaReg.getDay()-1]){
                          let horaInicio = new Date(ranura.HoraInicio);
                          let horaFin = new Date(ranura.Horafin);
                          if(horaFin.getUTCHours() >= fechaReg.getUTCHours() && 
                          horaInicio.getUTCHours() <= fechaReg.getUTCHours()){
                            return ranura
                          }
                        }
                    }))
  
                    if(grAux)
                    {
                      let rAux = grAux.Horario.find(ranura => {
                        if(ranura.Dia === daysOfWeek[fechaReg.getDay()-1]){
                          horaInicio = new Date(ranura.HoraInicio);
                          horaFin = new Date(ranura.Horafin);
                          if(horaFin.getUTCHours() >= fechaReg.getUTCHours() && 
                          horaInicio.getUTCHours() <= fechaReg.getUTCHours()){
                            return ranura
                          }
                        }
                      })

                      records[item].Fecha = new Date(records[item].Fecha)

                      rAux.Horafin=new Date(rAux.Horafin)
                      rAux.HoraInicio=new Date(rAux.HoraInicio)
  
                      recordsAux.push({
                        materia: grAux.Materia.Nombre,
                        gr: grAux.NombreGr,
                        ranura: rAux,
                        fecha: records[item].Fecha,
                        records: [records[item]]
                      })
                    }
                  }
                }
                // console.log("regs", recordsAux)


                
              //   groupList.forEach(gr =>{
              //     if(gr.NombreGr === records[item].NombreGr &&
              //     gr.Materia.Nombre === records[item].NombreMat)
              //     {
              //       fechaReg = new Date(records[item].Fecha);
              //       //console.log('grupo valido', records[item].NombreGr, records[item].NombreMat);
              //       gr.Horario.forEach(ranura =>{
              //         // console.log(fechaReg.getDay())
              //         // console.log(ranura.Dia);
              //         // console.log(daysOfWeek[fechaReg.getDay()-1]);
              //         if(ranura.Dia === daysOfWeek[fechaReg.getDay()-1])
              //         {
              //           console.log('ranura con dia valido');
              //           console.log(ranura.HoraInicio, ranura.Horafin);
              //           var horaInicio = new Date(ranura.HoraInicio);
              //           var horaFin = new Date(ranura.Horafin);

              //           if(horaFin.getUTCHours() >= fechaReg.getUTCHours() && horaInicio.getUTCHours() <= fechaReg.getUTCHours())
              //           {
              //             console.log('ranura valida');
              //             if(recordsAux.length == 0)
              //             {
              //               recordsAux.push(records[item]);
              //             }
              //             else if(recordsAux.length > 0)
              //             {
              //               var fechaRegAux = new Date(recordsAux[0].Fecha);
              //               var strDateReg = fechaReg.getFullYear() + fechaReg.getMonth() + fechaReg.getDate()
              //               var strDateReg2 = fechaRegAux.getFullYear() + fechaRegAux.getMonth() + fechaRegAux.getDate()
              //               if(strDateReg === strDateReg2 && gr.Materia.Nombre === records[item].NombreMat &&
              //                  gr.NombreGr === records[item].NombreGr)
              //               {
              //                 recordsAux.push(records[item]);
              //               }
              //               else
              //               {
              //                 recordsAux.splice(0,recordsAux.length);
              //                 recordsAux.push(records[item]);
              //               }
              //             }

                          // if(recordsAux.length > 1)
                          // {
                          //   var fechaRegAux = new Date(recordsAux[0].Fecha);
                          //   let rowData = [];

                          //   if(table.length > 0)
                          //   {
                          //     var fechaAux = table[table.length - 1][3];
                          //     var strDateReg = fechaReg.getFullYear() + '-' +
                          //     (fechaReg.getMonth()+1) + '-' + fechaReg.getDate();

                          //     console.log(fechaAux,strDateReg);

                          //     if(fechaAux === strDateReg && records[item].NombreMat===table[table.length-1][0] && 
                          //       records[item].NombreGr===table[table.length-1][1])
                          //     {
                          //       var lastRecDate = new Date(recordsAux[recordsAux.length - 1].Fecha)

                          //       rowData.push(records[item].NombreMat);
                          //       rowData.push(records[item].NombreGr);
                          //       rowData.push(records[item].NombreAula);
                          //       rowData.push(fechaRegAux.getFullYear() + '-' +
                          //         (fechaRegAux.getMonth()+1) + '-' + fechaRegAux.getDate());
                          //       rowData.push(horaInicio.getUTCHours());
                          //       rowData.push(horaFin.getUTCHours());

                          //       if(fechaRegAux.getUTCHours()>lastRecDate.getUTCHours())
                          //       {
                          //         rowData.push(lastRecDate.getUTCHours()+":"+lastRecDate.getMinutes());
                          //         rowData.push(fechaRegAux.getUTCHours()+":"+fechaRegAux.getMinutes());
                          //       }
                          //       else
                          //       {
                          //         rowData.push(fechaRegAux.getUTCHours()+":"+fechaRegAux.getMinutes());
                          //         rowData.push(lastRecDate.getUTCHours()+":"+lastRecDate.getMinutes());
                          //       }
                          //       console.log(recordsAux)
                          //       table[table.length - 1] = rowData;
                          //     }
                          //     else{
                          //       var lastRecDate = new Date(recordsAux[recordsAux.length - 1].Fecha)

                          //       rowData.push(records[item].NombreMat);
                          //       rowData.push(records[item].NombreGr);
                          //       rowData.push(records[item].NombreAula);
                          //       rowData.push(fechaRegAux.getFullYear() + '-' +
                          //         (fechaRegAux.getMonth()+1) + '-' + fechaRegAux.getDate());
                          //       rowData.push(horaInicio.getUTCHours());
                          //       rowData.push(horaFin.getUTCHours());

                          //       if(fechaRegAux.getUTCHours()>lastRecDate.getUTCHours())
                          //       {
                          //         rowData.push(lastRecDate.getUTCHours()+":"+lastRecDate.getMinutes());
                          //         rowData.push(fechaRegAux.getUTCHours()+":"+fechaRegAux.getMinutes());
                          //       }
                          //       else
                          //       {
                          //         rowData.push(fechaRegAux.getUTCHours()+":"+fechaRegAux.getMinutes());
                          //         rowData.push(lastRecDate.getUTCHours()+":"+lastRecDate.getMinutes());
                          //       }
                          //       console.log(recordsAux)
                          //       table.push(rowData);
                          //     }
                          //   }
                          //   else
                          //   {
                          //     rowData.push(records[item].NombreMat);
                          //     rowData.push(records[item].NombreGr);
                          //     rowData.push(records[item].NombreAula);
                          //     rowData.push(fechaRegAux.getFullYear() + '-' +
                          //       (fechaRegAux.getMonth()+1) + '-' + fechaRegAux.getDate());
                          //     rowData.push(horaInicio.getUTCHours());
                          //     rowData.push(horaFin.getUTCHours());
                          //     rowData.push(fechaRegAux.getUTCHours()+":"+fechaRegAux.getMinutes());
                          //     rowData.push(new Date(recordsAux[recordsAux.length - 1].Fecha).getUTCHours()
                          //       +":"+new Date(recordsAux[recordsAux.length - 1].Fecha).getMinutes());
                          //     console.log(recordsAux)
                          //     table.push(rowData);
                          //   }
                          // }}
              //           }
              //         }
              //       })
              //     }
              //   })
              // }
            }}
          })
          recordsAux = recordsAux.sort((a, b) => (a.fecha > b.fecha) ? 1 : ((b.fecha > a.fecha) ? -1 : 0))
          console.log("regs", recordsAux)
          recordsAux.forEach(list => {
            list.records=list.records.sort((a, b) => 
              (a.Fecha.getHours() >= b.Fecha.getHours()) ? 1 : 
              ((b.Fecha.getHours() >= a.Fecha.getHours()) ? -1 : 0))
            let rowData = [];
            let horaSalida = new Date(list.records[list.records.length-1].Fecha)
            let horaEntrada = new Date(list.records[0].Fecha)
            rowData.push(list.materia);
            rowData.push(list.gr);
            rowData.push(list.records[0].NombreAula);
            rowData.push(list.fecha.getFullYear() + '-' +
              (list.fecha.getMonth()+1) + '-' + list.fecha.getDate());
            rowData.push(list.ranura.HoraInicio.getHours());
            rowData.push(list.ranura.Horafin.getHours());
            rowData.push(horaEntrada.getHours()+":"+horaEntrada.getMinutes());
            rowData.push(horaSalida.getHours()
              +":"+horaSalida.getMinutes());
            table.push(rowData);
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