import { memo } from "react"
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid"
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
        <>
            <ul style={{ opacity: isLoading ? 0.5 : 1 }}>
                {queriedColours.map(colours =>
                    <Link className="list-item-link" to={colours.name} key={uuid()}>
                        <li>
                            <ColourListItem colourName={colours.name} hexColour={colours.hex}/>
                        </li>
                    </Link>
                )}
            </ul>
        </>
    )
}

export default memo(ColourList)

