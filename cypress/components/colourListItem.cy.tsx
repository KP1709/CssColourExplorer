import React from 'react'
import ColourListItem from "../../src/components/colourListItem"
import "../../src/styles/colourListItem.css"
import { mount } from 'cypress/react18'

describe('<ColourListItem />', () => {
  it('renders Tan list item', () => {
    mount(<ul><li><ColourListItem colourName={'Dark'} hexColour={'483D8B'} /></li></ul>)
  })
})