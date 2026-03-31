import type { AuthStrategy } from "@/lib/authProvider";
import { Team } from "@/types/team";
import { getHal, mergeHalArray } from "./halClient";

export class TeamService {
    constructor(private readonly authStrategy: AuthStrategy) { }

    async getTeams(): Promise<Team[]> {
        const resource = await getHal('/teams', this.authStrategy);
        const embedded = resource.embeddedArray('teams') || [];
        return mergeHalArray<Team>(embedded);
    }
}
