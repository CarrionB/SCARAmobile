export const getData = () => {
  return (dispatch, getState, {firebase}) => {
    const database = firebase.database();

    var classroomList = [];
    var subjectList = [];
    var groupList = [];

    database.ref('Aulas/').on('value', function (snapshot){
      var classrooms = snapshot.val();
      var keysAu = Object.keys(snapshot.val());
      
      keysAu.forEach(item => {
        classroomList.push(item);
      })
      
      for(var i = 0; i < keysAu.length; i++){
        var kAu = keysAu[i];
        var aula = classrooms[kAu];
        var grupos = aula.Grupos;
        var keysGr = Object.keys(grupos);
        
        for(var j = 0; j< keysGr.length; j++)
        {
          var kGR = keysGr[j];
          var nombresProf = grupos[kGR].Profesor.Nombres;
          var apellidosProf = grupos[kGR].Profesor.Apellidos;
          var displayName = firebase.auth().currentUser.displayName;
          var recuperacion = grupos[kGR].Recuperacion;

          if(displayName.toUpperCase() === (nombresProf + " " + apellidosProf))
          {
            groupList.push(grupos[kGR]);
          }
        }
      }

      for(var i = 0; i < groupList.length; i++){
        const found = subjectList.find(element => 
          element === groupList[i].Materia.Nombre
        )

        if(!found){
          subjectList.push(groupList[i].Materia.Nombre);
        }
      }
    })

    var data = {
      classroomList: classroomList,
      groupList: groupList,
      subjectList: subjectList
    }

    dispatch({type: 'DATA_OBTAINED', data})
  }
}