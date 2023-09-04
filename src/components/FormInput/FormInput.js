import "./FormInput.scss";
import errorIcon from "../../assets/icons/error-24px.svg";

const FormInput = ({ name, value, valid, handleChange, invalidWarning}) => {

  const label = name;

  const showWarning = !valid || invalidWarning;
  //console.log(`Received val  : ${value}`);

  return (
    <div className="inputContainer">
      <label className="input__label" htmlFor={name}>
        {name}
      </label>
      <input
        type={"text"}
        className={"input__value " + (!valid && "input__value--invalid")}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={name}
        onBlur={handleChange}
      />
    </div>
  );
};

export default FormInput;
