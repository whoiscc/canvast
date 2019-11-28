import React, { Component } from 'react';
import { TextInput } from 'react-native';
import Dialog, { DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';

export default class PosSetter extends Component {
    state = {
        pos: [null, null],
    }

    render() {
        return (
            <Dialog
                visible={this.props.visible}
                footer={
                    <DialogFooter>
                        <DialogButton
                            text="传送"
                            disabled={!this.state.pos[0] || !this.state.pos[1]}
                            onPress={() => {
                                this.props.setPos(this.state.pos);
                                this.setState({ pos: [null, null] });
                            }}
                        />
                        <DialogButton
                            text="取消"
                            onPress={() => {
                                this.props.cancel();
                                this.setState({ pos: [null, null] });
                            }}
                        />
                    </DialogFooter>
                }
            >
                <DialogContent
                    style={{
                        width: 300,
                        alignItems: 'stretch',
                    }}
                >
                    <TextInput
                        style={{ margin: 10 }}
                        placeholder="目的地x坐标"
                        value={this.state.pos[0] && this.state.pos[0].toString()}
                        keyboardType="number-pad"
                        onChangeText={(x) => this.setState(state => ({ pos: [parseInt(x), state.pos[1]] }))}
                    />
                    <TextInput
                        style={{ margin: 10 }}
                        placeholder="目的地y坐标"
                        value={this.state.pos[1] && this.state.pos[1].toString()}
                        keyboardType="number-pad"
                        onChangeText={(y) => this.setState(state => ({ pos: [state.pos[0], parseInt(y)] }))}
                    />
                </DialogContent>
            </Dialog>
        );
    }
}