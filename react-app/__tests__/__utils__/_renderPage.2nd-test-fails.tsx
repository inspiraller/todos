import React from 'react'
import {render as pureRender, waitFor as pureWaitFor, screen as pureScreen} from '@testing-library/react/pure' // prevent cleanup after test - https://github.com/testing-library/react-testing-library/issues/541#issuecomment-562601514
import { render, waitFor, screen } from '@testing-library/react' // prevent cleanup after test - https://github.com/testing-library/react-testing-library/issues/541#issuecomment-562601514

import WrapProvider from '__tests__/__utils__/WrapProvider'
import Todos from 'src/pages/todos'


export const TEXT_RENDERED_PAGE = 'Todos'

const renderPage = async (options? : {isPure?: boolean}) => {
  const view = options?.isPure ? pureRender : render;

  const utils = view(
    <WrapProvider>
      <Todos />
    </WrapProvider>
  )
  const regTestTextExists = RegExp(TEXT_RENDERED_PAGE, 'i')

  const screenType = options?.isPure ? pureScreen : screen;

  /* eslint-disable testing-library/prefer-screen-queries */
  const wait = options?.isPure ? pureWaitFor : waitFor;
  await wait(() => screenType.findByText(regTestTextExists))
  return utils
}

// USING beforeAll
// - What not to do - but works ?
// - ref: https://kentcdodds.com/blog/write-fewer-longer-tests

/* ESSENTIAL 
# When pre-rendering with beforeAll
- DO NOT INCLUDE ANOTHER RENDER IN THE .TEST.TSX FILE. OTHERWISE THIS BEFORE WILL PROBABLY HAVE RACE CONDITION AND NOT LOAD MSW SERVER.LISTEN
- DO NOT GET FROM SCREEN AND INSTEAD GET FROM RENDERED. 
- YOU WILL NEED THESE eslint rules disabled
/* eslint-disable testing-library/no-wait-for-side-effects, testing-library/prefer-screen-queries */
/* eslint-disable  @typescript-eslint/no-explicit-any */

export default renderPage;