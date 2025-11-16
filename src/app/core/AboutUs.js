import { Label } from '../../components/label/Label';
import { Title } from '../../components/title/Title';

export const AboutUs = () => {
  return (
    <div className="App-container logged">
      <div className="App-form">
        <Title title="NOSOTROS" />
        <div className="aboutUs-content">
          <p>Somos una app pensada para estudiantes</p>
          <p>Te ayudamos a organizar tus horarios y tareas diarias en un solo lugar</p>
          <p>Nuestro objetivo es facilitar tu día a día y ayudarte a aprovechar mejor tu tiempo</p>
          <Label text="Organiza tu vida, mejora tu estudio" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
