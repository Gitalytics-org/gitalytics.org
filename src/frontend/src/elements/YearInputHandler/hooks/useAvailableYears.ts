import { useQuery } from "react-query";
import axios from "axios";


type ActiveYears = number[]
type ActiveYearsResponse = {
    active_years: ActiveYears,
}
type SortedActiveYears = ActiveYears;

function getCurrentYear() {
    return new Date().getFullYear();
}

export function useAvailableYears(): SortedActiveYears {
    const activeYearsResult = useQuery<ActiveYearsResponse>(
        ["active-years"],
        () => axios
            .get<ActiveYearsResponse>("/active-years")
            .then(response => response.data),
    );

    if (!activeYearsResult.isSuccess) {
        return [getCurrentYear()];
    }

    const sortedActiveYears = activeYearsResult.data.active_years.sort((a, b) => a - b);
    return sortedActiveYears;
}
