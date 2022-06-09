import React from 'react'
import {render as pureRender, waitFor as pureWaitFor, screen as pureScreen} from '@testing-library/react/pure' // prevent cleanup after test - https://github.com/testing-library/react-testing-library/issues/541#issuecomment-562601514

import WrapProvider from '__tests__/__utils__/react/WrapProvider'

/* eslint-disable @typescript-eslint/no-explicit-any */
const renderPure = async (Comp: React.ComponentType<any>, textRendered: string) => {
  const view = pureRender

  const utils = view(
    <WrapProvider>
      <Comp />
    </WrapProvider>
  )
  const regTestTextExists = RegExp(textRendered, 'i')

  const screenType = pureScreen

  /* eslint-disable testing-library/prefer-screen-queries */
  const wait = pureWaitFor
  await wait(() => screenType.findByText(regTestTextExists))
  return utils
}

// USING beforeAll
// - What not to do - but works ?
// - ref: https://kentcdodds.com/blog/write-fewer-longer-tests

/* ESSENTIAL 
# When pre-rendering with beforeAll
- FUNDAMENTALLY - render, waitFor, screen should not be imported into the same page as pure/render,waitFor,screen etc - So renderPure and renderPage should be on separate page includes
- DO NOT INCLUDE ANOTHER RENDER IN THE .TEST.TSX FILE. OTHERWISE THIS BEFORE WILL PROBABLY HAVE RACE CONDITION AND NOT LOAD MSW SERVER.LISTEN
- DO NOT GET FROM SCREEN AND INSTEAD GET FROM RENDERED. 
- YOU WILL NEED THESE eslint rules disabled
/* eslint-disable testing-library/no-wait-for-side-effects, testing-library/prefer-screen-queries */
/* eslint-disable  @typescript-eslint/no-explicit-any */

export default renderPure;
