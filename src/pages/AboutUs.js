import { Title } from '../components/Title';
import { Label } from '../components/Label';

export const AboutUs = () => {
  return (
        <div className="home-container">
          <div className="home-form">
            <div className='home-header'>
              <Title title="NOSOTROS" />
            </div>
            <div>       
              <span>Somos una app pensada para estudiantes</span>
              <span>Te ayudamos a organizar tus horarios y tareas diarias en un solo lugar</span>
              <span>Nuestro objetivo es facilitar tu día a día y ayudarte a aprovechar mejor tu tiempo</span>
              <Label text="Organiza tu vida, mejora tu estudio" />
            </div>
          </div>
        </div>
  )
}

export default AboutUs;