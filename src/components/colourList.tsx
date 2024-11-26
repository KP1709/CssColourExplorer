import { memo } from "react"
import { useQuery } from "@tanstack/react-query"
import startCase from "lodash.startcase"
import { getCssColours } from "../apiCalls";
import "../styles/colourList.css"
import ColourListItem from "./colourListItem";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid"

type ColourList = {
    enteredColour: string,
    isLoading: boolean,
    filterColour: string,
    filterTheme: string
}

function ColourList({ enteredColour, isLoading, filterColour, filterTheme }: ColourList) {

    const { data: cssColours } = useQuery({
        queryKey: ['cssColours'],
        queryFn: getCssColours,
        refetchOnWindowFocus: false
    })

    if (cssColours === undefined) return null;

    const filteredItems = () => {
        return cssColours.filter(color => {
            const matchesSearch = startCase(color.name).toLowerCase().includes(enteredColour.toLowerCase())
            const groupColour = filterColour === 'All' || color.group === filterColour
            const groupTheme = filterTheme === 'all' || filterTheme === 'All' || color.theme === filterTheme // Need to look into
            return matchesSearch && groupColour && groupTheme
        })
    }

    return (
        <>
        {filteredItems().length !== 0 ? <ul style={{ opacity: isLoading ? 0.5 : 1 }} id="colourList">
            { filteredItems().map(colours =>
                <Link className="list-item-link" to={colours.name} >
                    <li>
                        <ColourListItem colourName={colours.name} hexColour={colours.hex}/>
                    </li>
                </Link>
            ) }
        </ul> : <h2 id="colourList">No results matching this criteria</h2> }
        </>
    )
}

export default memo(ColourList)