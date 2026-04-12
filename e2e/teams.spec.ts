import { expect, test } from "@playwright/test";
import { createTeamViaApi } from "./utils/api";
import { createTestTeam } from "./utils/test-data";

test("teams page renders a created team in the roster", async ({ page, request }) => {
    const team = createTestTeam();

    await createTeamViaApi(request, team);
    await page.goto("/teams");

    await expect(page.getByRole("heading", { name: "Teams", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Competition roster", level: 2 })).toBeVisible();

    const createdTeamCard = page.locator("li", { hasText: team.name }).first();

    await expect(createdTeamCard.getByText(team.name, { exact: true })).toBeVisible();
    await expect(createdTeamCard.getByText(team.city, { exact: true })).toBeVisible();
    await expect(createdTeamCard.getByText(`Category: ${team.category}`, { exact: true })).toBeVisible();
});
