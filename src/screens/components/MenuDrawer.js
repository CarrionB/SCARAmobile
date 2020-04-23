import React, { Component } from 'react';
import {
	View, 
	Text,
	Image,
	ScrollView,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { getUserInfo } from '../../store/actions/authActions'
import { connect } from 'react-redux';

const WIDTH = Dimensions.get('window').width 
const HEIGHT = Dimensions.get('window').height 

const resizeFactor = (HEIGHT+WIDTH)/(592+360);

class MenuDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
	}
	
	componentDidMount() {
		console.log('xd')
	}

  navLink(nav, text) {
		return(
			<TouchableOpacity 
				style={{height: 60*resizeFactor}} 
				onPress={() => this.props.navigation.navigate(nav)}
			>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		const {userInfo} = this.props;
		return(
			<View style={styles.container}>
				<ScrollView style={styles.scroller}>
					<View style={styles.topLinks}>
						<View style={styles.profile}>
							<View style={styles.imgView}>
                                <Image 
                                    style={styles.img} 
                                    source = {{uri:userInfo.photoUrl}} 
                                />
							</View>
							<View style={styles.profileText}>
								<Text style={styles.name}>
                                    {userInfo.name}
                                </Text>
							</View>
						</View>
					</View>
					<View style={styles.bottomLinks}>
						{this.navLink('Home', 'Inicio')}
						{this.navLink('ListaAulas', 'Horarios de Aulas')}
						{this.navLink('Registros', 'Registros de Asistencia')}
						{this.navLink('Solicitud', 'Solicitud de reserva')}
					</View>
				</ScrollView>
				<View style={styles.footer}>
					<Text style={styles.description}>
                        Sistema de Control de Acceso y Registro de Asistencia
                    </Text>
					<Text style={styles.version}>v1.0</Text>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) =>{
    return {
        userInfo: state.auth.userInfo,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getUserInfo: () => dispatch(getUserInfo())
    }
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'lightgray',
	},
	scroller: {
		flex: 1,
	},
	profile: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 2,
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: '#777777',
	},
	profileText: {
		flex: 3,
		flexDirection: 'column',
		paddingLeft:20,
		justifyContent: 'center',
	},
	name: {
		fontSize: 20 * resizeFactor,
		paddingBottom: 5,
		color: 'white',
		textAlign: 'left',
	},
	imgView: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
	},
	img: {
		height: 70 * resizeFactor,
		width: 70 * resizeFactor,
		borderRadius: 50,
	},
	topLinks:{
		height: 160,
		backgroundColor: '#222431',
	},
	bottomLinks: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 10*resizeFactor,
		paddingBottom: HEIGHT,
	},
	link: {
		flex: 1,
		fontSize: 20*resizeFactor,
		paddingTop: 10,
		paddingLeft: 14,
		paddingBottom: 10,
		margin: 5,
		textAlign: 'left',
	},
	footer: {
		height: 50*resizeFactor,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: 'lightgray'
	},
	version: {
		flex: 1, 
		textAlign: 'right',
		marginRight: 10,
		color: 'gray',
		fontSize:12*resizeFactor
	},
	description: {
		flex: 1, 
		marginLeft: 10,
		fontSize: 10*resizeFactor
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(MenuDrawer);
