import { lazy, Suspense, useTransition, useDeferredValue, useState } from "react";
import "../styles/colourExplorer.css"
const ColourList = lazy(() => import("./colourList"))
import Loading from "./loadingFallback";

export default function colourExplorer() {
    const [enteredColour, setEnteredColor] = useState<string>("")
    const deferredEnteredColour = useDeferredValue(enteredColour)
    const isLoading = enteredColour !== deferredEnteredColour
    const [selectedGroup, setSelectedGroup] = useState<string>("All")
    const [selectedTheme, setSelectedTheme] = useState<string>("All")
    const [colourGroupFilterList,] = useState<string[]>(['All', 'Red', 'Aqua', 'Blue', 'Brown', 'Cyan', 'Gray', 'Green', 'Orange', 'Pink', 'Purple', 'Yellow'])
    const [colourThemeFilterList,] = useState<string[]>(['All', 'Light', 'Dark'])
    const [, startTransition] = useTransition()

    function setSelectedFilterGroup(selectedColourGroup: string) {
        startTransition(() => {
            setTimeout(() => {
                setSelectedGroup(selectedColourGroup)
            }, 1000)
        })
    }

    function setSelectedFilterTheme(selectedColourTheme: string) {
        startTransition(() => {
            setTimeout(() => {
                setSelectedTheme(selectedColourTheme)
            }, 1000)
        })
    }

    return (
        <main id="colourExplorer">
            <div id="colourNameFormItem" data-test="colour-explorer-page">
                <label htmlFor="colourName">Colour name:</label>
                <input type="search"
                    id="colourName"
                    name="colourName"
                    value={enteredColour}
                    onChange={(e) => setEnteredColor(e.target.value.toLowerCase())}
                    placeholder="apricot"
                    aria-label="Search through all CSS colours"
                />
            </div>

            <div id="colourGroupFormItem">
                <label htmlFor="colourGroup">Colour group: </label>
                <select
                    id="colourGroup"
                    name="colourGroup"
                    onChange={(e) => setSelectedFilterGroup(e.target.value)}
                    aria-label="Select a css colour group to filter"
                    data-test="colour-group-select"
                >
                    {colourGroupFilterList.map(colour => <option value={colour}>{colour}</option>)}
                </select>
            </div>

            <div id="colourThemeFormItem">
                <label htmlFor="colourTheme">Colour theme: </label>
                <select
                    id="colourTheme"
                    name="colourTheme"
                    onChange={(e) => setSelectedFilterTheme(e.target.value)}
                    aria-label="Select a css colour theme to filter"
                    data-test="colour-theme-select"
                >
                    {colourThemeFilterList.map(theme => <option value={theme.toLowerCase()}>{theme}</option>)}
                </select>
            </div>

            <Suspense fallback={<Loading loadingPhrase="Loading CSS colours" />}>
                <ColourList enteredColour={deferredEnteredColour} filterColour={selectedGroup} filterTheme={selectedTheme} isLoading={isLoading} />
            </Suspense>
        </main>
    )
}