import { Resource } from "halfred";

export interface TeamEntity {
    uri?: string;
    id?: string;
    name?: string;
}

export type Team = TeamEntity & Resource;
