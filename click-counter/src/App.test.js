import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter });

const setupWrapper = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props}/>);
  state && wrapper.setState(state);

  return wrapper;
}

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

describe('render pager', () => {
  it('should render without error', () => {
    const wrapper = setupWrapper();
    const AppComponent = findByTestAttr(wrapper, "component-app");
  
    expect(AppComponent.length).toBe(1);
  });
  
  it('should render counter display', () => {
    const wrapper = setupWrapper();
    const CounterDisplay = findByTestAttr(wrapper, "counter-display");
  
    expect(CounterDisplay.length).toBe(1);
  });
  
  it('should counter state starts at 0', () => {
    const wrapper = setupWrapper();
    const counterState = wrapper.state("counter");
  
    expect(counterState).toEqual(0);
  });

  it('should hide negative notification', () => {
    const wrapper = setupWrapper();
    const Notification = findByTestAttr(wrapper, "notification");

    expect(Notification.length).toBe(0);
  });
});

describe('Increment', () => {
  it('should render increment button', () => {
    const wrapper = setupWrapper();
    const IncrementButton = findByTestAttr(wrapper, "increment-button");
  
    expect(IncrementButton.length).toBe(1);
  });

  it('should increase by 1 after clicking increment button', () => {
    const counter = 7;
    const wrapper = setupWrapper(null, { counter });

    const IncrementButton = findByTestAttr(wrapper, "increment-button");
    IncrementButton.simulate("click");
    wrapper.update();

    const CounterDisplay = findByTestAttr(wrapper, "counter-display");
    
    expect(CounterDisplay.text()).toContain(counter + 1);
  });

  it('should disable notification when click increment button', () => {
    const counter = 0;
    const error = true;
    const wrapper = setupWrapper(null, { counter, error });

    let Notification = findByTestAttr(wrapper, "notification");
    expect(Notification.length).toBe(1);

    const IncrementButton = findByTestAttr(wrapper, "increment-button");
    IncrementButton.simulate("click");
    wrapper.update();

    Notification = findByTestAttr(wrapper, "notification");
    const CounterDisplay = findByTestAttr(wrapper, "counter-display");

    expect(Notification.length).toBe(0);
    expect(CounterDisplay.text()).toContain(1);
  });
});

describe('Decrement', () => {
  it('should render decrement button', () => {
    const wrapper = setupWrapper();
    const DecrementButton = findByTestAttr(wrapper, "decrement-button");
  
    expect(DecrementButton.length).toBe(1);
  });

  it('should increase by 1 after clicking increment button', () => {
    const counter = 7;
    const wrapper = setupWrapper(null, { counter });

    const DecrementButton = findByTestAttr(wrapper, "decrement-button");
    DecrementButton.simulate("click");
    wrapper.update();

    const CounterDisplay = findByTestAttr(wrapper, "counter-display");
    
    expect(CounterDisplay.text()).toContain(counter - 1);
  });

  describe('should render notification when counter = 0 and click decrement button', () => {
    const wrapper = setupWrapper();

    const DecrementButton = findByTestAttr(wrapper, "decrement-button");
    DecrementButton.simulate("click");
    wrapper.update();

    const Notification = findByTestAttr(wrapper, "notification");

    expect(Notification.length).toBe(1);
  });
});

