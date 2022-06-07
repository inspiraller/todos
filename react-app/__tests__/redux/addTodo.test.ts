import { rdcPopulateTodos } from "src/store/data/todos/actionAndReducers/populateTodos";

import initialState from "src/store/data/todos/_initialState";

describe("populateTodos", () => {
  it("should populate Todos", () => {
    const result = rdcPopulateTodos({
      state: { ...initialState },
      payload: {
        pending: ['apple']
      },
    });
    expect(result.pending).toMatchObject(['apple']);
  });

});
