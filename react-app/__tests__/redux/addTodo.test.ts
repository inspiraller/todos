import { rdcPopulateTodos } from "src/store/data/todos/actionAndReducers/populateTodos";

import initialState from "src/store/data/todos/_initialState";

describe("populateTodos", () => {
  it("should populate Todos", () => {
    const pending =  [{ id: 1, todoText: "apple" }]
    const result = rdcPopulateTodos({
      state: { ...initialState },
      payload: {
        pending
      },
    });
    expect(result.pending).toMatchObject(pending);
  });
});
