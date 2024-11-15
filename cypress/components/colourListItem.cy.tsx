import React from 'react'
import ColourListItem from "../../src/components/colourListItem"
import "../../src/styles/colourListItem.css"
import "../../src/styles/colourList.css"
import { mount } from 'cypress/react18'

describe('<ColourListItem />', () => {
  it('renders colourListItems', () => {
    mount(<ul>
      <li><ColourListItem colourName={'Dark Slate Blue'} hexColour={'483D8B'} /></li>
      <li><ColourListItem colourName={'Dark Cyan'} hexColour={'008B8B'} /></li>
      <li><ColourListItem colourName={'Medium Violet Red'} hexColour={'C71585'} /></li>
      <li><ColourListItem colourName={'Rebecca Purple'} hexColour={'663399'} /></li>
      <li><ColourListItem colourName={'Rosy Brown'} hexColour={'BC8F8F'} /></li>
    </ul>
    )
  })
})