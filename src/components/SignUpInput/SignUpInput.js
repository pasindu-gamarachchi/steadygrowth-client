
import "./SignUpInput.scss"

const SignUpInput =({ label, name, type }) => {
    return (
        <div className="field">
            <label htmlFor={name} className="field__label">
                {label}
            </label>
            <input type={type} id={name} name={name} className="field__input" />
        </div>
    );
}

export default SignUpInput;