export type TestUser = {
    username: string;
    email: string;
    password: string;
};

export type TestTeam = {
    name: string;
    city: string;
    category: string;
    foundationYear: number;
    educationalCenter: string;
};

function randomSuffix() {
    return `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
}

function createPassword() {
    return crypto.randomUUID();
}

export function createTestUser(prefix = "e2e-user"): TestUser {
    const username = `${prefix}-${randomSuffix()}`;

    return {
        username,
        email: `${username}@example.com`,
        password: createPassword(),
    };
}

export function createTestTeam(prefix = "E2E Team"): TestTeam {
    return {
        name: `${prefix} ${randomSuffix()}`,
        city: "Igualada",
        category: "CHALLENGE",
        foundationYear: new Date().getUTCFullYear(),
        educationalCenter: "E2E Test School",
    };
}
