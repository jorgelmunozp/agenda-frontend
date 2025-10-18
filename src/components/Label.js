import '../assets/styles/scss/Label.scss';

export const Label = ({ text='' }) => {
  return (
    <div className="label"><span>{ text }</span></div>
  )
}

export default Label;