import React, { memo } from "react"
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

    const { data: cssColours, isError } = useQuery({
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

    const DisplayResults = (): React.ReactNode => {
        if (filteredItems().length !== 0 && !isError) {
            return (<ul style={{ opacity: isLoading ? 0.5 : 1 }} data-test="colour-list-results" >
                {filteredItems().map(colours =>
                    <Link className="list-item-link" to={colours.name} key={uuid()}>
                        <li>
                            <ColourListItem colourName={colours.name} hexColour={colours.hex} />
                        </li>
                    </Link>
                )}
            </ul>)
        }
        else if (filteredItems.length === 0 && !isError) {
            return (<h2>No results matching this criteria</h2>)
        }
        else if (isError) {
            return (<h2>Error in fetching colours</h2>)
        }
    }

    return (
        <div id="colourList">
            <DisplayResults />
        </div>
    )
}

export default memo(ColourList)