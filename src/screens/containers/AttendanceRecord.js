import React, { Component } from 'react';
import { Alert, View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { MenuHeader, Button, CheckBoxContainer, DateTimeBox, PickerBox, Loading, Results } from '../components';
import { tableHeaders, tableWidthArrs, resizeFactor } from '../../res/constants';
import { styles } from '../../res/styles';
import { getRecords } from '../../store/actions/recordActions';

class AttendanceRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryData: {
        selectedSubject: '',
        selectedGroup: '',
        selectedStartDate: new Date(),
        selectedEndDate: new Date(),
        filterActivated: false,
      },
      groupNames: [],
      tableTitle: '',
      showDatePicker: false,
      dateToPick: '',
      showLoading: false,
      showResults: false
    };

    this.onButtonPress = this.onButtonPress.bind(this);
    this.onChecked = this.onChecked.bind(this);
    this.onSubjectValueChange = this.onSubjectValueChange.bind(this);
    this.onGroupValueChange = this.onGroupValueChange.bind(this);
    this.return = this.return.bind(this);
    this.showStartDatepicker = this.showStartDatepicker.bind(this);
    this.showEndDatepicker = this.showEndDatepicker.bind(this);
  }

  onButtonPress = () => {
    this.state.queryData.selectedStartDate.setHours(0,0,0,0)
    this.state.queryData.selectedEndDate.setHours(0,0,0,0)
    var startDate = this.state.queryData.selectedStartDate
    var endDate = this.state.queryData.selectedEndDate
    
    if(startDate.getTime() <= endDate.getTime()){
      console.log('query data')
      console.log(this.state.queryData);

      this.props.getRecords(
        this.state.queryData,
        this.props.data.groupList
      );
      this.sleep();
    }
    else
    {
      Alert.alert(
        "Aviso",
        "La fecha de fin debe ser mayor o igual a la de inicio",
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

  }

  onChecked = (value) => {
    this.setState((prevState) => ({
      queryData: {
        ...prevState.queryData,
        filterActivated: !this.state.queryData.filterActivated
      }
    }));
  }

  onGroupValueChange = (itemValue, itemIndex) => {
    this.setState(prevState => ({
      queryData: {
        ...prevState.queryData,
        selectedGroup: itemValue
      }
    }));
  }
  
  onSubjectValueChange = (itemValue, itemIndex) => {
    this.setState(prevState => ({
      queryData: {
        ...prevState.queryData,
        selectedSubject: itemValue
      }
    }));
    
    this.getCorrespondingGroups(itemValue)
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

  showStartDatepicker = () => {
    this.setState({
      showDatePicker: true,
      dateToPick: 'start'
    });
  }

  showEndDatepicker = () => {
    this.setState({
      showDatePicker: true,
      dateToPick: 'end'
    });
  }

  setDate = (event, date) => {
    console.log(this.state.dateToPick) 
    if(typeof date !== 'undefined')
    {
      switch (this.state.dateToPick){
        case 'start':
          this.setState(prevState => ({
            queryData: {                   // object that we want to update
              ...prevState.queryData,    // keep all other key-value pairs
              selectedStartDate: date       // update the value of specific key
            },
            showDatePicker: false
          }));
          break;
        case 'end':
          this.setState(prevState => ({
            queryData: {                   // object that we want to update
              ...prevState.queryData,    // keep all other key-value pairs
              selectedEndDate: date       // update the value of specific key
            },
            showDatePicker: false
          }));
          break;
        default:
          break;
      }
    }
    console.log(this.state)
  }

  dateToString = (date) => {
    var dateMonth = date.getMonth() + 1
    return date.getFullYear() + '-' + dateMonth + '-' + date.getDate()
  }

  return = () => {
    this.setState({showResults:false});
  }

  
  sleep = () => {
    this.setState({showLoading:true});
    
    setTimeout(function(){
      this.setState({showLoading:false});
    }.bind(this), 5000);

    setTimeout(function(){
      if(this.props.records !== null)
      {
        this.setState({showResults:true})
      }
      else
      {
        Alert.alert(
          "Aviso",
          "No se encontró registros con los parametros indicados",
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
    }.bind(this), 5000);
  }
  
  render() {

    return (
      <View style = { styles.container }>

        {
          this.state.showLoading && 
          <Loading
            offset = {200 * resizeFactor}
          />
        }

        {
          this.state.showResults && 
          <Results 
            label = {this.state.tableTitle}
            offset = {200 * resizeFactor}
            tableData = {{
              rowHeaderVisible: false,
              colHeaderVisible: true,
              header: tableHeaders.records,
              data: this.props.records,
              widthArr: tableWidthArrs.registers
            }}
            onButtonPress = {this.return}
          />
        }

        <View style = {styles.menuHeader}>
          <MenuHeader navigation ={this.props.navigation}/>
        </View>

        <Text style = {styles.screenTitle}
        >
          Registros de asistencia
        </Text>

        <CheckBoxContainer
          checked = {this.state.queryData.filterActivated}
          label = {'Filtrar por materia'}
          onPress = {this.onChecked}
        />

        <PickerBox
          enabled = {this.state.queryData.filterActivated}
          label = {'Seleccione una Materia'}
          onValueChange = {this.onSubjectValueChange}
          pickerItems = {this.props.data.subjectList}
          selectedValue = {this.state.queryData.selectedSubject} 
        />

        <PickerBox
          enabled = {this.state.queryData.filterActivated}
          label = {'Seleccione un Grupo'}
          onValueChange = {this.onGroupValueChange}
          pickerItems = {this.state.groupNames}
          selectedValue = {this.state.queryData.selectedGroup} 
        />

        <DateTimeBox
          date = {this.dateToString(this.state.queryData.selectedStartDate)}
          label = {'Seleccione un fecha de inicio'}
          onDateChange = {this.showStartDatepicker}
        />

        <DateTimeBox
          date = {this.dateToString(this.state.queryData.selectedEndDate)}
          label = {'Seleccione un fecha de fin'}
          onDateChange = {this.showEndDatepicker}
        />

        <Button
          label = {'Consultar'}
          onButtonPress = {this.onButtonPress}
        />

        { 
          this.state.showDatePicker && 
          <DateTimePicker 
            value = {new Date()}
            mode = 'date'
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
    records: state.rec.records
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getRecords: (queryData ,groupList) => dispatch(getRecords(queryData, groupList))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceRecord);
