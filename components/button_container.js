import React from 'react';
import { View, Text } from 'react-native';
import Button from './button';
import rgbToString from '../lib/rgb_to_string';

export default function ButtonContainer(props) {
    return props.visible ? (
        <View style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
        }}>
            <Button
                size={60}
                onPress={props.pickColorHandler}
                style={{ backgroundColor: rgbToString(props.color) }}
            ></Button>
            <Button
                size={60}
                onPress={props.setPosHandler}
                style={{ justifyContent: 'center' }}
            >
                <Text
                    adjustsFontSizeToFit={true}
                    style={{ textAlign: 'center' }}
                >{Math.floor(props.pos[0])}</Text>
                <Text
                    adjustsFontSizeToFit={true}
                    style={{ textAlign: 'center' }}
                >{Math.floor(props.pos[1])}</Text>
            </Button>
        </View>
    ) : null;
}