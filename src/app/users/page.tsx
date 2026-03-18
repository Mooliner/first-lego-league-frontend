import { UsersService } from "@/api/userApi";
import PageShell from "@/app/components/page-shell";
import { serverAuthProvider } from "@/lib/authProvider";
import Link from "next/link";

export default async function UsersPage() {
    const service = new UsersService(serverAuthProvider)
    const users = await service.getUsers();

    return (
        <PageShell
            eyebrow="People directory"
            title="Users"
            description="The directory keeps the same data and links as before, now presented through a cleaner event-style interface."
        >
            <div className="space-y-6">
                <div className="space-y-3">
                    <div className="page-eyebrow">Registered users</div>
                    <h2 className="section-title">Directory</h2>
                    <p className="section-copy max-w-3xl">
                        User cards are purely visual. Clicking a username still takes you to
                        the same detail page and preserves the existing behavior.
                    </p>
                </div>

                <ul className="list-grid">
                    {users.map((user) => (
                        <li key={user.username} className="list-card pl-7">
                            <div className="list-kicker">User</div>
                            <Link
                                className="list-title block hover:text-primary"
                                href={`/users/${user.username}`}
                            >
                                {user.username}
                            </Link>
                            {user.email && (
                                <div className="list-support">{user.email}</div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </PageShell>
    );
}
