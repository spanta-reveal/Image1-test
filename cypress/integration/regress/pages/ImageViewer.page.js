/* ---
This file contains object identifiers on the imageDx image viewer page and functions for interacting with these objects
--- */
import { imageDx } from './imageDx.page.js';

export class ImageViewer extends imageDx {

    // Object identifiers
    static mag5Xbtn = ':nth-child(4) > .is-primary > .button';
    static mag10xbtn = ':nth-child(3) > .is-primary > .button';
    static fullViewBtn = '.top-72 > :nth-child(5)';

    // Annotation drawing tools
    static select = '.draw-tools-wrapper > :nth-child(1) > .button';
    static point = '.draw-tools-wrapper > :nth-child(2) > :nth-child(1)';
    static line = '.draw-tools-wrapper > :nth-child(2) > :nth-child(2)';
    static freehandLine = '.draw-tools-wrapper > :nth-child(2) > :nth-child(3)';
    static rectangle = '.draw-tools-wrapper > :nth-child(2) > :nth-child(4)';
    static circle = '.draw-tools-wrapper > :nth-child(2) > :nth-child(5)';
    static polygon = '.draw-tools-wrapper > :nth-child(2) > :nth-child(6)';
    static freehandPolygon = '.draw-tools-wrapper > :nth-child(2) > :nth-child(7)';

    // Annotation operations
    static info = '.draw-tools-wrapper > :nth-child(3) > .button';
    static fill = '.draw-tools-wrapper > :nth-child(4) > :nth-child(1)';
    static modify = '.draw-tools-wrapper > :nth-child(4) > :nth-child(2)';
    static addFreehand = ':nth-child(4) > :nth-child(3)';
    static removeFreehand = ':nth-child(4) > :nth-child(4)';
    static move = ':nth-child(4) > :nth-child(5)';
    static rotate = ':nth-child(4) > :nth-child(6)';
    static deleteAnnotation = ':nth-child(4) > :nth-child(7)';
    static undo = '.draw-tools-wrapper > :nth-child(5) > :nth-child(1)';
    static redo = '.draw-tools-wrapper > :nth-child(5) > :nth-child(2)';

    // Color channels
    

};
