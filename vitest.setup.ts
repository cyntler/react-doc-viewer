import "@testing-library/jest-dom";
import "core-js/proposals/promise-with-resolvers";
import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();
