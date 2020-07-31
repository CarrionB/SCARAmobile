import { registerCustomIconType } from "react-native-elements";

export const getRecords = (queryData, groupList) => {
  return (dispatch, getState, {firebase})=>{
    const database = firebase.database();
    let records = []
    let table = []
    var daysOfWeek = ['Lunes','Martes','Miercoles','Jueves', 'Viernes','Sabado'];
    database.ref('Registros/'+firebase.auth().currentUser.uid)
      .once('value', function (snapshot){
        records = {...snapshot.val()};
        console.log(records)

        if(records != null)
        {
          var keysRecords = Object.keys(records).sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
          var recordsAux = [];

          keysRecords.forEach(item => {
            var fechaReg = new Date(records[item].Fecha);
            fechaReg = new Date(fechaReg.getFullYear(), fechaReg.getMonth(), fechaReg.getDate(),-5,0,0,0);
            var fechaRegAux = new Date(queryData.selectedStartDate.getFullYear(), queryData.selectedStartDate.getMonth(), queryData.selectedStartDate.getDate(),-5,0,0,0);
            var fechaFinAux = new Date(queryData.selectedEndDate.getFullYear(), queryData.selectedEndDate.getMonth(), queryData.selectedEndDate.getDate(),-5,0,0,0);
            if (+fechaReg >= +fechaRegAux && +fechaReg <= +fechaFinAux)
            {
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
                      if(ranura.Dia === daysOfWeek[fechaReg.getDay()-1]){
                        let horaInicio = new Date(ranura.HoraInicio);
                        let horaFin = new Date(ranura.Horafin);
                        console.log(horaInicio.getUTCHours(),horaFin.getUTCHours(),fechaReg.getUTCHours())
                        console.log(horaInicio.getHours(),horaFin.getHours(),fechaReg.getHours())
                        console.log(horaInicio.getTimezoneOffset(),horaFin.getTimezoneOffset(),fechaReg.getTimezoneOffset())
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
                        console.log(horaInicio.getUTCHours(),horaFin.getUTCHours(),fechaReg.getUTCHours())
                          console.log(horaInicio.getHours(),horaFin.getHours(),fechaReg.getHours())
                          console.log(horaInicio.getTimezoneOffset(),horaFin.getTimezoneOffset(),fechaReg.getTimezoneOffset())
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
                  if(index>=0)
                  {
                    records[item].Fecha = new Date(records[item].Fecha)
                    recordsAux[index].records.push(records[item])
                  }
                  else{
                    let grAux = groupList.find(gr => gr.NombreGr == records[item].NombreGr 
                      && gr.Materia.Nombre === records[item].NombreMat && gr.Horario.find(ranura => {
                        if(ranura.Dia === daysOfWeek[fechaReg.getDay()-1]){
                          let horaInicio = new Date(ranura.HoraInicio);
                          let horaFin = new Date(ranura.Horafin);
                          console.log(horaInicio.getUTCHours(),horaFin.getUTCHours(),fechaReg.getUTCHours())
                          console.log(horaInicio.getHours(),horaFin.getHours(),fechaReg.getHours())
                          console.log(horaInicio.getTimezoneOffset(),horaFin.getTimezoneOffset(),fechaReg.getTimezoneOffset())
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
                          console.log(horaInicio.getUTCHours(),horaFin.getUTCHours(),fechaReg.getUTCHours())
                          console.log(horaInicio.getHours(),horaFin.getHours(),fechaReg.getHours())
                          console.log(horaInicio.getTimezoneOffset(),horaFin.getTimezoneOffset(),fechaReg.getTimezoneOffset())
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
              }
            }
          })
          recordsAux = recordsAux.sort((a, b) => (a.fecha > b.fecha) ? 1 : ((b.fecha > a.fecha) ? -1 : 0))
          recordsAux.forEach(list => {
            list.records=list.records.sort((a, b) => 
              (a.Fecha.getHours() >= b.Fecha.getHours()) ? 1 : 
              ((b.Fecha.getHours() >= a.Fecha.getHours()) ? -1 : 0))
            let rowData = [];
            let horaSalida = new Date(list.records[list.records.length-1].Fecha)
            let horaEntrada = new Date(list.records[0].Fecha)
            // horaSalida.setTime( horaSalida.getTime() + new Date().getTimezoneOffset()*60*1000 )
            // horaEntrada.setTime( horaEntrada.getTime() + new Date().getTimezoneOffset()*60*1000 )
            // list.ranura.HoraInicio.setTime( list.ranura.HoraInicio.getTime() + new Date().getTimezoneOffset()*60*1000 )
            // list.ranura.Horafin.setTime( list.ranura.Horafin.getTime() + new Date().getTimezoneOffset()*60*1000 )
            rowData.push(list.materia);
            rowData.push(list.gr);
            rowData.push(list.records[0].NombreAula);
            rowData.push(list.fecha.getFullYear() + '-' +
              (list.fecha.getMonth()+1) + '-' + list.fecha.getDate());
            rowData.push(list.ranura.HoraInicio.getHours()+5);
            rowData.push(list.ranura.Horafin.getHours()+5);
            rowData.push((horaEntrada.getHours()+5)+":"+horaEntrada.getMinutes());
            rowData.push((horaSalida.getHours()+5)
              +":"+horaSalida.getMinutes());
            table.push(rowData);

          })
          if(table.length == 0){
            dispatch({type: 'RECORDS_NULL'});
          }
          else
          {
            dispatch({type: 'RECORDS_OBTAINED', table});
          }
        }
      }
    )
  }
}