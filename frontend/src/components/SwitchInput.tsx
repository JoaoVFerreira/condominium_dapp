
type Props = {
  id: string;
  text: string;
  isChecked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function SwitchInput(props: Props) {

  function onSwitchChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = ev.target.value === "true";
    ev.target.value = `${!isChecked}`;
    props.onChange(ev);
  }

  function getIsChecked(): boolean {
    return typeof props.isChecked === "string" ? props.isChecked === "true" : props.isChecked;
  }

  return (
    <div className="form-check form-switch d-flex align-items-center mb-3">
      <input className="form-check-input" type="checkbox" id={props.id} checked={getIsChecked()} onChange={onSwitchChange}/>
      <label className="form-check-label mb-0 ms-3" htmlFor={props.id}>{ props.text }</label>
    </div>
  )
}