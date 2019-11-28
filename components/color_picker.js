import React from 'react';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker';

export default function (props) {
    return (
        <Dialog
            visible={props.visible}
            onTouchOutside={props.onCloseHandler}
            height={300} width={300}
        >
            <DialogContent style={{ flex: 1 }}>
                <TriangleColorPicker
                    style={{ flex: 1 }}
                    oldColor={rgbToString(props.color)}
                    onColorChange={(color) => props.updateColor(hexToRgb(fromHsv(color)))}
                    onOldColorSelected={(color) => props.updateColor(hexToRgb(color))}
                />
            </DialogContent>
        </Dialog>
    );
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
        1
    ] : null;
}

export function rgbToString(rgb) {
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rgb[3]})`;
}