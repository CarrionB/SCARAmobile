//import liraries
import React, {useState} from 'react';
import {Animated} from 'react-native';

// create a component
const FadeInView = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

    React.useEffect(() => {
        setTimeout(function(){
            Animated.timing(
                fadeAnim,
                {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                }
            ).start();
        }.bind(this), 1000);
    }, [])
  
    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
}

//make this component available to the app
export default FadeInView;
