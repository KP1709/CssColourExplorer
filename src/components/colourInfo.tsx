import { getSpecificColourInfo } from "../apiCalls";
import { getAdditionalSpecificColourInfo } from "../apiCalls";
import { useQuery } from "@tanstack/react-query";
import startCase from "lodash.startcase"
import "../styles/colourInfo.css"
import Loading from "./loadingFallback";

type ColourInfoType = {
    colourName: string
}

export default function ColourInfo({colourName}:ColourInfoType) {

    const { data: cssColour, isLoading: isLoadingInfo, isError: isErrorInfo } = useQuery({
        queryKey: ['colourInfo', colourName],
        queryFn: () => getSpecificColourInfo(colourName),
        refetchOnWindowFocus: false,
        enabled: !!colourName
    })

    const hexValue = cssColour?.hex || 'none' // Making sure value isn't undefined
    
    const { data: cssColourMore, isLoading: isLoadingMoreInfo, isError: isErrorMoreInfo } = useQuery({
        queryKey: ['moreColourInfo', hexValue],
        queryFn: () => getAdditionalSpecificColourInfo(hexValue),
        enabled: !!hexValue
    });
    
    // To meet the rules of React hook, these conditions must placed after the hooks
    if (isLoadingInfo || isLoadingMoreInfo) return <Loading loadingPhrase="Loading colour info"/>;
    if (isErrorInfo || (cssColour && isErrorMoreInfo)) return <div>Error - Unable to get color information.</div>;
    
    return (
        <>
            <main id="colour-info">
                    <>
                    <h2>{startCase(colourName)}</h2>
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill={`#${cssColour?.hex}`} d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
                        </svg>
                        <p id="css__colour-hex">#{hexValue.toUpperCase()}</p>
                        <p id="css__colour-rgb">rgb({cssColour?.rgb})</p>
                        <p id="css__colour-hsv"> {cssColourMore?.hsv.value}</p>
                        <p id="css__colour-hsl"> {cssColourMore?.hsl.value}</p>
                        <p id="css__colour-xyz">{cssColourMore?.XYZ.value}</p>
                        <p id="css__colour-cmyk">{cssColourMore?.cmyk.value}</p>
                    </>
            </main>
        </>
    )
}