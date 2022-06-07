import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import WrapProvider from "__tests__/__utils__/WrapProvider";
import Todos from "src/pages/todos";

const RENDERED_TEXT = 'Todos';

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

describe("<Todos>", () => {
  describe("onload", () => {
    beforeAll(async () => {
      rendered = await renderPage();
    });
    it(`Should render page with text - ${RENDERED_TEXT}`, () => {
      expect(rendered);
    });
  });
});
