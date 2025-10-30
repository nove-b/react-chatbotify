import { renderHook, act } from "@testing-library/react";
import { useSyncedRefState } from "../../../src/hooks/internal/useSyncedRefState";

describe("useSyncedRefState", () => {
	it("should initialize state and ref with initial value", () => {
		const { result } = renderHook(() => useSyncedRefState("hello"));
		const [state, , ref] = result.current;
		expect(state).toBe("hello");
		expect(ref.current).toBe("hello");
	});

	it("should update state and ref when setSyncedState is called with a value", () => {
		const { result } = renderHook(() => useSyncedRefState(0));
		const [, setSyncedState] = result.current;

		act(() => {
			setSyncedState(42);
		});

		const [stateAfter, , refAfter] = result.current;
		expect(stateAfter).toBe(42);
		expect(refAfter.current).toBe(42);
	});

	it("should update state and ref when setSyncedState is called with a function", () => {
		const { result } = renderHook(() => useSyncedRefState(10));
		const [, setSyncedState] = result.current;

		act(() => {
			setSyncedState(prev => prev + 5);
		});

		const [stateAfter, , refAfter] = result.current;
		expect(stateAfter).toBe(15);
		expect(refAfter.current).toBe(15);
	});

	it("should keep state and ref in sync after multiple updates", () => {
		const { result } = renderHook(() => useSyncedRefState([1, 2]));
		const [, setSyncedState] = result.current;

		act(() => {
			setSyncedState([3, 4]);
			setSyncedState(prev => [...prev, 5]);
		});

		const [stateAfter, , refAfter] = result.current;
		expect(stateAfter).toEqual([3, 4, 5]);
		expect(refAfter.current).toEqual([3, 4, 5]);
	});
});