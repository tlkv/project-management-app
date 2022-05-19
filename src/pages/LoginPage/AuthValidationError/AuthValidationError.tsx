import AuthValidationErrorProps from '../../../data/interfacesP';

export default function AuthValidationError({ field, input }: AuthValidationErrorProps) {
  let element;
  if (field === 'name') {
    element =
      input.length < 2 ? (
        <div className="login__invalid-field">Name must contain at least 2 symbols</div>
      ) : (
        <div className="login__invalid-field">Name must contain only letters</div>
      );
  }
  if (field === 'login') {
    element =
      input.length < 4 ? (
        <div className="login__invalid-field">Login must contain at least 4 symbols</div>
      ) : (
        <div className="login__invalid-field">Login must contain only letters and digits</div>
      );
  }
  if (field === 'password') {
    element =
      input.length < 8 ? (
        <div className="login__invalid-field">Password must contain at least 8 symbols</div>
      ) : (
        <div className="login__invalid-field">Password must contain only letters and digits</div>
      );
  }
  return element as JSX.Element;
}
