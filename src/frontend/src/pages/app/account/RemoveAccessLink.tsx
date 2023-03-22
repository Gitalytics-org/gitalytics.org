import Anchor from "~/elements/Anchor";

export default function RemoveAccessLink() {
    return <div>
        <p>In case you don&apos;t want us to have access to your account.</p>
        <p>It is possible to revoke our access <Anchor href="/api/auth/see-app" className="text-blue-500 hover:underline">here</Anchor>.</p>
    </div>;
}
