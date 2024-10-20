import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import "../styles/loadingFallback.css"

type LoadingType = {
    loadingPhrase: string
}

export default function Loading({loadingPhrase}:LoadingType) {

    return (
        <main id="loading">
            <h2>{loadingPhrase}</h2>
            <FontAwesomeIcon aria-hidden='true' icon={faSpinner} spinPulse />
        </main>
    )
}