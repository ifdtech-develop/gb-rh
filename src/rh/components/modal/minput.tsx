type Props={
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  label: string;
  value: string;
  // props for input
  onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  placeholder?: React.InputHTMLAttributes<HTMLInputElement>["placeholder"];
  disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
  required?: React.InputHTMLAttributes<HTMLInputElement>["required"];
  // props for textarea
  rows?: React.TextareaHTMLAttributes<HTMLTextAreaElement>["rows"];
  cols?: React.TextareaHTMLAttributes<HTMLTextAreaElement>["cols"];
  wrap?: React.TextareaHTMLAttributes<HTMLTextAreaElement>["wrap"];
  // props for select
  options?: { value: string; label: string }[];
  multiple?: React.SelectHTMLAttributes<HTMLSelectElement>["multiple"];
  size?: React.SelectHTMLAttributes<HTMLSelectElement>["size"];
  // props for checkbox
  checked?: React.InputHTMLAttributes<HTMLInputElement>["checked"];
  // props for radio
  name?: React.InputHTMLAttributes<HTMLInputElement>["name"];
  // props for file
  accept?: React.InputHTMLAttributes<HTMLInputElement>["accept"];
  // props for button
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  // props for label
  htmlFor?: React.LabelHTMLAttributes<HTMLLabelElement>["htmlFor"];



}

export const MInput = ({...props}:Props) => {
    return (
      <div className="flex flex-col mx-4">
      <label
        htmlFor="label"
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <div className="mt-1">
        <input
          type={props.type}
          name={props.label}
          id={props.label}
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500  sm:text-sm border-gray-300 rounded-md"
          placeholder="Nome"
          value={props.value}
          {...props}
        />
      </div>
    </div>
    )
}