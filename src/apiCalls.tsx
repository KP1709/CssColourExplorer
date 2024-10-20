import axios from "axios";

type cssColoursType = {
    name: string,
    theme: string,
    group: string,
    hex: string,
    rgb: string
}

// Additional info not from CSS colours rest API but The Color API
type cssColourMoreType = {
    hsl: { value: string },
    hsv: { value: string },
    cmyk: { value: string },
    XYZ: { value: string }
}

export const getCssColours = async (): Promise<cssColoursType[]> => {
    const response = await axios.get("https://www.csscolorsapi.com/api/colors")
    return response.data.colors
}

export const getSpecificColourInfo = async (selectedColour: string): Promise<cssColoursType> => {
    const response = await axios.get(`https://www.csscolorsapi.com/api/colors/${selectedColour}`)
    return response.data.data
}

export const getAdditionalSpecificColourInfo = async (selectedColour: string): Promise<cssColourMoreType> => {
    const response = await axios.get(`https://www.thecolorapi.com/id?hex=${selectedColour}`)
    return response.data
}