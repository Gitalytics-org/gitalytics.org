import { useSearchParams } from "react-router-dom";

export default function useYearSelection(): number[] {
    const [searchParams] = useSearchParams();

    return searchParams.getAll("year").map(y => parseInt(y));
}
