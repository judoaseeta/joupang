import Observable from '../observable.js';

test('testing Observable',() => {
    const mockInitialState = {
        userName: 'Jake'
    };
    const observable = new Observable(mockInitialState);
    // getState should return the same state as mockInitialState;
    expect(observable.getState()).toEqual(mockInitialState);
    const mockSubscriber = jest.fn();
    observable.subscribe(mockSubscriber);
    // update observable state should 
    observable.update({
        password: '1234'
    });
    const expectedState1 = {
        ...mockInitialState,
        password: '1234'
    }
    expect(mockSubscriber.mock.calls[0][0]).toEqual(expectedState1);

    const mock2= jest.fn();
    const mockSubscriber2 = (state) => mock2(state.map);
    const mockUpdateValue = {
        map: {
            postId: 'abcd',
            postYear: 1994
        }
    }
    observable.subscribe(mockSubscriber2)
    observable.update(mockUpdateValue);
    expect(mock2.mock.calls[0][0]).toEqual(mockUpdateValue.map);

    observable.unsubscribe(mockSubscriber2)
    observable.update(mockUpdateValue);
    expect(mock2.mock.calls.length).toEqual(1);
})