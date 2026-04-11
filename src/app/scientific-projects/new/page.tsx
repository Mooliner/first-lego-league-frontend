import { EditionsService } from "@/api/editionApi";
import PageShell from "@/app/components/page-shell";
import { serverAuthProvider } from "@/lib/authProvider";
import { getEncodedResourceId } from "@/lib/halRoute";
import NewScientificProjectForm from "./form";

export default async function NewScientificProjectPage() {
    const editions = await new EditionsService(serverAuthProvider).getEditions().catch(() => []);

    const editionOptions = editions.map(e => ({
        label: `${e.year}${e.venueName ? ` — ${e.venueName}` : ""}`,
        value: e.link("self")?.href ?? "",
    }));

    const teamsPerEdition: Record<string, { label: string; value: string }[]> = {};
    for (const edition of editions) {
        const editionHref = edition.link("self")?.href ?? "";
        const editionId = getEncodedResourceId(editionHref) ?? "";
        const teams = await new EditionsService(serverAuthProvider)
            .getEditionTeams(editionId)
            .catch(() => []);
        teamsPerEdition[editionHref] = teams.map(t => ({
            label: t.id ?? "",
            value: t.link("self")?.href ?? "",
        }));
    }

    return (
        <PageShell
            eyebrow="Innovation project"
            title="New Scientific Project"
            description="Submit a new scientific project for a FIRST LEGO League edition."
        >
            <NewScientificProjectForm
                editionOptions={editionOptions}
                teamsPerEdition={teamsPerEdition}
            />
        </PageShell>
    );
}
