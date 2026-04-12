import { APIRequestContext, expect } from "@playwright/test";
import { TestTeam, TestUser } from "./test-data";

const ADMIN_TEST_USER = {
    username: "admin",
    password: "password",
} as const;

type BasicAuthCredentials = Pick<TestUser, "username" | "password">;

function trimTrailingSlashes(value: string) {
    let end = value.length;

    while (end > 0 && value.codePointAt(end - 1) === 47) {
        end -= 1;
    }

    return value.slice(0, end);
}

export function getApiBaseUrl() {
    const baseUrl = process.env.E2E_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
        throw new Error("E2E_API_BASE_URL or NEXT_PUBLIC_API_BASE_URL must be set for Playwright API helpers.");
    }

    return trimTrailingSlashes(baseUrl);
}

function getBasicAuthHeader(user: BasicAuthCredentials) {
    const token = Buffer.from(`${user.username}:${user.password}`).toString("base64");
    return `Basic ${token}`;
}

export async function createUserViaApi(request: APIRequestContext, user: TestUser) {
    const baseUrl = getApiBaseUrl();
    const response = await request.post(`${baseUrl}/users`, {
        headers: {
            Accept: "application/hal+json",
            "Content-Type": "application/json",
        },
        data: {
            id: user.username,
            email: user.email,
            password: user.password,
        },
    });

    expect(response.status(), await response.text()).toBe(201);
}

export async function createTeamViaApi(
    request: APIRequestContext,
    team: TestTeam
) {
    const baseUrl = getApiBaseUrl();
    const response = await request.post(`${baseUrl}/teams`, {
        headers: {
            Accept: "application/hal+json",
            "Content-Type": "application/json",
            Authorization: getBasicAuthHeader(ADMIN_TEST_USER),
        },
        data: {
            name: team.name,
            city: team.city,
            category: team.category,
            foundationYear: team.foundationYear,
            educationalCenter: team.educationalCenter,
        },
    });

    expect(response.status(), await response.text()).toBe(201);
}
