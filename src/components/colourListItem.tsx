import startCase from "lodash.startcase";
import { v4 as uuid } from "uuid"
import "../styles/colourListItem.css"
import { Link } from "react-router-dom";

type ColourListItem = {
    colourName: string,
    hexColour: string
}
export default function ColourListItem({ colourName, hexColour }: ColourListItem) {
    return (
        <Link className="list-item-link" to={colourName} key={uuid()}>
            <li>
                {startCase(colourName)}
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill={`#${hexColour}`} d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
                </svg>
            </li>
        </Link>
    )
}