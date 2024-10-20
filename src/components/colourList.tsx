import { memo } from "react"
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid"
import { useQuery } from "@tanstack/react-query"
import startCase from "lodash.startcase"
import { getCssColours } from "../apiCalls";
import "../styles/colourList.css"


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
                        <li>{startCase(colours.name)}
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill={`#${colours.hex}`} d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
                            </svg>
                        </li>
                    </Link>
                )}
            </ul>
        </>
    )
}

export default memo(ColourList)

