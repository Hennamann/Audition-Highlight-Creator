/*
 * Written by Ole Henrik Stabell - ole@henrikstabell.com
 * Licensed under the MIT License - https://opensource.org/licenses/MIT
 *
 */

// Makes a selection for set seconds and copies it to a new document.
function getSelectionAndCopyToNew(seconds) {
    // Makes a new selection with the seconds as an input multiplied by 44576 which is equivalent to 1 second in Audition
    app.activeDocument.setSelection(app.activeDocument.ctiPosition - 44576 * seconds, 44576 * seconds);
    // Copies our new selection to a new document, if Audition is currently recording it will do this without changing to the newly created document.
    app.activeDocument.copyToNew();
}