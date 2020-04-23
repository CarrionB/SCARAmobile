import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Dialog, 
    { DialogTitle, DialogContent, DialogFooter, DialogButton  } 
    from 'react-native-popup-dialog';

class AlertBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        show: this.props.show
    };
  }

  handleOpen = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  render() {
    return (
        <View>
             <Dialog
                visible={this.state.show}
                onTouchOutside={() => {
                this.setState({ show: false });
                }}
            >
                <DialogContent>
                    <Text> xd</Text>
                </DialogContent>
            </Dialog>
        </View>
    );
  }
}

export default AlertBox;

