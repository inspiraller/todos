import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import WrapProvider from "__tests__/__utils__/WrapProvider";
import Todos from "src/pages/todos";

import { mswServerAll } from '__tests__/msw/msw_mock_ajax';
import mockTodos from '__tests__/msw/mockTodos.json';

const RENDERED_TEXT = 'Todos';

const server = mswServerAll();

const renderPage = async () => {
  const result = render(
    <WrapProvider>
      <Todos />
    </WrapProvider>
  );
  const regTestTextExists = RegExp(RENDERED_TEXT, 'i');
  await waitFor(() => screen.getByText(regTestTextExists));
  return result;
};

let rendered: any;

const RENDERED_ARTICLE = mockTodos.completed[0].todoText;

describe("<Todos>", () => {
  describe('onload', () => {
    it(`Should render page with text - ${RENDERED_TEXT}`, () => {
      expect(rendered);
    });
  })
  describe("loaded mock data", () => {
    beforeAll(async () => {
      server.listen();
      rendered = await renderPage();
    });
    afterAll(() => {
      server.close();
    });

    it(`Should render page with article text - ${RENDERED_ARTICLE}`, async () => {
      const regTestTextExists = RegExp(RENDERED_ARTICLE, 'i');
      await waitFor(() => screen.getByText(regTestTextExists));
      expect(rendered);
    });
  });
});
