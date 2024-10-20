import ColourInfo from "../components/colourInfo";
import Header from "../components/header";
import { Link, useParams } from "react-router-dom";

export default function ColourPage() {
    const { colourWord } = useParams()
    const colourName = colourWord || 'none'

    return (
        <>
            <Header />
            <Link to={".."} style={{textDecoration: 'none'}}>&#8656; Go back to list</Link>
            <ColourInfo colourName={colourName} />
        </>
    )
}