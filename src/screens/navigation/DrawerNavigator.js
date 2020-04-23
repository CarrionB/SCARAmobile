import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import {
    AttendanceRecord, 
    ClassroomList,
    HomeScreen,
    ReservationRequest,
} from '../'
import { MenuDrawer } from '../components'

const { width, height } = Dimensions.get('window')

const DrawerConfig = {
    drawerWidth: width*0.75,
    drawerHeight: height,
    contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation}/>)
	}
}

const DrawerNavigator = createDrawerNavigator(
    {
        Home:{
            screen: HomeScreen
        },
        ListaAulas:{
            screen: ClassroomList
        },
        Registros:{
            screen: AttendanceRecord
        },
        Solicitud:{
            screen: ReservationRequest
        }
    },
    DrawerConfig
)

export default createAppContainer(DrawerNavigator);

