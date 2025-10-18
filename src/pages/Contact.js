import { Title } from '../components/Title';
import { Label } from '../components/Label';

export const Contact = () => {
  return (
    <div>
        <Title title="CONTACTOS" />
        
        <Label text="Juan Fernando Muñoz" />
        <span>juanferm0410@javerianacali.edu.co</span>
        <span>Cel: +57 3117863643</span>

        <Label text="Santiago Henao" />
        <span>shr09@javerianacali.edu.co</span>
        <span>Cel: +57 3188511479</span>

        <Label text="Manuel Alejandro Quiceno" />
        <span>alejandro121@javerianacali.edu.co</span>
        <span>Cel: +57 3233831135</span>

        <Label text="Nicolas Guerrero" />
        <span>nicolasgm13@javerianacali.edu.co</span>
        <span>Cel: +57 3166236738</span>

    </div>
  )
}

export default Contact;