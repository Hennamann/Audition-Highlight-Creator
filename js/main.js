/*
 * Written by Ole Henrik Stabell - ole@henrikstabell.com
 * Licensed under the MIT License - https://opensource.org/licenses/MIT
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    // Initialize the CSInterface
    var csInterface = new CSInterface();

    // JSON string containing the keyboard shortcut CTRL+F and CMD+F
    // key code 3 is F on Mac and key code 46 is F on Windows.
    var keysOfInterest = '[{' +
        '    "keyCode": 3,' +
        '    "metaKey": true' +
        ' },' +
        ' {' +
        '    "keyCode": 46,' +
        '    "ctrlKey": true' +
        ' }]';

    // Anything in here is run on extension initialization.
    function init() {

        // Register an interest in the CMD/CTRL+H Key Event to avoid Adobe Audition stealing the key event.
        csInterface.registerKeyEventsInterest(keysOfInterest);

        // Check for keyboard presses
        document.onkeydown = function (event) {

            // Windows : web browsers seemingly use different key codes than desktop apps, 70 is F
            // CTRL+F
            if (event.ctrlKey && event.which == 70) {
                csInterface.evalScript('getSelectionAndCopyToNew(' + parseInt($("#seconds_input").val()) + ')');
                return false;
                // Mac : web browsers seemingly use different key codes than desktop apps, 70 is F
                // CMD+F
            } else if (event.metaKey && event.which == 70) {
                // Run extendscript function
                csInterface.evalScript('getSelectionAndCopyToNew(' + parseInt($("#seconds_input").val()) + ')');
                return false;
            }
        }

        // When the copy selection button is pressed it runs the ExtendScript function that makes and copies the selection to a new document.
        $("#get_selection_button").click(function () {
            // Run ExtendScript function
            csInterface.evalScript('getSelectionAndCopyToNew(' + parseInt($("#seconds_input").val()) + ')');
        });
    }

    init();
}());