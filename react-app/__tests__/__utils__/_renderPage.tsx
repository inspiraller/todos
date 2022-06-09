import React from 'react'
import {render, waitFor, screen} from '@testing-library/react' 
import WrapProvider from '__tests__/__utils__/WrapProvider'

/* eslint-disable @typescript-eslint/no-explicit-any */
const renderPage = async (Comp: React.ComponentType<any>, textRendered: string) => {
  const view = render
  const utils = view(
    <WrapProvider>
      <Comp />
    </WrapProvider>
  )
  const regTestTextExists = RegExp(textRendered, 'i')
  const screenType = screen
  const wait = waitFor
  
  /* eslint-disable testing-library/prefer-screen-queries */
  await wait(() => screenType.findByText(regTestTextExists))
  return utils
}


export default renderPage;
