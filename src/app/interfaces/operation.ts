import { EndPoints } from "../types";

export interface Operation{
    endpoint: EndPoints;
    body: Object | null;
}