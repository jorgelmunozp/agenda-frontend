import './Label.scss';

export const Label = ({ text='', textShadow=1 }) => {
  const ts = (textShadow === 2) ? '0px 1px 0px #eee' : '0px 1px 0px #000';
  return (
    <div className={`label`} style={{ textShadow: ts }}>
      <span>{text}</span>
    </div>
  );
}

export default Label;