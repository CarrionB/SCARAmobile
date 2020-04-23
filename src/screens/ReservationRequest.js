import React, { Component } from 'react';
import { Alert, View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { createRequest } from '../store/actions/requestActions';
import { MenuHeader, Button, DateTimeBox, PickerBox, Loading } from './components';
import { styles } from '../res/styles';

class ReservationRequest extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      requestToSend: {
        FechaReserva: new Date(),
        HoraFin: 0,
        HoraIni: 0,
        NombreAu: '',
        NombreGr: '',
        NombreMat: ''
      },
      groupNames: [],
      showDatePicker: false,
      datePickerMode: 'date',
      timeToPick: 'date'
    };

    this.onButtonPress = this.onButtonPress.bind(this);
    this.onClassValueChange = this.onClassValueChange.bind(this);
    this.onSubjectValueChange = this.onSubjectValueChange.bind(this);
    this.onGroupValueChange = this.onGroupValueChange.bind(this);
    this.showDatepicker = this.showDatepicker.bind(this);
  }

  onButtonPress = () => {
    
    const {
      HoraFin,
      HoraIni,
      FechaReserva
    } = this.state.requestToSend;

    var dateToday = new Date();
    FechaReserva.setHours(0,0,0,0);
    dateToday.setHours(0,0,0,0);

    if(FechaReserva.getTime() > dateToday.getTime())
    {
      if(HoraIni < HoraFin)
      {
        console.log(this.state.requestToSend);
        this.props.createRequest(this.state.requestToSend);
        this.sleep();
      }
      else
      {
        this.showAlert(
          "Aviso",
          'La hora fin no puede ser menor o igual a la hora de inicio'
        )
      }
    }
    else if(FechaReserva.getTime() === dateToday.getTime())
    {
      if(HoraIni < HoraFin)
      {
        if (HoraIni > new Date().getHours().valueOf())
        {
          console.log(this.state.requestToSend);
          this.props.createRequest(this.state.requestToSend);
          this.sleep();
        }
        else
        {
          this.showAlert(
            "Aviso",
            'La hora inicio no es valida para el dia de hoy'
          )
        }
      }
      else
      {
        this.showAlert(
          "Aviso",
          'La hora fin no puede ser menor o igual a la hora de inicio'
        )
      }
    }
  }

  onClassValueChange = (itemValue, itemIndex) => 
  {
    this.setState(prevState => ({
      requestToSend: {                   // object that we want to update
        ...prevState.requestToSend,    // keep all other key-value pairs
        NombreAu: itemValue       // update the value of specific key
      }
    }))
  }

  onGroupValueChange = (itemValue, itemIndex) => {
    this.setState(prevState => ({
      requestToSend: {
        ...prevState.requestToSend,
        NombreGr: itemValue
      }
    }));
  }
  
  onSubjectValueChange = (itemValue, itemIndex) => {
    this.setState(prevState => ({
      requestToSend: {
        ...prevState.requestToSend,
        NombreMat: itemValue
      }
    }));
    
    this.getCorrespondingGroups(itemValue)
  }

  showDatepicker = () => {
    this.setState({
      showDatePicker: true,
      datePickerMode: 'date',
      timeToPick: 'date'
    });
  }

  showSTimePicker = () => {
    this.setState({
      showDatePicker: true,
      datePickerMode: 'time',
      timeToPick: 'sTime'
    });
  }

  showETimePicker = () => {
    this.setState({
      showDatePicker: true,
      datePickerMode: 'time',
      timeToPick: 'eTime'
    });
  }

  sleep = () => {
    this.setState({showLoading:true});
    
    setTimeout(function(){
      this.setState({showLoading:false});
    }.bind(this), 3000);

    setTimeout(function(){
      console.log(this.props.error)

      if(this.props.error)
      {
        this.showAlert(
          "Error",
          'El aula no se encuentra disponible en ese horario.\n'+
          'Revise en Horarios de Aulas e intente de nuevo'
        )
      }
      else
      {
        this.showAlert(
          "Aviso",
          'La solicitud se ha registrado con exito'
        )
      }
    }.bind(this), 3000);
  }

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
          { 
              text: "OK"
          }
      ],
      {   
          cancelable: false 
      }
    );
  }

  setDate = (event, date) => {

    if(typeof date !== 'undefined')
    {
      switch (this.state.timeToPick)
      {
        case 'date':
          this.setState(prevState => ({
            requestToSend: {                   // object that we want to update
              ...prevState.requestToSend,    // keep all other key-value pairs
              FechaReserva: date       // update the value of specific key
            },
            showDatePicker: false
          }));
          break;
        
        case 'sTime':
          var hour = date.getHours().valueOf();
          this.setState(prevState => ({
            requestToSend: {                   // object that we want to update
              ...prevState.requestToSend,    // keep all other key-value pairs
              HoraIni: hour       // update the value of specific key
            },
            showDatePicker: false
          }));
          break;
  
        case 'eTime':
          var hour = date.getHours().valueOf();
          this.setState(prevState => ({
            requestToSend: {                   // object that we want to update
              ...prevState.requestToSend,    // keep all other key-value pairs
              HoraFin: hour       // update the value of specific key
            },
            showDatePicker: false
          }));
          break;
  
        default:
          break;
      }
    }
  }

  getCorrespondingGroups = (subjectName) =>
  {
    var groupNames = this.state.groupNames;
    groupNames.splice(0,groupNames.length);
    
    var groupListAux = this.props.data.groupList;
    for(var i = 0; i<groupListAux.length; i++)
    {
      var groupSubject = groupListAux[i].Materia.Nombre.valueOf();

      if(groupSubject === subjectName)
      {
        const found = groupNames.find(element => 
          element === groupListAux[i].NombreGr
        );

        if(!found)
        {
          groupNames.push(groupListAux[i].NombreGr);
        }
      }
    }
  }

  dateToString = (date) => {
    var dateMonth = date.getMonth() + 1
    return date.getFullYear() + '-' + dateMonth + '-' + date.getDate()
  }

  formatTime = (time) => {
    var timeString = ':00';

    timeString = time < 10 ? '0' + time + timeString : time + timeString;

    return timeString
  }
  

  render() {

    return (
      <View style = { styles.container }>

        {
          this.state.showLoading && 
          <Loading
            offset = {310}
          />
        }

        <View style = {styles.menuHeader}>
          <MenuHeader navigation ={this.props.navigation}/>
        </View>

        <Text style = {styles.screenTitle}
        >
          Solicitud de Reserva
        </Text>

        <DateTimeBox
          date = {this.dateToString(this.state.requestToSend.FechaReserva)}
          label = {'Seleccione un fecha'}
          onDateChange = {this.showDatepicker}
        />

        <PickerBox
          enabled = {true}
          label = {'Seleccione una Materia'}
          onValueChange = {this.onSubjectValueChange}
          pickerItems = {this.props.data.subjectList}
          selectedValue = {this.state.requestToSend.NombreMat}
        />

        <View style = {{flexDirection: 'row'}}>

          <PickerBox
            enabled = {true}
            label = {'Seleccione un Grupo'}
            onValueChange = {this.onGroupValueChange}
            resize = {true}
            pickerItems = {this.state.groupNames}
            selectedValue = {this.state.requestToSend.NombreGr} 
          />

          <PickerBox
            enabled = {true}
            label = {'Seleccione un aula'}
            onValueChange = {this.onClassValueChange}
            resize = {true}
            pickerItems = {this.props.data.classroomList}
            selectedValue = {this.state.requestToSend.NombreAu} 
          />

        </View>

        <View style = {{flexDirection: 'row'}}>

          <DateTimeBox
            date = {this.formatTime(this.state.requestToSend.HoraIni)}
            label = {'Hora de inicio'}
            onDateChange = {this.showSTimePicker}
            type = {'time'}
          />

          <DateTimeBox
            date = {this.formatTime(this.state.requestToSend.HoraFin)}
            label = {'Hora de fin'}
            onDateChange = {this.showETimePicker}
            type = {'time'}
          />

        </View>

        <Button
          label = {'Realizar Reserva'}
          onButtonPress = {this.onButtonPress}
        />

        { 
          this.state.showDatePicker && 
          <DateTimePicker 
            value = {new Date()}
            mode = {this.state.datePickerMode}
            is24Hour = {true}
            display = "default"
            onChange = {this.setDate} 
          />
        }
        
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.init.data,
    error: state.req.error
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    createRequest: (request) => dispatch(createRequest(request))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationRequest);

