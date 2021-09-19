import React from 'react'
import {render, fireEvent, screen, act} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../../App'

describe("Login render Page", () => {
  it('renders the Login page', () => {
    const {getByText} = render(<App/>);
    expect(getByText(/login/i)).toBeInTheDocument();
  });

  it('render 2 input components', () => {
    const {getByLabelText} = render(<App/>);
    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    const {getByText} = render(<App/>);
    expect(getByText("Submit")).toBeInTheDocument();
  });
});

describe("Form behaviour",  () => {
  it('validate user inputs, and provides error messages', async () => {
    const { getByTestId, getByText } = render(<App/>)

    await act (async () => {
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: {value: ''},
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: {value: ''},
      })
    });

    await act (async () => {
      fireEvent.submit(getByTestId('form'))
    });

    expect(getByText("User Name is required")).toBeInTheDocument();
    expect(getByText("Password is required")).toBeInTheDocument();
  });

  it('should submit when form inputs contain text', async () => {
    const { getByTestId, queryByText } = render(<App/>)

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: {value: 'shaquille'},
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: {value: 'oatmeal'},
      })
    });

    await act (async () => {
      fireEvent.submit(getByTestId('form'))
    });

    expect(queryByText("User Name is required")).not.toBeInTheDocument();
    expect(queryByText("Password is required")).not.toBeInTheDocument();
  });
});

describe('user logs in successfully and token added to localstorage', () => {
  it('allows the user to login successfully', async () => {

    // mock window.fetch for the test
    const UserResponse = {token: 'user_token'}

    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(UserResponse),
      })
    });

    // Render the Login component
    const { getByTestId } = render(<App />);

    // fill out the form
    await act (async () => {
      fireEvent.change(screen.getByLabelText(/Username/i), {
        target: {value: 'shaquille'},
      });

      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: {value: 'oatmeal'},
      })
    });

    //Submit the form
    await act (async () => {
      fireEvent.submit(getByTestId('form'))
    });

    // alert to show up before continuing with our assertions.
    // Expect alert to be success
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/congrats/i)

    // Expect local token to be set
    expect(window.localStorage.getItem('token')).toEqual(UserResponse.token)
  })
});







