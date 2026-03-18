import { EditionsService } from "@/api/editionApi";
import PageShell from "@/app/components/page-shell";
import { serverAuthProvider } from "@/lib/authProvider";
import { Edition } from "@/types/edition";

export default async function EditionsPage() {
    let editions: Edition[] = [];
    let error: string | null = null;

    try {
        const service = new EditionsService(serverAuthProvider);
        editions = await service.getEditions();
    } catch (e) {
        console.error("Failed to fetch editions:", e);
        error = "Failed to load editions.";
    }

    return (
        <PageShell
            eyebrow="Competition archive"
            title="Editions"
            description="Browse the yearly editions of the competition with the same data flow and visibility rules already present in the application."
        >
            <div className="space-y-6">
                <div className="space-y-3">
                    <div className="page-eyebrow">Edition list</div>
                    <h2 className="section-title">Season overview</h2>
                    <p className="section-copy max-w-3xl">
                        This section preserves the original loading, error and empty-state
                        behavior while presenting each edition with a clearer editorial layout.
                    </p>
                </div>

                {error && (
                    <p className="border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                        {error}
                    </p>
                )}

                {!error && editions.length === 0 && (
                    <p className="border border-border bg-background/80 px-4 py-3 text-sm text-muted-foreground">
                        No editions found.
                    </p>
                )}

                <ul className="list-grid">
                    {editions.map((edition, index) => (
                        <li key={edition.uri ?? index} className="list-card pl-7">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="min-w-0 space-y-2">
                                    <div className="list-kicker">Edition</div>
                                    <div className="list-title">{edition.year}</div>
                                    {edition.venueName && (
                                        <div className="list-support">{edition.venueName}</div>
                                    )}
                                    {edition.description && (
                                        <div className="list-support">{edition.description}</div>
                                    )}
                                </div>
                                {edition.state && (
                                    <div className="status-badge">{edition.state}</div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </PageShell>
    );
}
