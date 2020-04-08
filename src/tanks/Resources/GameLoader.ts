import { Loader } from "excalibur";
import * as textures from "./Textures";
import {chain} from "iterable-chain";
import {objectGenerator} from "iterable-chain/lib/generators";

export class GameLoader extends Loader {
    constructor() {
        super();
        this.addResources(chain(objectGenerator(textures)).map(x => x.value).toArray());
        this.suppressPlayButton = true;
    }
}