import { Button } from "@/app/components/button";
import PageShell from "@/app/components/page-shell";

export default function ScientificProjectsPage() {
    return (
        <PageShell
            eyebrow="Innovation project"
            title="Scientific Projects"
            description="The scientific projects area stays as the original placeholder, with only the presentation updated to match the new competition aesthetic."
        >
            <div className="space-y-5">
                <div className="page-eyebrow">Placeholder module</div>
                <h2 className="section-title">Module under construction.</h2>
                <p className="section-copy max-w-3xl">
                    FIRST LEGO League innovation projects deserve a stronger visual setting,
                    but the module is still intentionally read-only and disabled here.
                </p>
                <Button
                    type="button"
                    disabled
                    variant="secondary"
                    className="fll-disabled mt-2"
                >
                    Scientific project list coming soon
                </Button>
            </div>
        </PageShell>
    );
}
