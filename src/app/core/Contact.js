import { Label } from '../../components/label/Label';
import { Title } from '../../components/title/Title';

export const Contact = () => {
  return (
    <div className="App-container logged">
      <div className="App-form">
        <Title title="CONTACTO" />
        <div>
          <Label text="Juan Fernando Muñoz" />
          <span>
            juanferm0410@javerianacali.edu.co
            <br />
            Cel: +57 3117863643
          </span>
          <br />
          <br />
          <Label text="Santiago Henao" />
          <span>
            shr09@javerianacali.edu.co
            <br />
            Cel: +57 3188511479
          </span>
          <br />
          <br />
          <Label text="Manuel Alejandro Quiceno" />
          <span>
            alejandro121@javerianacali.edu.co
            <br />
            Cel: +57 3233831135
          </span>
          <br />
          <br />
          <Label text="Nicolas Guerrero" />
          <span>
            nicolasgm13@javerianacali.edu.co
            <br />
            Cel: +57 3166236738
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
