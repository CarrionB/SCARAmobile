import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window')

let resizeFactor = (height+width)/(570+330);

const tableHeaders = {
    records: [
        'Materia', 'Grupo', 
        'Aula', 'Fecha', 
        'HoraInicio', 'HoraFin', 
        'HoraEntrada', 'HoraSalida'],
    daysOfWeek: [
        'Lunes', 'Martes', 
        'Miercoles', 'Jueves', 
        'Viernes', 'Sabado' ],
}

const tableWidthArrs = {
    requests: [width*(0.65), width*(0.25)],
    schedules: [
        width*(2/9), width*(2/9), 
        width*(2/9), width*(2/9), 
        width*(2/9), width*(2/9) ],
    registers: [
        width*(4/9), width*(2/9), 
        width*(2/9), width*(2/9), 
        width*(2/9), width*(2/9),
        width*(2/9), width*(2/9) ],
}

const authErrors = {
  error0: 'The email address is badly formatted.',
  error1: 'The password is invalid or the user does not have a password.',
  error2: 'There is no user record corresponding to this identifier. The user may have been deleted.',
  error3: 'An internal error has occurred. [ 7: ]',
}

export { authErrors, tableWidthArrs, tableHeaders, resizeFactor, width, height };
