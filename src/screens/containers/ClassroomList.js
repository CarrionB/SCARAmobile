import React, { Component } from 'react';
import { Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { Button, Loading, Results, MenuHeader, PickerBox, DateTimeBox } from '../components';
import { tableHeaders, tableWidthArrs, resizeFactor } from '../../res/constants';
import { styles } from '../../res/styles';
import { getSchedule } from '../../store/actions/scheduleActions'

class ClassroomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryData: {
        selectedClass: '',
        selectedDate: new Date(),
      },
      tableTitle: '',
      showDatePicker: false,
      showLoading: false,
      showResults: false
    };
    
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onClassValueChange = this.onClassValueChange.bind(this);
    this.return = this.return.bind(this);
    this.setDate = this.setDate.bind(this);
    this.showDatepicker = this.showDatepicker.bind(this);
  }

  onClassValueChange = (itemValue, itemIndex) => {
    this.setState(prevState => ({
      queryData: {                   
        ...prevState.queryData,    
        selectedClass: itemValue       
      }
    }))
  }

  onButtonPress = () => {
    var tableTitle = this.setStartEndOfWeek(this.state.queryData.selectedDate);
    this.setState({tableTitle:tableTitle});
    console.log(this.state.queryData)
    this.props.getSchedule(this.state.queryData);
    this.sleep();
  }

  return = () => {
    this.setState({showResults:false});
  }

  setDate = (event, date) => {
    date = date || this.state.date;
    console.log(date);
    this.setState(prevState => ({
      queryData: {                   // object that we want to update
        ...prevState.queryData,    // keep all other key-value pairs
        selectedDate: date       // update the value of specific key
      },
      showDatePicker: false
    }));
  }

  setStartEndOfWeek = (date) => {
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
    
    var weekLabel = 'Semana del: ' + 
      this.dateToString(startOfWeek) + 
      ' al ' + this.dateToString(endOfWeek)
    return weekLabel
  }

  showDatepicker = () => {
    this.setState({
      showDatePicker: true
    });
    console.log('Se ejecuta')
  }

  dateToString = (date) => {
    var dateMonth = date.getMonth() + 1
    return date.getFullYear() + '-' + dateMonth + '-' + date.getDate()
  }

  sleep = () => {
    this.setState({showLoading:true});
    
    setTimeout(function(){
      this.setState({showLoading:false});
    }.bind(this), 5000);

    setTimeout(function(){
      this.setState({showResults:true})
    }.bind(this), 5000);
  }

  render() {
    return (
      <View style = { styles.container }>

        {
          this.state.showLoading && 
          <Loading
            offset = {125 * resizeFactor}
          />
        }

        {
          this.state.showResults && 
          <Results 
            label = {this.state.tableTitle}
            offset = {125 * resizeFactor}
            tableData = {{
              rowHeaderVisible: true,
              colHeaderVisible: true,
              header: tableHeaders.daysOfWeek,
              data: this.props.schedule,
              widthArr: tableWidthArrs.schedules
            }}
            onButtonPress = {this.return}
          />
        }

        <View style = {styles.menuHeader}>
          <MenuHeader navigation ={this.props.navigation}/>
        </View>

        <Text style = {styles.screenTitle}
        >
          Horarios de Aulas
        </Text>

        <PickerBox
          enabled = {true}
          label = {'Seleccione un aula'}
          onValueChange = {this.onClassValueChange}
          pickerItems = {this.props.data.classroomList}
          selectedValue = {this.state.queryData.selectedClass} 
        />

        <DateTimeBox
          date = {this.dateToString(this.state.queryData.selectedDate)}
          label = {'Seleccione un fecha'}
          onDateChange = {this.showDatepicker}
        />

        <Button
          label = {'Consultar'}
          onButtonPress = {this.onButtonPress}
        />

        { 
          this.state.showDatePicker && 
          <DateTimePicker 
            value={this.state.queryData.selectedDate}
            mode='date'
            display="default"
            onChange={this.setDate} 
          />
        }

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.init.data,
    schedule: state.sched.schedule
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSchedule: (queryData) => dispatch(getSchedule(queryData))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ClassroomList);
