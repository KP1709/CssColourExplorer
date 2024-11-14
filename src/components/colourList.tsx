import { memo } from "react"
import { useQuery } from "@tanstack/react-query"
import startCase from "lodash.startcase"
import { getCssColours } from "../apiCalls";
import "../styles/colourList.css"
import ColourListItem from "./colourListItem";

type ColourList = { enteredColour: string, isLoading: boolean }
function ColourList({ enteredColour, isLoading }: ColourList) {

    const { data: cssColours } = useQuery({
        queryKey: ['cssColours'],
        queryFn: getCssColours,
        refetchOnWindowFocus: false
    })

    if (cssColours === undefined) return null;
    const queriedColours = cssColours.filter(colour => startCase(colour.name).toLowerCase().includes(enteredColour, 0))

    return (
            <ul style={{ opacity: isLoading ? 0.5 : 1 }}>
                {queriedColours.map(colours =>
                    <ColourListItem colourName={colours.name} hexColour={colours.hex} />
                )}
            </ul>
    )
}

export default memo(ColourList)