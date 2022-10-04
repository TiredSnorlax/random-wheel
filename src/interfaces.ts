export interface ISectorParams {
    title: string;
    angle: number;
    rotation: number;
    color: string;
}

export interface ISectorItem {
    params: ISectorParams;
    id: number;
}

export interface IPresets {
    title: string;
    paramTitles: string[];
    id: number;
}
