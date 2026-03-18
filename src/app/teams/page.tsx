import { Button } from "@/app/components/button";
import PageShell from "@/app/components/page-shell";

export default function TeamsPage() {
    return (
        <PageShell
            eyebrow="Team management"
            title="Teams"
            description="This module keeps the original placeholder behavior while adopting the same visual language as the rest of the platform."
        >
            <div className="space-y-5">
                <div className="page-eyebrow">Placeholder module</div>
                <h2 className="section-title">Module under construction.</h2>
                <p className="section-copy max-w-3xl">
                    The interface now feels part of the same event system, but no actions,
                    routes or button behavior have been changed in this placeholder view.
                </p>
                <Button
                    type="button"
                    disabled
                    variant="secondary"
                    className="fll-disabled mt-2"
                >
                    Team list coming soon
                </Button>
            </div>
        </PageShell>
    );
}
