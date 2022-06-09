import { cleanup } from '@testing-library/react/pure' // prevent cleanup after test - https://github.com/testing-library/react-testing-library/issues/541#issuecomment-562601514
import Todos from 'src/pages/todos'
import renderPage from '../__utils__/_renderPage'

const TEXT_RENDERED_PAGE = 'Todos'

describe('<Todos>', () => {
  describe('onload', () => {
    afterEach(() => {
      cleanup()
      jest.resetAllMocks()
    })
    it(`Should render page with text - ${TEXT_RENDERED_PAGE}`, async () => {
      const view = await renderPage(Todos, TEXT_RENDERED_PAGE)
      expect(view)
    })
  })
})
