import { useSearchParams } from "react-router-dom";


function getCurrentYear() {
    return new Date().getFullYear();
}

// TODO: resolve naming/usage conflict with /elements/YearInputHandler/hooks/...
export default function useYearSelection(): number[] {
    const [searchParams] = useSearchParams();

    const years = searchParams.getAll("year").map(y => parseInt(y));

    return years.length ? years : [getCurrentYear()];
}
