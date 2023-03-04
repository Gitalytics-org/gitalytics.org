import { useIsMutating } from "react-query";

export default function MutationOverlay() {
    const isMutating = useIsMutating();

    if (!isMutating) {
        return null;
    }

    return <div className="fixed inset-0 z-50 grid bg-black bg-opacity-25 backdrop-blur-sm place-content-center">
        <span className="text-[4vw]">
            Waiting for Changes
        </span>
    </div>;
}
