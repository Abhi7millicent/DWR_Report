import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"; // Import IconDefinition from @fortawesome/fontawesome-svg-core

interface IconProps {
  icons: IconDefinition[]; // Make sure icons is an array of IconDefinitions
}

const Icon: React.FC<IconProps> = ({ icons }) => {
  return (
    <div>
      {icons.map((icon, index) => (
        <FontAwesomeIcon key={index} icon={icon} />
      ))}
    </div>
  );
};

export default Icon;
