import { test, expect } from "./fixtures";

// Lab is an async server component fetching the digest at request time —
// wrapping the tree in <MotionProvider> (Fase E) must not force it client.
// A DOM query after hydration can't tell "was server-rendered" apart from
// "client-rendered fast enough to beat this assertion", so this checks the
// raw HTTP response body instead of the page.

test("Lab's digest headline is present in the raw HTML response, not just the hydrated DOM", async ({
  request,
  baseURL,
}) => {
  const response = await request.get(baseURL ?? "/");
  const body = await response.text();
  expect(body).toContain("k3s 1.31 ships in-place node upgrades for single-node clusters");
});
