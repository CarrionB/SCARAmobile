import { StyleSheet } from 'react-native';
import { resizeFactor, width, height } from './constants';

const styles = StyleSheet.create({
  appContainer: {
      position: 'absolute',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
  },

  buttonRow: {
      margin: 5,
      flexDirection: 'row',
      height: 60,
      justifyContent: 'space-between',
  },

  buttonText: {
      textAlign:'center',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16 * resizeFactor
  },
  
  buttonContainer:{
      backgroundColor: '#042944',
      padding: 15,
      marginLeft: 15,
      marginRight: 15,
      borderRadius: 8
  },

  checkBoxContainer: {
      borderColor:'gray',
      borderWidth:2, 
      borderRadius:8,
      flexDirection: 'row',
      left: 16,
      marginBottom: 5 * resizeFactor,
      paddingBottom: 0,
      position:'relative',
      width: width - 32,
  },

  checkBox: {
      paddingTop: 0,
      paddingBottom: 0
  },

  checkBoxLabel: {
      marginTop: 5,
      top: 0,
      fontSize: 11 * resizeFactor
  },

  container: {
      paddingTop: 0,
      justifyContent: 'center',
      height: '100%',
      width: '100%'
  },

  emailAndPassword: {
      flex: 2,
      justifyContent: 'center',
  },

  footer:{
      position: 'absolute',
      height: 10,
      bottom: 5,
      right: 5
  },

  footerText:{
      fontFamily: 'serif',
      color: '#bdb8ac',
      fontSize: 10 * resizeFactor
  },

  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60 * resizeFactor,
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:20 * resizeFactor,
    right: 25
  },

  headerLogo: {
    height:40*resizeFactor, 
    width:40*resizeFactor,
    left: 25
  },
  
  icon:{
      marginTop: 6 * resizeFactor,
      marginBottom: 5 * resizeFactor,
      marginRight: 5 * resizeFactor
  },

  iconButton: {
    margin: 5,
    height: 70 * resizeFactor, 
    width: 70 * resizeFactor, 
    alignSelf: 'center',
  },

  imageButtonText: {
    textAlign:'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12 * resizeFactor
  },

  imageButtonContainer: {
    backgroundColor: '#042944',
    marginLeft: 5,
    width: width * 0.3,
    height: width * 0.3,
    marginRight: 5,
    borderRadius: 8
  },

  loginContainer: {
      backgroundColor: '#000000',
      flex: 1,
      justifyContent: 'center',
      height: '100%',
      width: '100%'
  },

  logo: {
      height: height * 0.2098, 
      width: height * 0.3282, 
      alignSelf: 'center'
  },

  logoContainer:{
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
  },

  margin:{
      borderColor:'gray',
      borderWidth:2, 
      borderRadius:8,
      left: 16,
      marginBottom: 5 * resizeFactor,
      paddingBottom: 5 * resizeFactor,
      width: width - 32,
  },

  menuHeader: {
    backgroundColor: '#222431',
    top: 0, 
    position: 'absolute', 
    width: '100%'
  },

  picker: {
      alignSelf: 'center',
      backgroundColor: 'white',
      color: 'black',
      height: 30 * resizeFactor,
      width: width - 66,
  },

  pickerBox: {
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#c4c4c4',
      flexDirection: 'row',
      justifyContent: 'space-between',
      left: 14,
      marginBottom: 5 * resizeFactor,
      width: width - 64,
  },

  screenTitle: {
      left: 20,
      fontSize: 14 * resizeFactor,
      fontWeight: 'bold',
      marginBottom: 15,
  },

  text: {
      left: 16, 
      fontSize: 12 * resizeFactor,
      marginBottom: 1 * resizeFactor,
      marginTop: 1 * resizeFactor,
  },

  textBox:{
      left: 14,
      borderWidth: 1,
      borderColor: '#c4c4c4',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 1 * resizeFactor,
      width: width - 64,
  },

  textInBox: {
      marginTop: 1 * resizeFactor,
      fontSize: 12 * resizeFactor,
      left: 8
  },

  welcomeText: {
      marginTop: 20,
      marginBottom: 20,
      textAlign:'center',
      fontSize: 15 * resizeFactor
  },
})

export { styles }