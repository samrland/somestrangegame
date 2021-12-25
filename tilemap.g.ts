// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile10 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile11 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile12 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile13 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile14 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`100010000101010101010101010101010101010101020101010101010101010102010101010101050101010101010101010101010101010101010101020101010101010101010102010101010101010101020101010101010101020101010101010101010101010101010408080703060101020101020101020109010101010901010101010101010101090101010109010101010101010101010b080808080a01010101010101020101010101010101020101010101010101010101010102010101010101010101010201010101010101010101010201010101010101010101010501010101010101010101020101010101010101010101010101010101010101010102`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . 2 . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . 2 2 2 2 . 2 . . . . 
. . . . . . 2 . . . . 2 . . . . 
. . . . . . 2 . . . . 2 . . . . 
. . . . . . 2 2 2 2 2 2 . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . 2 . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile7,myTiles.tile6,myTiles.tile3,myTiles.tile10,myTiles.tile11,myTiles.tile5,myTiles.tile8,myTiles.tile13,myTiles.tile14], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "grass":
            case "tile1":return tile1;
            case "flowers":
            case "tile2":return tile2;
            case "corner0":
            case "tile6":return tile6;
            case "block":
            case "tile3":return tile3;
            case "end0":
            case "tile4":return tile4;
            case "end1":
            case "tile10":return tile10;
            case "end2":
            case "tile11":return tile11;
            case "end3":
            case "tile12":return tile12;
            case "wall0":
            case "tile5":return tile5;
            case "wall1":
            case "tile8":return tile8;
            case "corner1":
            case "tile9":return tile9;
            case "corner2":
            case "tile13":return tile13;
            case "corner3":
            case "tile14":return tile14;
            case "door":
            case "tile7":return tile7;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
